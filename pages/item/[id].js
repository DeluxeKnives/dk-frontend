import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import brand from '~/public/text/brand';
import { Button, Grid, Hidden, Chip } from '@material-ui/core';
import SimpleImage from '../../components/Cards/SimpleImage';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router'
import { useWallet, nearNumToHuman } from '../../lib/NearWalletProvider';
import ReactMarkdown from 'react-markdown';
import SideNavigationIcon from '../../components/SideNavigation/SideNavigationIcon';
import { UnstyledConnectButton } from "../../components/ConnectButton";
import { sha256 } from "js-sha256";
import { utils, keyStores } from "near-api-js";

const STORE_NFTS = gql`
query GetNFTListings( 
  $offset: Int = 0 $tok_cond: mb_views_nft_tokens_bool_exp $list_cond: mb_views_active_listings_bool_exp $user_cond: nft_tokens_bool_exp) 
  @cached 
  { 
   mb_views_nft_tokens(
     where: $tok_cond
     offset: $offset
     distinct_on: metadata_id
   )
   {
    media 
    storeId: nft_contract_id 
    metadataId: metadata_id 
    title 
    reference_blob
   }
   mb_views_active_listings( 
     where: $list_cond
     offset: $offset 
   ) 
   {       
     price
     receipt_id
     currency
     kind
     token_id
   }
   nft_tokens(
    where: $user_cond
    offset: $offset
  )
  {
   token_id
   owner
  }
 }
`;


// TODO: add a top bar

function ThingPage(props) {
  const router = useRouter();
  const pid = router.query.id;

  // Query for the store
  const { loading, error, data } = useQuery(STORE_NFTS, {
    variables: {
      "tok_cond": {
        "metadata_id": { "_eq": pid }
      },
      "list_cond": {
        "metadata_id": { "_eq": pid },
        "listed_by": { "_eq": `deluxeshop.${process.env.NEAR_NETWORK}` },
        "kind": { "_eq": "simple" }
      },
      "user_cond": {
        "metadata_id": { "_eq": pid }
      }
    }
  });

  // Correctly store the queried data
  useEffect(() => {
    try {
      const nft = data.mb_views_nft_tokens[0];
      const fnft = {
        img: nft.media,
        link: `/${nft.title}`,
        size: 'long',
        category: nft.reference_blob?.extra?.[0]?.value ?? "",
        description: nft.reference_blob?.description,
        ...nft
      };
      setFormattedData(fnft);
      setListings(data.mb_views_active_listings);
      setNFTOwners(data.nft_tokens);
    }
    catch (e) {
      console.log("ERROR AHH", e)
    }
  }, [data, error]);
  const [formattedData, setFormattedData] = useState();
  const [listings, setListings] = useState();
  const [nftOwners, setNFTOwners] = useState();
  const isSoldOut = listings == null || listings.length == 0;

  // Wallet interaction
  const { wallet } = useWallet();

  const meta = JSON.stringify({
    type: 'accept_and_transfer',
    args: {
      tokenId: `${listings?.[0]?.token_id}:${formattedData?.storeId}`,
      marketAddress: process.env.MINTBASE_MARKET_ADDRESS
    },
  });

  const buyNFT = useCallback(async () => {
    if (!pid) return;

    wallet.acceptAndTransfer(`${listings[0].token_id}:${formattedData.storeId}`, {
      callbackUrl: `${window.location.origin}`,
      meta,
      marketAddress: process.env.MINTBASE_MARKET_ADDRESS
    });

  }, [formattedData, wallet]);


  async function dab() {
    console.log(wallet);
    const res = await fetch(`${process.env.BACKEND_URL}/redemption/redeemMirror`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 5,
        nftID: 5
      })
    });
    console.log(await res.json());
  }

  async function login() {
    const accountId = wallet._connectedAccount.accountId;
    console.log(accountId, wallet);

    // Mintbase Attempt
    // const signed = await wallet.activeWallet._near.connection.signer.signMessage(
    //   new Uint8Array(sha256.array("MESSAGE")), accountId, process.env.NEAR_NETWORK
    // );
    // const privateKey = wallet.keyStore.localStorage["near-api-js:keystore:deluxeshop.testnet:testnet"].substring(8);
    // const keyPair = new utils.key_pair.KeyPairEd25519(privateKey);

    // Sign with Dorian's Link
    const sameMsgObj = new Uint8Array(sha256.array("MESSAGE"));
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const keyPair = await keyStore.getKey(process.env.NEAR_NETWORK, accountId);
    const { signature } = keyPair.sign(sameMsgObj);

    // Validate with the key pair
    const keyPairVerify = keyPair.verify(sameMsgObj, signature);

    // This is supposed to be the right public key:
    const connected_public_key = keyPair.getPublicKey();

    console.log(connected_public_key); // These are definitely the same


    // Attempt local verification
    const rpcPublicKey = utils.key_pair.PublicKey.from(wallet._authData.allKeys[0]);
    console.log(rpcPublicKey);
    const publicKeyVerify = connected_public_key.verify(
      sameMsgObj, 
      signature);
    
    console.log("PUBLIC KEY VERIFICATION:", publicKeyVerify, "KEY PAIR VERIFICATION:", keyPairVerify);

    // const res = await fetch(`${process.env.BACKEND_URL}/redemption/redeemMirror`, {
    //   method: "POST",
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     "id": "634cd9934e57a674636020e4",
    //     "nftID": 5,
    //     "accountId": accountId,
    //     password: signed
    //   })
    // });

    //console.log(JSON.stringify(signed));
    /*
    const res = await fetch(`${process.env.BACKEND_URL}/redemption/login`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: accountId,
        password: JSON.stringify(signed)
      })
    });
    */
    //console.log(await res.json());
  }

  console.log(listings);

  return (
    <Grid container spacing={3} style={{ padding: "1rem" }}>
      <Hidden smDown>
        <Grid item md={1}>
          <SideNavigationIcon isNotTranslated />
        </Grid>
      </Hidden>
      <Grid item md={7} sm={12}>
        <div>
          <Hidden mdUp>
            <SimpleImage {...formattedData} />
          </Hidden>
          <Button onClick={buyNFT} disabled={listings == null || listings.length == 0}>
            Buy
          </Button>
          <Button component="a" href={`https://${process.env.NEAR_NETWORK}.mintbase.io/meta/${pid}`}>
            Transfer
          </Button>
          <Button onClick={login}>
            Login
          </Button>
          <Button onClick={dab}>
            Redemption
          </Button>
          <div style={{ float: 'right' }}>
            <UnstyledConnectButton />
          </div>
          <div style={{ marginTop: '1rem' }}>
            {!isSoldOut &&
              <Chip
                color={'primary'} style={{ marginRight: '1rem' }}
                label={`${nearNumToHuman(listings[0].price)} NEAR`}
              />
            }
            <Chip
              color={isSoldOut ? 'default' : 'primary'} style={{ marginRight: '1rem' }}
              label={isSoldOut ? "SOLD OUT!" : `${listings.length} NFT${listings.length > 1 ? "s" : ""} remaining`}
            />
            <Chip
              style={{ marginRight: '1rem' }}
              label={`Owns ${nftOwners?.filter(x => x.owner == wallet?.activeAccount?.accountId).length} of ${nftOwners?.length}`}
            />
          </div>
          <ReactMarkdown>{formattedData?.description}</ReactMarkdown>
        </div>
      </Grid>
      <Hidden smDown>
        <Grid item md={4} sm={12}>
          <SimpleImage {...formattedData} />
        </Grid>
      </Hidden>
    </Grid>
  );
}

export default ThingPage;
