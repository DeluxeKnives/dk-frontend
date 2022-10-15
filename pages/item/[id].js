import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import brand from '~/public/text/brand';
import { Button, Grid, Hidden } from '@material-ui/core';
import SimpleImage from '../../components/Cards/SimpleImage';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router'
import { useWallet } from '../../lib/NearWalletProvider';
import { nearToYocto } from 'near-api-js';
import ReactMarkdown from 'react-markdown';
import SideNavigationIcon from '../../components/SideNavigation/SideNavigationIcon';
import { UnstyledConnectButton } from "../../components/ConnectButton";


const STORE_NFTS = gql`
query GetNFTListings( 
  $offset: Int = 0 $tok_cond: mb_views_nft_tokens_bool_exp $list_cond: mb_views_active_listings_bool_exp) 
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
      }
    }
  });

  // Correctly store the queried data
  useEffect(() => {
    console.log(data);
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
    }
    catch (e) {
      console.log("ERROR AHH", e)
    }
  }, [data, error]);
  const [formattedData, setFormattedData] = useState();
  const [listings, setListings] = useState();
  const isSoldOut = listings == null || listings.length == 0;

  // Wallet interaction
  const { wallet } = useWallet();

  const meta = JSON.stringify({
    type: 'accept_and_transfer',
    args: {
      tokenId: `${listings?.[0].token_id}:${formattedData?.storeId}`,
    },
  });
  console.log(meta);
  
  const buyNFT = useCallback(async () => {
    if (!pid) return;



    wallet.acceptAndTransfer(`${listings[0].token_id}:${formattedData.storeId}`, {
      callbackUrl: `${window.location.origin}`,
      meta
    })


  }, [formattedData, wallet]);


  return (
    <Grid container spacing={3} style={{ padding: "1rem" }}>
      <Hidden smDown>
        <Grid item md={1}>
          <SideNavigationIcon isNotTranslated />
        </Grid>
      </Hidden>
      <Grid item md={7} sm={12}>
        <div>
          <Button onClick={buyNFT} disabled={listings == null || listings.length == 0}>
            Buy
          </Button>
          <Button component="a" href={`https://${process.env.NEAR_NETWORK}.mintbase.io/meta/${pid}`}>
            Transfer
          </Button>
          <div style={{ float: 'right' }}>
            <UnstyledConnectButton />
          </div>
          <p>{isSoldOut ? "SOLD OUT!" : listings.length + " NFTs remaining."}</p>
          <ReactMarkdown>{formattedData?.description}</ReactMarkdown>
        </div>
      </Grid>
      <Grid item md={4} sm={12}>
        <SimpleImage {...formattedData} />
      </Grid>
    </Grid>
  );
}

export default ThingPage;
