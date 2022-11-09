import React, { useState } from 'react';
import ScrollAnimation from 'react-scroll-animation-wrapper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'next-i18next';
import Title from '../Title';
import useStyle from './style';

// Images
import nearImg from '~/public/images/partners/built-near.png';
import mintbaseImg from '~/public/images/partners/mintbase-logo.png';

function Partners() {
  const { t } = useTranslation('common');
  const classes = useStyle();

  return (
    <Container>
      <Title dark>
        {t('home.partners')}
      </Title>
      <Grid container className={classes.topMargin} alignItems="center" justifyContent="center">
        <Grid item>
          <div className={classes.text}>
            <ScrollAnimation
              animateOnce
              animateIn="fadeInUpShort"
              offset={-200}
              delay={300}
              duration={0.3}
            >
              <img src={nearImg} className={classes.logo} />
              <img src={mintbaseImg} className={classes.logo} />
            </ScrollAnimation>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Partners;
