// pages/[locale]/about.js
// It's a real page containing translations or components with translations

import React from 'react';
import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import brand from '~/public/text/brand';
import Header from '../../components/Header';
import Gallery from '../../components/Gallery';
import { makeStyles } from '@material-ui/core/styles';
import Decoration from '../../components/Parallax/Decoration';
import StoreBanner from '../../components/BannerNav/StoreBanner';
import Footer from '../../components/Footer';

const useStyles = makeStyles(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.type === 'dark' ? theme.palette.background.dark : theme.palette.background.paper,
  },
  greyBg: {
    paddingTop: theme.spacing(10)
  },
  containerWrap: {
    marginTop: -40,
    '& > section': {
      position: 'relative'
    }
  },
  parallaxWrap: {
    position: 'relative'
  },
  bottomDeco: {
    top: -200,
    position: 'absolute',
    width: '100%',
    height: 'calc(100% + 200px)'
  },
  topBuffer: {
    marginTop: '3rem'
  },
  largeTopBuffer: {
    marginTop: '6rem'
  }
}));


export default function Store(props) {
  const { t } = useTranslation('common');
  const { onToggleDark, onToggleDir } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>
          {brand.unisex.name}
        </title>
      </Head>
      <CssBaseline />
      <Header
        onToggleDark={onToggleDark}
        onToggleDir={onToggleDir}
      />
      <section id="store-top">
        <StoreBanner
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
          bannerHero='video'
        />
      </section>
      <div className={classes.parallaxWrap}>
        <div className={classes.bottomDeco}>
          <Decoration />
        </div>
        <section id="store" className={classes.topBuffer}>
          <Gallery />
        </section>
        <section id="footer" className={classes.largeTopBuffer}>
          <Footer />
        </section>
      </div>
    </React.Fragment>
  );
}

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };