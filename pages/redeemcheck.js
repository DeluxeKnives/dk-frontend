import React, { useState, useEffect } from 'react';
import {
 Button, Grid, Hidden, TextField, InputAdornment
} from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';
import { useQuery, gql } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import SimpleImage from '../components/Cards/SimpleImage';
import SideNavigationIcon from '../components/SideNavigation/SideNavigationIcon';
import { useText } from '~/theme/common';

const STORE_METADATA_QUERY = gql`
query GetNFTMetadata($tok_cond: mb_views_nft_tokens_bool_exp) 
  { 
   mb_views_nft_tokens(
     where: $tok_cond
     offset: 0
     distinct_on: metadata_id
   )
    {
      token_id
      media 
      storeId: nft_contract_id 
      metadataId: metadata_id 
      title 
      reference_blob
    }
 }
`;

function RedeemCheck(props) {
    const text = useText();

    const [nftID, setNFTID] = useState(0);
    const [nftMetadata, setFormattedData] = useState({ img: '' });
    const [redemptionStatus, setRedemptionStatus] = useState(false);

    // State variables to store queried/subscribed data
    const { loading: metaLoading, error: metaError, data: rawmetaData } = useQuery(STORE_METADATA_QUERY, {
        variables: {
            tok_cond: {
                token_id: { _eq: nftID.toString() },
                nft_contract_id: { _eq: process.env.MINTBASE_SHOP_ID }
            }
        }
    });
    console.log(metaLoading, metaError, rawmetaData);

    // React to getting GraphQL data
    useEffect(() => {
        try {
            const nft = rawmetaData?.mb_views_nft_tokens?.[0];
            if (nft == null) {
                return;
            }

            const fnft = {
                img: nft.media,
                size: 'long',
                link: nft.reference_blob?.extra?.find(x => x.trait_type == 'website')?.value ?? '',
                description: nft.reference_blob?.description,
                ...nft
            };
            setFormattedData(fnft);
            console.log(fnft);

            fetch(`${process.env.BACKEND_URL}/redemption/check/${nftID}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(res => {
                    console.log('RES', res);
                    setRedemptionStatus(res);
                });
        } catch (e) {
            console.log('ERROR AHH', e);
        }
    }, [rawmetaData]);

    console.log('STATUS', redemptionStatus);
    const endAdornment = redemptionStatus
    ? (
      <div style={{ display: 'flex' }}>
        <Clear style={{ paddingBottom: '4px' }} />
        {' '}
        <div>Already Generated</div>
      </div>
)
    : (
      <div style={{ display: 'flex' }}>
        <Check style={{ paddingBottom: '4px' }} />
        {' '}
        <div>Not Redeemed</div>
      </div>
);

    return (
      <Grid container style={{ padding: '1rem' }}>
        {/* sidebar */}
        <Hidden smDown>
          <Grid item md={1}>
            <SideNavigationIcon isNotTranslated />
          </Grid>
        </Hidden>
        {/* main blob */}
        <Grid item md={11} sm={12}>
          {/* image and text */}
          <div style={{
 display: 'flex', flexDirection: 'row', margin: '0.5rem', gap: '3rem'
}}
          >
            {/* desktop image */}
            <Hidden smDown>
              <Grid item md={4} sm={12}>
                <SimpleImage {...nftMetadata} />
              </Grid>
            </Hidden>
            {/* text blob */}
            <Grid item md={7} sm={12}>
              {/* <h1> {formattedData?.title} </h1> */}
              {/* buttons */}
              <div style={{
 display: 'flex', flexWrap: 'wrap', gap: '1rem', margin: '0rem 0 1rem 0'
}}
              >
                <Typography variant="h2" className={text.subtitle}>Check Redemption Availability</Typography>
                <TextField
                  label="Enter NFT ID"
                  fullWidth
                  defaultValue={nftID}
                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {endAdornment}
                                      </InputAdornment>
                                    ),
                                }}
                  onChange={e => setNFTID(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  component="a"
                  href={`/item/${nftMetadata.metadataId}`}
                  disabled={nftMetadata.token_id != nftID}
                >
                  Go to Listing Page
                </Button>
              </div>
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
}

export default RedeemCheck;
