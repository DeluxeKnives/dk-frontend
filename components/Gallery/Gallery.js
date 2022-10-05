import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
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
     storeId: nft_contract_id 
     metadataId: metadata_id 
     title 
     base_uri 
   }
 }
`;

function Gallery() {
  const classes = useStyle();
  const { t } = useTranslation('common');
  const [formattedData, setFormattedData] = useState([]);
  const [filter, setFilter] = useState('all');

  // Image Gallery
  const [photoIndex, setPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);

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
        let category = '', lowerTitle = nft.title.toLowerCase();
        if(lowerTitle.includes("karambit")) category = 'karambit';
        else if(lowerTitle.includes("bayonet")) category = 'bayonet';
        else if(lowerTitle.includes("huntsman")) category = 'huntsman';
        nftsFormatted.push({
          img: nft.media,
          title: nft.title,
          link: `/${nft.title}`,
          size: 'long',
          category
        });
      }
    }
    catch(e) {
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

  const filterChildren = name => {
    setFormattedData([]);
    setTimeout(() => {
      if (name !== 'all') {
        const filteredData = formattedData.filter(item => item.category === name);
        setFormattedData(filteredData);
        setFilter(name);
      } else {
        setFormattedData(formattedData);
        setFilter('all');
      }
    }, 1);
  };

  function onMovePrevRequest() {
    setPhotoIndex((photoIndex + formattedData.length - 1) % formattedData.length);
  }

  function onMoveNextRequest() {
    setPhotoIndex((photoIndex + formattedData.length + 1) % formattedData.length);
  }

  function showPopup(index) {
    setOpen(true);
    setPhotoIndex(index);
  }

  return (
    <div className={classes.root}>
      {open && (
        <Lightbox
          mainSrc={formattedData[photoIndex].img}
          nextSrc={formattedData[(photoIndex + 1) % formattedData.length].bg || formattedData[(photoIndex + 1) % formattedData.length].logo}
          prevSrc={formattedData[(photoIndex + 1) % formattedData.length].logo || null}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={onMovePrevRequest}
          onMoveNextRequest={onMoveNextRequest}
        />
      )}
      <Container>
        <Title>
          {t('unisex-landing.gallery_title')}
          <strong>
            {t('unisex-landing.gallery_titleBold')}
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
            {formattedData.map((item, index) => (item.category == filter || filter == 'all') && (
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
                  <ImageThumbCard
                    img={item.img}
                    title={item.title}
                    link={item.link}
                    size={item.size}
                    openPopup={() => showPopup(index)}
                  />
                </ScrollAnimation>
              </div>
            ))}
          </div>
          {formattedData.length < 1 && <Typography variant="button" component="p" align="center">{t('unisex-landing.gallery_nodata')}</Typography>}
        </Hidden>
        <Hidden smUp>
          <Carousel {...settings}>
            {formattedData.map((item, index) => (
              <div
                className={classes.itemCarousel}
                key={index.toString()}
              >
                <ImageThumbCard
                  img={item.img}
                  title={item.title}
                  link={item.link}
                  size={item.size}
                  openPopup={() => showPopup(index)}
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
