import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import brand from '~/public/text/brand';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
import Header from '../../components/Header';
import BannerNav from '../../components/BannerNav';
import Testimonials from '../../components/Testimonials';
import Available from '../../components/Available';
import Footer from '../../components/Footer';
import PageNav from '../../components/PageNav';
import Decoration from '../../components/Parallax/Decoration';
import Notification from '../../components/Notification';

const sectionMargin = margin => (margin * 20);
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
  spaceBottom: {
    marginBottom: sectionMargin(6),
    [theme.breakpoints.down('sm')]: {
      marginBottom: sectionMargin(theme.spacing() / 2)
    }
  },
  spaceBottomShort: {
    marginBottom: sectionMargin(theme.spacing() / 2)
  },
  spaceTop: {
    marginTop: sectionMargin(6),
    [theme.breakpoints.down('sm')]: {
      marginTop: sectionMargin(3)
    }
  },
  spaceTopShort: {
    marginTop: sectionMargin(theme.spacing() / 2)
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
  }
}));

function Landing(props) {
  const classes = useStyles();
  const { onToggleDark, onToggleDir } = props;
  return (
    <React.Fragment>
      <Head>
        <title>
          {brand.unisex.name}
        </title>
      </Head>
      <CssBaseline />
      <section id="home" />
      <div className={classes.mainWrap}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
        />
        <section id="home">
          <BannerNav
            onToggleDark={onToggleDark}
            onToggleDir={onToggleDir}
          />
        </section>
        <div className={classes.parallaxWrap}>
          <div className={classes.bottomDeco}>
            <Decoration />
          </div>
          <section id="available" className={classes.spaceTop}>
            <Available />
          </section>
          <section id="testimonials" className={classes.spaceTop}>
            <Testimonials />
          </section>
          <section id="faq" className={classes.spaceTop}>
            <Testimonials />
          </section>
          <section id="contact" className={classes.spaceTop}>
            <Footer />
          </section>
        </div>
        <Hidden mdDown>
          <Notification />
        </Hidden>
        <Hidden smDown>
          <PageNav />
        </Hidden>
      </div>
    </React.Fragment>
  );
}

Landing.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };

export default Landing;
