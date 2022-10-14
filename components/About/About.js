import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-i18next';
import brand from '~/public/text/brand';
import { useText } from '~/theme/common';
import useStyles from './about-style';

function About() {
  const theme = useTheme();
  const classes = useStyles();
  const text = useText();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('common');

  return (
    <div className={classes.root}>
      <Container maxWidth={isMobile ? 'sm' : 'lg'}>
        <Grid container spacing={0}>
          <Grid item lg={2} xs={12} />
          <Grid item lg={9} xs={12}>
            <div className={classes.about}>
              <div className={classes.reward}>
                <div className={classes.item}>
                  <figure>
                    <img src="/images/unisex/reward1.svg" alt="badge" />
                  </figure>
                  <Typography component="p" className={text.paragraph}>Special Mention</Typography>
                  <Typography variant="h5" className={text.subtitle}>Awards</Typography>
                </div>
                <div className={classes.item}>
                  <figure>
                    <img src="/images/unisex/reward2.svg" alt="badge" />
                  </figure>
                  <Typography component="p" className={text.paragraph}>100k videos</Typography>
                  <Typography variant="h5" className={text.subtitle}>Subscriber</Typography>
                </div>
                <div className={classes.item}>
                  <figure>
                    <img src="/images/unisex/reward3.svg" alt="badge" />
                  </figure>
                  <Typography component="p" className={text.paragraph}>Best Filmography</Typography>
                  <Typography variant="h5" className={text.subtitle}>Footage</Typography>
                </div>
              </div>
              <Hidden mdUp>
                <div className={classes.socmed}>
                  <IconButton aria-label="Delete" className={classes.margin} size="small">
                    <i className="ion-logo-facebook" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin} size="small">
                    <i className="ion-logo-twitter" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin} size="small">
                    <i className="ion-logo-google" />
                  </IconButton>
                  <IconButton aria-label="Delete" className={classes.margin} size="small">
                    <i className="ion-logo-youtube" />
                  </IconButton>
                </div>
                <Typography variant="h5">
                  {t('unisex-landing.banner_desc')}
                </Typography>
              </Hidden>
              <Paper className={classes.photo}>
                <figure>
                  <img src={brand.unisex.avatar} alt="avatar" />
                </figure>
                <span className={classes.frame} />
              </Paper>
            </div>
            <div className={classes.line} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default About;
