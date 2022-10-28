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
     market_id
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

  const buyNFT = useCallback(async () => {
    if (!pid) return;

    const [shopId, metaId] = pid.split(":")
    const listing = listings[0];

    const transactions = [
      {
        receiverId: listing.market_id,
        functionCalls: [
          {
            methodName: "buy",
            receiverId: listing.market_id,
            gas: "200000000000000",
            args: {
              // eslint-disable-next-line camelcase
              nft_contract_id: shopId,
              // eslint-disable-next-line camelcase
              token_id: listing.token_id,
            },
            deposit: BigInt(listing.price).toString(),
          },
        ],
      },
    ];
    const options = {
      meta: JSON.stringify({
        type: "make-offer",
        args: {
          metadataId: formattedData.metadataId,
        },
      }),
    };
    console.log(transactions, options);
    wallet.executeMultipleTransactions({ transactions, options });
  
    // Old Market Script, deprecated
    // const meta = JSON.stringify({
    //   type: 'accept_and_transfer',
    //   args: {
    //     tokenId: `${listings?.[0]?.token_id}:${formattedData?.storeId}`,
    //     marketAddress: process.env.MINTBASE_MARKET_ADDRESS
    //   },
    // });
    // wallet.acceptAndTransfer(`${listings[0].token_id}:${formattedData.storeId}`, {
    //   callbackUrl: `${window.location.origin}`,
    //   meta,
    //   marketAddress: process.env.MINTBASE_MARKET_ADDRESS
    // });

  }, [formattedData, wallet]);

  async function login() {
    const accountId = wallet.activeAccount.accountId;
    const sameMsgObj = new Uint8Array(sha256.array("123456789 wrong message")); // TODO: replace with nonce
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const keyPair = await keyStore.getKey(process.env.NEAR_NETWORK, accountId);
    const signed = keyPair.sign(sameMsgObj);

    const res = await fetch(`${process.env.BACKEND_URL}/redemption/redeemMirror`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id": "634cd9934e57a674636020e4",
        "nftID": 5,
        "accountId": accountId,
        signature: signed.signature
      })
    });
  }

  console.log(listings);

  return (
    <Grid container style={{ padding: "1rem" }}>
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
        <Grid item md={4} sm={12} style={{margin: "auto 0 auto 0", padding: "1rem"}}>
          <SimpleImage {...formattedData} />
        </Grid>
      </Hidden>
    </Grid>
  );
}

export default ThingPage;
