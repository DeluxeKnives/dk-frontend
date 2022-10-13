import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import brand from '~/public/text/brand';
import { Button, Grid } from '@material-ui/core';
import SimpleImage from '../../components/Cards/SimpleImage';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router'
import { useWallet } from '../../lib/NearWalletProvider';
import { nearToYocto } from 'near-api-js';

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
        "metadata_id": { "_eq": "shopifyteststore.mintspace2.testnet:99f7c63d259703bc3820810275a1a667" }
      },
      "list_cond": { 
        "metadata_id": { "_eq": "shopifyteststore.mintspace2.testnet:99f7c63d259703bc3820810275a1a667" },
        "listed_by": { "_eq": "deluxeshop.testnet" },
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
    }
    catch (e) {
      console.log("ERROR AHH", e)
    }
  }, [data, error]);
  const [formattedData, setFormattedData] = useState();

  // Wallet interaction
  const { wallet } = useWallet();

  const buyNFT = useCallback(async () => {
    if (!pid) return;
    console.log(formattedData);

    const price = BigInt(formattedData.listed).toString();
    await wallet?.makeOffer(pid, nearToYocto(price), {
      callbackUrl: `${window.location.origin}/wallet-callback`,
      meta: JSON.stringify({
        type: 'make-offer',
        args: {
          tokenId: pid,
          price: nearToYocto(price),
        },
      }),

    });
  }, [formattedData, wallet]);

  return (
    <Grid container spacing={3} style={{ padding: "1rem" }}>
      <Grid item md={4} sm={12}>
        <SimpleImage {...formattedData} />
      </Grid>
      <Grid item md={8} sm={12}>
        <div>
          <Button onClick={buyNFT} disabled={formattedData?.listed == null}>
            Buy
          </Button>
          <Button component="a" href={`https://${process.env.NEAR_NETWORK}.mintbase.io/meta/${pid}`}>
            Transfer
          </Button>
          <p>{formattedData?.description}</p>
        </div>
      </Grid>
    </Grid>
  );
}

export default ThingPage;
