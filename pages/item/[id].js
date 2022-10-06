import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import brand from '~/public/text/brand';
import { Button, Grid } from '@material-ui/core';
import SimpleImage from '../../components/Cards/SimpleImage';
import { STORE_NFTS } from '../../components/Gallery/Gallery';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import { Wallet, Chain, Network } from 'mintbase'

/*
// Connect and fetch details
async function connect() {
  const { data: walletData, error } = await new Wallet().init({
    networkName: Network.testnet,
    chain: Chain.near,
    apiKey: API_KEY,
  })

  const { wallet, isConnected } = walletData

  if (isConnected) {
    const { data: details } = await wallet.details()
  }
}
*/

connect()

function ThingPage(props) {
  const router = useRouter();
  const pid = router.query.id;

  const [formattedData, setFormattedData] = useState();
  const { loading, error, data } = useQuery(STORE_NFTS, {
    variables: {
      "condition": {
        "nft_contract_id": { "_eq": "shopifyteststore.mintspace2.testnet" }
      }
    }
  });

  useEffect(() => {
    console.log(data);
    try {
      const nft = data.mb_views_nft_metadata_unburned.find(x => x.metadataId == pid);
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

  return (
    <Grid container spacing={3} style={{ padding: "1rem" }}>
      <Grid item md={4} sm={12}>
        <SimpleImage {...formattedData} />
      </Grid>
      <Grid item md={8} sm={12}>
        <div>
          <Button disabled={formattedData?.listed == null}>Buy</Button>
          <Button>Transfer</Button>
          <p>{formattedData?.description}</p>
        </div>
      </Grid>
    </Grid>
  );
}

export default ThingPage;
