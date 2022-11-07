import React, { useState, useEffect, useCallback } from 'react';
import {
  Button, Grid, Hidden, Chip, Typography, IconButton, CircularProgress
} from '@material-ui/core';
import { useQuery, useSubscription, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { useWallet, nearNumToHuman } from '../../lib/NearWalletProvider';
import SimpleImage from '../../components/Cards/SimpleImage';
import SideNavigationIcon from '../../components/SideNavigation/SideNavigationIcon';
import { UnstyledConnectButton } from '../../components/ConnectButton';
import RedeemModal, { RedemptionLine } from '../../components/Redeem/RedeemModal';
import { useText } from '~/theme/common';
import Title from '../../components/Title';

const NFT_LISTINGS_SUBSCRIPTION = gql`
subscription GetNFTListings($list_cond: mb_views_active_listings_bool_exp) {
  mb_views_active_listings( 
    where: $list_cond
    offset: 0 
  ) 
  {       
    price
    receipt_id
    currency
    kind
    token_id
    market_id
  }
}
`;

const NFT_OWNER_SUBSCRIPTION = gql`
subscription GetNFTOwners($owner_cond: nft_tokens_bool_exp) {
 nft_tokens(
   where: $owner_cond
   offset: 0
 )
 {
  token_id
  owner
 }
}
`;

export const getStaticProps = async (context) => {
  // Query data from Mintbase to get all of the nfts that exist
  const mintbaseRes = await fetch(
    `https://interop-${process.env.NEAR_NETWORK}.hasura.app/v1/graphql`,
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query:
          `query GetNFTMetadata
          { 
            mb_views_nft_tokens(
               where: { metadata_id: { _eq: "${context.params.id}" } }
               offset: 0
              distinct_on: metadata_id
            )
            {
              media 
              storeId: nft_contract_id 
              metadataId: metadata_id 
              title 
              reference_blob
            }
          }`
      })
    }
  );
  const rawmetaData = await (mintbaseRes.json());

  const nft = rawmetaData?.data?.mb_views_nft_tokens?.[0];
  if (nft == null) return { props: { nftMetadata: {} }};

  const fnft = {
    img: nft.media,
    size: 'long',
    link: nft.reference_blob?.extra?.find(x => x.trait_type == 'website')?.value ?? '',
    description: nft.reference_blob?.description,
    ...nft
  };

  return { props: { nftMetadata: fnft } };
}

export const getStaticPaths = async () => {
  // Query data from Mintbase to get all of the nfts that exist
  const mintbaseRes = await fetch(
    `https://interop-${process.env.NEAR_NETWORK}.hasura.app/v1/graphql`,
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query:
          `query { 
            mb_views_nft_metadata_unburned(
               where: { nft_contract_id: { _eq: "shopifyteststore.mintspace2.testnet" } }
               offset: 0
               distinct_on: metadata_id
            )
            {
             metadata_id
            }
          }`
      })
    }
  );
  const mintbaseData = await mintbaseRes.json();
  const remapped = mintbaseData.data.mb_views_nft_metadata_unburned.map(x => ({ params: { id: x.metadata_id } }));
  return {
    paths: remapped,
    fallback: false
  };
}

// TODO: add a top bar
function ThingPage({ nftMetadata }) {
  const router = useRouter();
  const pid = router.query.id;
  const text = useText();

  // #region Queries & Subscriptions

  // Subscribe for the listings
  const { loading: listingLoading, error: listingError, data: listingData } = useSubscription(NFT_LISTINGS_SUBSCRIPTION, {
    variables: {
      list_cond: {
        metadata_id: { _eq: pid },
        listed_by: { _eq: `deluxeshop.${process.env.NEAR_NETWORK}` },
        kind: { _eq: 'simple' }
      }
    }
  });

  // Subscribe for the owners
  const { loading: ownerLoading, error: ownerError, data: ownerData } = useSubscription(NFT_OWNER_SUBSCRIPTION, {
    variables: {
      owner_cond: {
        metadata_id: { _eq: pid }
      }
    }
  });

  // #endregion

  // #region Format subscribed data

  useEffect(() => {
    if (!listingLoading) {
      setListings(listingData?.mb_views_active_listings);
    }
  }, [listingData, listingError]);
  useEffect(() => { if (!ownerLoading) setNFTOwners(ownerData?.nft_tokens); }, [ownerData, ownerError]);

  // #endregion

  // State variables to store queried/subscribed data
  const [listings, setListings] = useState([]);
  const [nftOwners, setNFTOwners] = useState([]);
  const isSoldOut = listings == null || listings.length == 0;

  // Wallet interaction
  const { wallet, signIn } = useWallet();

  // Purchase an NFT via Mintbase
  const buyNFT = async () => {
    if (!pid) return;
    if (wallet.activeAccount == undefined) {
      signIn();
      return;
    }

    const [shopId, metaId] = pid.split(':');
    const listing = listings[0];

    const transactions = [
      {
        receiverId: listing.market_id,
        functionCalls: [
          {
            methodName: 'buy',
            receiverId: listing.market_id,
            gas: '200000000000000',
            args: {
              nft_contract_id: shopId,
              token_id: listing.token_id,
            },
            deposit: BigInt(listing.price).toString(),
          },
        ],
      },
    ];
    const options = {
      callbackUrl: `${window.location.href}?success=true&prev=${userOwned.length}`,
      meta: JSON.stringify({
        type: 'make-offer',
        args: {
          metadataId: nftMetadata.metadataId,
        },
      }),
    };
    wallet.executeMultipleTransactions({ transactions, options });

    // Old Market Script, deprecated
    // const meta = JSON.stringify({
    //   type: 'accept_and_transfer',
    //   args: {
    //     tokenId: `${listings?.[0]?.token_id}:${nftMetadata?.storeId}`,
    //     marketAddress: process.env.MINTBASE_MARKET_ADDRESS
    //   },
    // });
    // wallet.acceptAndTransfer(`${listings[0].token_id}:${nftMetadata.storeId}`, {
    //   callbackUrl: `${window.location.origin}`,
    //   meta,
    //   marketAddress: process.env.MINTBASE_MARKET_ADDRESS
    // });
  };

  const userOwned = nftOwners?.filter(x => x.owner == wallet?.activeAccount?.accountId);

  // Redeem Modal
  const [redeemModalIsOpen, setRedeemModalIsOpen] = useState(false);
  const [redemptionStatus, setRedemptionStatus] = useState([]);
  async function openRedeemModal() {
    setRedeemModalIsOpen(true);
  }

  // Fetch for redemption status of tokens
  useEffect(() => {
    let queryStr = '';
    for (const nft of userOwned) {
      queryStr += nft.token_id + ',';
    }

    if (queryStr.length > 0) queryStr = queryStr.substring(0, queryStr.length - 1);
    else {
      setRedemptionStatus([]);
      return;
    }

    fetch(`${process.env.BACKEND_URL}/redemption/checkBatch/${queryStr}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => { setRedemptionStatus(res); });
  }, [nftOwners, wallet, redeemModalIsOpen]);

  const SimpleImageWithChips = (
    <SimpleImage {...nftMetadata}>
      <div style={{
        display: 'flex', width: 'fit-content', paddingLeft: '8px', paddingTop: '8px'
      }}
      >
        {!isSoldOut
          && (
            <Hidden mdDown>
              <Chip
                color="primary"
                style={{ marginRight: '1rem' }}
                label={`${nearNumToHuman(listings[0].price)} NEAR`}
              />
            </Hidden>
          )}
        <Chip
          color={isSoldOut ? 'default' : 'primary'}
          style={{ marginRight: '1rem' }}
          label={isSoldOut ? 'SOLD OUT!' : `${listings.length} NFT${listings.length > 1 ? 's' : ''} remaining`}
        />
        <Chip
          style={{ marginRight: '1rem' }}
          label={`Owns ${nftOwners?.filter(x => x.owner == wallet?.activeAccount?.accountId).length} of ${nftOwners?.length}`}
        />
      </div>
    </SimpleImage>
  );

  return (
    <React.Fragment>
      <RedeemModal isOpen={redeemModalIsOpen} contentLabel="Redeem Modal">
        <Title>Redeem for Code</Title>
        {
          userOwned == null || userOwned.length <= 0
            ? <div>You own no NFTs of this knife! Buy one to get a code.</div>
            : userOwned?.map((x, i) => (
              <RedemptionLine key={i} {...x} redemptionStatus={redemptionStatus[x.token_id]} />
            ))
        }
        <Button onClick={() => setRedeemModalIsOpen(false)} style={{ marginTop: '1rem' }}>
          Close
        </Button>
      </RedeemModal>
      <Grid container style={{ padding: '1rem' }}>
        {/* sidebar */}
        <Hidden smDown>
          <Grid item md={1}>
            <SideNavigationIcon isNotTranslated />
          </Grid>
        </Hidden>

        {/* main blob */}
        <Grid item md={11} sm={12}>
          {/* top bar */}
          <Hidden smDown>
            <div style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '0 5%'
            }}
            >
              <UnstyledConnectButton />
            </div>
          </Hidden>
          <Hidden mdUp>
            <div style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '0 5%'
            }}
            >
              <UnstyledConnectButton />
            </div>
          </Hidden>

          {/* knife image mobile */}
          <Hidden mdUp>
            {/* stats & image */ SimpleImageWithChips}
          </Hidden>

          {/* image and text */}
          <div style={{
            display: 'flex', flexDirection: 'row', margin: '0.5rem', gap: '3rem'
          }}
          >
            {/* desktop image */}
            <Hidden smDown>
              <Grid item md={4} sm={12}>
                {/* stats & image */ SimpleImageWithChips}
              </Grid>
            </Hidden>
            {/* text blob */}
            <Grid item md={7} sm={12}>
              {/* <h1> {nftMetadata?.title} </h1> */}
              {/* buttons */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '1rem', margin: '0rem 0 1rem 0'
              }}
              >
                <Button variant="contained" color="primary" onClick={buyNFT} disabled={isSoldOut}>
                  {listings?.length > 0 ? `Buy for ${nearNumToHuman(listings[0].price)} NEAR` : 'Buy'}
                </Button>
                <Button variant="contained" color="primary" onClick={openRedeemModal} disabled={userOwned?.length <= 0}>
                  Redeem
                </Button>
                <Button variant="outlined" component="a" href={`https://${process.env.NEAR_NETWORK}.mintbase.io/meta/${pid}`}>
                  Manage
                </Button>
                <Button variant="outlined" component="a" href={nftMetadata?.link} target="_blank">
                  View Physical
                </Button>
              </div>

              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <div>
                      <h1 {...props} style={{ marginBottom: '0' }} />
                      <h1 style={{ color: '#EF5923', margin: '0 0 0.5rem 0', lineHeight: '1rem' }}>⎯⎯⎯⎯⎯</h1>
                    </div>
                  ),
                  h2: ({ node, ...props }) => (
                    <div>
                      <h2 {...props} style={{ marginBottom: '0' }} />
                      <h2 style={{ color: '#EF5923', margin: '0 0 0.5rem 0', lineHeight: '1rem' }}>⎯⎯⎯⎯⎯</h2>
                    </div>
                  ),
                  li: ({ node, ...props }) => <li {...props} ordered="false" style={{ margin: '1rem 0' }} />,
                  //   p: ({ node, ...props }) => <p {...props} style={{ fontSize: "1rem" }} />
                }}
              >
                {nftMetadata?.description}
              </ReactMarkdown>
            </Grid>
          </div>
          <div />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}

export default ThingPage;
