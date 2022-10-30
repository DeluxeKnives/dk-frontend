import React, { useState, useEffect, useCallback } from 'react';
import { Button, Grid, Hidden, Chip, Typography, IconButton, CircularProgress } from '@material-ui/core';
import SimpleImage from '../../components/Cards/SimpleImage';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router'
import { useWallet, nearNumToHuman } from '../../lib/NearWalletProvider';
import ReactMarkdown from 'react-markdown';
import SideNavigationIcon from '../../components/SideNavigation/SideNavigationIcon';
import { UnstyledConnectButton } from "../../components/ConnectButton";
import RedeemModal, { RedemptionLine } from '../../components/Redeem/RedeemModal';
import { useText } from '~/theme/common';

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
  const text = useText();

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
      const nft = data?.mb_views_nft_tokens?.[0];
      if(nft == null) return;

      const fnft = {
        img: nft.media,
        size: 'long',
        link: nft.reference_blob?.extra?.find(x => x.trait_type == "website")?.value ?? "",
        description: nft.reference_blob?.description,
        ...nft
      };
      setFormattedData(fnft);
      setListings(data?.mb_views_active_listings);
      setNFTOwners(data?.nft_tokens);

      console.log(fnft)
    }
    catch (e) {
      console.log("ERROR AHH", e)
    }
  }, [data, error]);
  const [formattedData, setFormattedData] = useState({ img: "" });
  const [listings, setListings] = useState();
  const [nftOwners, setNFTOwners] = useState([]);
  const isSoldOut = listings == null || listings.length == 0;

  // Wallet interaction
  const { wallet } = useWallet();

  // Purchase an NFT via Mintbase
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

  const userOwned = nftOwners?.filter(x => x.owner == wallet?.activeAccount?.accountId);

  // Redeem Modal
  const [redeemModalIsOpen, setRedeemModalIsOpen] = useState(false);
  const [redemptionStatus, setRedemptionStatus] = useState([]);
  async function openRedeemModal() {
    setRedeemModalIsOpen(true);
  }

  // Fetch for redemption status of tokens
  useEffect(() => {
    let queryStr = "";
    for (const nft of userOwned) {
      queryStr += nft.token_id + ","
    };
    console.log("QUERYSTR:", queryStr);

    if (queryStr.length > 0) queryStr = queryStr.substring(0, queryStr.length - 1);
    else {
      setRedemptionStatus([]);
      return;
    }

    fetch(`${process.env.BACKEND_URL}/redemption/checkBatch/${queryStr}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => { setRedemptionStatus(res); console.log(res)});
  }, [nftOwners, wallet, redeemModalIsOpen]);

  return (
    <React.Fragment>
      <RedeemModal isOpen={redeemModalIsOpen} contentLabel="Redeem Modal">
        <Typography component="h3" className={text.title}>Redeem for Code</Typography>
        {
          userOwned == null || userOwned.length <= 0 ?
            <div>You own no NFTs of this knife! Buy one to get a code.</div> :
            userOwned?.map((x, i) => (
              <RedemptionLine key={i} {...x} redemptionStatus={redemptionStatus[x.token_id]} />
            ))
        }
        <Button onClick={() => setRedeemModalIsOpen(false)} style={{ marginTop: '1rem' }}>
          Close
        </Button>
      </RedeemModal>
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
              Manage
            </Button>
            <Button onClick={openRedeemModal}>
              Redeem
            </Button>
            <Button component="a" href={formattedData?.link} target="_blank">
              View Physical
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
          <Grid item md={4} sm={12} style={{ margin: "auto 0 auto 0", padding: "1rem" }}>
            <SimpleImage {...formattedData} />
          </Grid>
        </Hidden>
      </Grid>
    </React.Fragment>
  );
}

export default ThingPage;
