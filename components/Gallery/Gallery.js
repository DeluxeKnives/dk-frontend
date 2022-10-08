import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import ScrollAnimation from 'react-scroll-animation-wrapper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Carousel from 'react-slick';
import { useTranslation } from 'next-i18next';
import imgAPI from '~/public/images/imgAPI';
import ImageThumbCard from '../Cards/ImageThumb';
import Title from '../Title';
import useStyle from './gallery-style';
import { useQuery, gql } from "@apollo/client";
import Link from 'next/dist/client/link';



export const STORE_NFTS = gql`
query GetStoreNfts( 
  $offset: Int = 0 $condition: mb_views_nft_metadata_unburned_bool_exp) 
  @cached 
  { 
   mb_views_nft_metadata_unburned( 
     where: $condition
     offset: $offset 
     order_by: { minted_timestamp: desc } 
   ) 
   {       
     listed: price 
     media 
     storeId: nft_contract_id 
     metadataId: metadata_id 
     title 
     base_uri 
     reference_blob
   }
 }
`;

function Gallery() {
  const classes = useStyle();
  const { t } = useTranslation('common');
  const [formattedData, setFormattedData] = useState([]);
  const [filter, setFilter] = useState('all');

  // Query for the store
  const { loading, error, data } = useQuery(STORE_NFTS, {
    variables: {
      "condition": {
        "nft_contract_id": { "_eq": "shopifyteststore.mintspace2.testnet" }
      }
    }
  });

  useEffect(() => {
    const nftsFormatted = [];
    console.log(data);
    try {
      for (const nft of data.mb_views_nft_metadata_unburned) {
        let category = "";
        nft.reference_blob?.extra?.forEach(x => {
          if(x?.trait_type == "type") category = x.value;
        });
        const priceStr =
          (parseInt(
            (BigInt(nft.listed ?? 0) / BigInt(100000000000000000000000))
              .toString()
            ) / 10
          )
          .toString();
        let price = priceStr;

        nftsFormatted.push({
          img: nft.media,
          title: nft.title,
          link: `/${nft.title}`,
          size: 'long',
          category,
          metadataId: nft.metadataId,
          price
        });
      }
    }
    catch (e) {
      console.log("ERROR AHH", e)
    }

    setFormattedData(nftsFormatted);
  }, [data, error]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    arrows: false
  };

  return (
    <div className={classes.root}>
      <Container>
        <Title>
          <strong>
            {t('shop.title')}
          </strong>
        </Title>
        <div className={classes.filter}>
          <Button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? classes.selected : ''}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter('karambit')}
            className={filter === 'karambit' ? classes.selected : ''}
          >
            Karambit
          </Button>
          <Button
            onClick={() => setFilter('huntsman')}
            className={filter === 'huntsman' ? classes.selected : ''}
          >
            Huntsman
          </Button>
          <Button
            onClick={() => setFilter('bayonet')}
            className={filter === 'bayonet' ? classes.selected : ''}
          >
            M9 Bayonet
          </Button>
        </div>
        <Hidden xsDown>
          <div className={classes.massonry}>
            {formattedData.filter(item => item?.category == filter || filter == 'all').map((item, index) => (
              <div
                className={classes.item}
                key={index.toString()}
                id={index.toString()}
              >
                <ScrollAnimation
                  animateOnce
                  animateIn="fadeInUpShort"
                  offset={-50}
                  delay={200 + (100 * index)}
                  duration={0.3}
                >
                  <Link href={"../item/" + item.metadataId}>
                    <ImageThumbCard
                      img={item.img}
                      title={item.title}
                      link={item.link}
                      size={item.size}
                      price={item.price} // This might be a problem. How do we know it's the correct listing price?
                      remaining={"0"}
                      onClick={() => { }}
                    />
                  </Link>
                </ScrollAnimation>
              </div>
            ))}
          </div>
          {formattedData.length < 1 && <Typography variant="button" component="p" align="center">{t('unisex-landing.gallery_nodata')}</Typography>}
        </Hidden>
        <Hidden smUp>
          <Carousel {...settings}>
            {formattedData.map((item, index) => (item.category == filter || filter == 'all') && (
              <div
                className={classes.itemCarousel}
                key={index.toString()}
              >
                <ImageThumbCard
                  img={item.img}
                  title={item.title}
                  link={item.link}
                  size={item.size}
                  price={"21"}
                  remaining={"0"}
                  onClick={() => showPopup(index)}
                />
              </div>
            ))}
          </Carousel>
        </Hidden>
      </Container>
    </div>
  );
}

export default Gallery;
