import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import { Link } from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Fade from '@material-ui/core/Fade';
import { useTranslation } from 'next-i18next';
import logo from '~/public/images/dk-logo-small.svg';
import brand from '~/public/text/brand';
import { useText } from '~/theme/common';
import useStyles from './header-style';
import ConnectButton from '../ConnectButton';

let counter = 0;
function createData(name, url, offset) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
    offset,
  };
}

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <AnchorLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function Header(props) {
  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const text = useText();

  const [fixed, setFixed] = useState(false);
  let flagFixed = false;
  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixed = (scroll > 80);
    if (flagFixed !== newFlagFixed) {
      setFixed(newFlagFixed);
      flagFixed = newFlagFixed;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const classes = useStyles();
  const {
    onToggleDark,
    onToggleDir,
    invert,
  } = props;
  const { t } = useTranslation('common');

  const [menuList] = useState([
    createData('home', '/'),
    createData('store', '/store'),
    createData('game', '/game'),
    createData('main', 'https://deluxeknives.com/'),
    createData('discord', 'https://discord.gg/sf4FzDTFb4'),
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
    const body = document.getElementsByTagName('body');
    if (openDrawer) {
      body[0].style.overflow = 'auto';
    } else {
      body[0].style.overflow = 'hidden';
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    const body = document.getElementsByTagName('body');
    body[0].style.overflow = 'auto';
  };

  return (
    <Fragment>
      <AppBar
        component="div"
        position="relative"
        id="header"
        className={clsx(
          classes.header,
          invert || fixed || isMobile ? classes.fixed : '',
          openDrawer && classes.openDrawer
        )}
      >
        <Container fixed={isDesktop}>
          <div className={classes.headerContent}>
            <nav className={clsx(classes.navLogo, invert && classes.invert)}>
              <IconButton
                onClick={handleOpenDrawer}
                className={clsx('hamburger hamburger--squeeze', classes.mobileMenu, openDrawer && 'is-active')}
              >
                <span className="hamburger-box">
                  <span className={clsx(classes.bar, 'hamburger-inner')} />
                </span>
              </IconButton>
              <div className={classes.logo}>
                <a href="/">
                  <img src={logo} alt="logo" />
                </a>
              </div>
              {/* <Settings toggleDark={onToggleDark} toggleDir={onToggleDir} invert={invert} /> */}
              <div style={{ width: '48px', height: '48px', margin: '0px 8px' }}>
                <ConnectButton />
              </div>
            </nav>
          </div>
        </Container>
      </AppBar>
      <Fade in={openDrawer}>
        <div className={clsx(classes.paperNav, openDrawer && classes.show)}>
          <div className={classes.mobileNav}>
            <Container maxWidth="md">
              <Grid container spacing={6}>
                <Grid item sm={6}>
                  <div className={classes.rootMenu}>
                    <Hidden mdDown>
                      <Typography variant="h5" className={classes.nameDeco}>
                        EXPLORE
                      </Typography>
                    </Hidden>
                    {openDrawer && (
                      <ul className={classes.menu}>
                        {menuList.map((item, index) => (
                          <li key={item.id.toString()} style={{ animationDuration: index * 0.15 + 's' }}>
                            <Button href={item.url}>
                              {t('navigation.' + item.name)}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div className={classes.detail}>
                    <div className={classes.logoName}>
                      <Typography variant="h3" className={text.title}>
                        {brand.unisex.name}
                      </Typography>
                      <Typography variant="h4" className={text.subtitle}>
                        {brand.unisex.title}
                      </Typography>
                    </div>
                    <Button variant="outlined" color="primary" className={classes.download} component="a">
                      {t('unisex-landing.main_site')}
                    </Button>
                    <div className={classes.socmed}>
                      <IconButton
                        aria-label="Delete"
                        className={classes.margin}
                        size="small"
                        onClick={() => location.href = 'https://www.facebook.com/DeluxeKnives'}
                      >
                        <i className="ion-logo-facebook" />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        className={classes.margin}
                        size="small"
                        onClick={() => location.href = 'https://twitter.com/DeluxeKnives'}
                      >
                        <i className="ion-logo-instagram" />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        className={classes.margin}
                        size="small"
                        onClick={() => location.href = 'https://www.instagram.com/DeluxeKnives/'}
                      >
                        <i className="ion-logo-twitter" />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        className={classes.margin}
                        size="small"
                        onClick={() => location.href = 'https://www.youtube.com/channel/UCdPUX9Ixi7jccSej8LsTG0g'}
                      >
                        <i className="ion-logo-youtube" />
                      </IconButton>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </Fade>
    </Fragment>
  );
}

Header.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  invert: PropTypes.bool,
};

Header.defaultProps = {
  invert: false
};

export default Header;
