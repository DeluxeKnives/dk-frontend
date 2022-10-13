import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Carousel from 'react-slick';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { useText } from '~/theme/common';
import Title from '../Title';
import BlogPostCard from '../Cards/BlogPost';
import useStyle from './blog-style';
import imgApi from '~/public/images/imgAPI';
import { useQuery, gql } from "@apollo/client";

const STORE_NFTS = gql`
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
     title 
     metadata_id
   }
 }
`;

function Available() {
  const slider = useRef(null);
  const { t } = useTranslation('common');

  const theme = useTheme();
  const text = useText();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const classes = useStyle();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    arrows: false,
    pauseOnHover: true,
    variableWidth: true,
    responsive: [{
      breakpoint: 1080,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  };

  // Query for the store
  const [formattedData, setFormattedData] = useState([{}, {}, {}, {}, {}, {}]);
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
          price,
          link: `/item/${nft.metadata_id}`
        });
      }
    }
    catch (e) {
      console.log("ERROR AHH", e)
    }
    setFormattedData(nftsFormatted);
  });

  // Idk some slide directon stuff beats me
  useEffect(() => {
    if (theme.direction === 'rtl') {
      const lastSlide = Math.floor(blogData.length - 2);
      slider.current.slickGoTo(lastSlide);
    }
  }, []);

  const sectionTitle =
    <div className={classes.floatingTitle}>
      <Title>
        {t('available.title')}
        &nbsp;
        <strong>
          {t('available.titlebold')}
        </strong>
      </Title>
      <Button variant="outlined" color="primary" className={classes.tostore} component="a" href="/store">
        {t('available.button')}
      </Button>
    </div>;

  return (
    <div className={classes.root}>
      {!isDesktop && sectionTitle}
      <div className={classes.sliderWrap}>
        <div className={classes.carousel}>
          <IconButton
            className={clsx(classes.nav, classes.prev)}
            onClick={() => slider.current.slickPrev()}
          >
            <i className="ion-ios-arrow-back" />
          </IconButton>
          <Carousel ref={slider} {...settings}>
            {isDesktop && (
              <div className={clsx(classes.item, classes.itemPropsFirst)}>
                <div>
                  {sectionTitle}
                </div>
              </div>
            )}
            {formattedData.map((item, index) => (
              <div key={index.toString()} className={classes.item}>
                <BlogPostCard
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  link={item.link}
                />
              </div>
            ))}
            {isDesktop && (
              <div className={clsx(classes.item, classes.itemPropsLast)}>
                <div />
              </div>
            )}
          </Carousel>
          <IconButton
            className={clsx(classes.nav, classes.next)}
            onClick={() => slider.current.slickNext()}
          >
            <i className="ion-ios-arrow-forward" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Available;
