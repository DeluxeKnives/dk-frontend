import React from 'react';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ScrollAnimation from 'react-scroll-animation-wrapper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'next-i18next';
import Link from 'next/dist/client/link';
import logo from '~/public/images/dk-logo-long.avif';
import brand from '~/public/text/brand';
import { useText } from '~/theme/common';
import useStyles from './footer-style';
import ContactForm from '../Contact/Form';

function Footer() {
  const classes = useStyles();
  const text = useText();
  const { t } = useTranslation('common');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" component="footer">
        <Grid container spacing={6} direction={isMobile ? 'column-reverse' : 'row'}>
          <Grid item xs={12} md={5} style={{ margin: 'auto' }}>
            <ScrollAnimation
              animateOnce
              animateIn="fadeInLeftShort"
              offset={100}
              delay={200}
              duration={0.3}
            >
              <div>
                <div className={classes.logo}>
                  <img src={logo} alt="logo" style={{ width: '280px' }} />
                </div>
                <Button variant="outlined" color="primary" className={classes.download} component="a" href="https://www.deluxeknives.com/">
                  Main Site
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
            </ScrollAnimation>
          </Grid>
          <Grid item xs={12} md={7}>
            <ScrollAnimation
              animateOnce
              animateIn="fadeInRightShort"
              offset={100}
              delay={200}
              duration={0.3}
            >
              <div>
                <ContactForm />
              </div>
            </ScrollAnimation>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
