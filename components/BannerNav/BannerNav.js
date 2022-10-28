import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-i18next';
import SideNavigation from '../SideNavigation';
import SideNavigationIcon from '../SideNavigation/SideNavigationIcon';
import brand from '~/public/text/brand';
import { useText } from '~/theme/common';
import ui from '~/theme/config';
import Settings from '../Settings';
import Animation from './Hero/Animation';
import AnimationSlideshow from './Hero/AnimationSlideshow';
import Slideshow from './Hero/Slideshow';
import VideoHero from './Hero/Video';
import useStyles from './banner-style';
import ConnectButton from '../ConnectButton';
import ThreeDKnife from "../3DKnife";

function BannerNav(props) {
  const text = useText();
  const classes = useStyles();
  const [bannerHero] = useState(props.bannerHero ?? 'video');

  const { t } = useTranslation('common');
  const {
    onToggleDark,
    onToggleDir,
  } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item lg={ui.navigation === 'icon' ? 1 : 2} xs={12}>
          <Hidden mdDown>
            {ui.navigation === 'icon' && <SideNavigationIcon isMain />}
            {ui.navigation === 'text' && <SideNavigation />}
          </Hidden>
        </Grid>
        <Grid item lg={ui.navigation === 'icon' ? 11 : 10} xs={12}>
          <div className={classes.banner}>
            <div className={classes.cover}>
              <div className={classes.figure}>
                {bannerHero === 'image' && <div className={classes.img} style={{ backgroundImage: `url(${brand.unisex.cover})` }} />}
                {bannerHero === 'video' && <VideoHero />}
                {bannerHero === 'animation' && <Animation />}
                {bannerHero === 'animation-slide' && <AnimationSlideshow />}
                {bannerHero === 'slideshow' && <Slideshow />}
                {/* <ConnectButton top /> */}
              </div>
            </div>
            {
              /*
              <Hidden mdDown>
                <div className={classes.settingIcon}>
                  <Settings toggleDark={onToggleDark} toggleDir={onToggleDir} />
                </div>
              </Hidden>
              */
            }
            <div className={classes.text}>
              <Typography variant="h2" className={text.title}>
                {t('home.banner_title')}
              </Typography>
              <Hidden smDown>
                <Typography variant="h5" className={text.subtitle2}>
                  {t('home.banner_desc')}
                </Typography>
                <div className={classes.socmed}>
                  <Button variant="outlined" className={classes.download} component="a" href="store">
                    {t('home.cta')}
                  </Button>
                  <IconButton aria-label="Delete" className={classes.margin} size="small"
                    onClick={() => location.href = 'https://www.facebook.com/DeluxeKnives'}>
                    <i className="ion-logo-facebook" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin} size="small"
                    onClick={() => location.href = 'https://twitter.com/DeluxeKnives'}>
                    <i className="ion-logo-twitter" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin} size="small"
                    onClick={() => location.href = 'https://www.instagram.com/DeluxeKnives/'}>
                    <i className="ion-logo-instagram" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin} size="small"
                    onClick={() => location.href = 'https://www.youtube.com/channel/UCdPUX9Ixi7jccSej8LsTG0g'}>
                    <i className="ion-logo-youtube" />
                  </IconButton>
                </div>
              </Hidden>
            </div>
          </div>
        </Grid>
      </Grid>
      {/* temporarily remove big 3d knife until we can find a better place for it 
            since it seems a little out of place floating around */}
      {/* <ThreeDKnife /> */}
    </div>
  );
}

BannerNav.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

export default BannerNav;
