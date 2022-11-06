import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-scroll-animation-wrapper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { useTranslation } from 'next-i18next';
import { useText } from '~/theme/common';
import Title from '../Title';
import useStyle from './style';

function Testimonials() {
  const { t } = useTranslation('common');
  const classes = useStyle();
  const text = useText();

  return (
    <Container>
      <ScrollAnimation
        animateOnce
        animateIn="fadeInUpShort"
        offset={100}
        delay={200}
        duration={0.3}
      >
        <div className={classes.root}>
          <Title dark>
            {t('home.hiw_title')}
            {/* <strong> */}
            {t('home.hiw_titleBold')}
            {/* </strong> */}
          </Title>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <div className={classes.text}>
                <FadeUpScrollAnimation>
                  <Typography
                    variant="h3"
                    className={text.title2}
                  >
                    1. Purchase NFT
                  </Typography>
                </FadeUpScrollAnimation>
                <FadeUpScrollAnimation>
                  <div>
                    <Typography component="p" className={text.paragraph}>
                      Purchase a DeluxeKnife NFT with NEAR tokens on this site to access the metaverse component of a knife.
                    </Typography>
                  </div>
                </FadeUpScrollAnimation>
              </div>
            </Grid>

            <Grid item md={4} xs={12}>
              <div className={classes.text}>
                <FadeUpScrollAnimation delay={400}>
                  <Typography
                    variant="h3"
                    className={text.title2}
                  >
                    2. Receive a code
                  </Typography>
                </FadeUpScrollAnimation>
                <FadeUpScrollAnimation delay={400}>
                  <div>
                    <Typography component="p" className={text.paragraph}>
                      Your NFT comes with a code for a
                      {' '}
                      <strong>real, physical knife</strong>
                      {' '}
                      on our main site.
                    </Typography>
                  </div>
                </FadeUpScrollAnimation>
              </div>
            </Grid>

            <Grid item md={4} xs={12}>
              <div className={classes.text}>
                <FadeUpScrollAnimation delay={600}>
                  <Typography
                    variant="h3"
                    className={text.title2}
                  >
                    3. Redeem your knife
                  </Typography>
                </FadeUpScrollAnimation>
                <FadeUpScrollAnimation delay={600}>
                  <div>
                    <Typography component="p" className={text.paragraph}>
                      Go to
                      {' '}
                      <a href="https://www.deluxeknives.com/">our main site</a>
                      {' '}
                      to redeem your code. Enjoy your physical knife and its metaverse component together.
                    </Typography>
                  </div>
                </FadeUpScrollAnimation>
              </div>
            </Grid>
          </Grid>
        </div>
      </ScrollAnimation>
    </Container>
  );
}

const FadeUpScrollAnimation = props => (
  <ScrollAnimation
    animateOnce
    animateIn="fadeInUpShort"
    offset={-200}
    delay={200}
    duration={0.3}
    {...props}
  />
);

export default Testimonials;
