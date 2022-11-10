import React from 'react';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-i18next';
import ScrollAnimation from 'react-scroll-animation-wrapper';
import { useText } from '~/theme/common';
import Title from '../Title';
import useStyles from './faq-style';

const faqData = [
  {
    q: 'What do you mean by a real knife?',
    a: 'We mean that they are real, shipped to your door. As in you can hold them in your hand. Chop carrots if you would like.'
  },
  {
    q: 'How do I receive the knife after purchasing my NFT?',
    a: 'When you purchase an NFT that has not been redeemed yet, you will be able to redeem it. Our backend will generate you a discount code for you to use on our Shopify store to receive a free knife (shipping is FREE for most countries).'
  },
  {
    q: 'Is the NFT burnt after redeeming it?',
    a: 'No. You can still transfer it and access any metaverse components that come with it. It cannot be used for another discount code.'
  },
  {
    q: 'What about copyright?',
    a: 'CSGO skins are protected by copyright. These knives are definitely inspired by popular skins, but are not exact copies. We do not claim for them to be exact copies or endorsed by their original creators, as cool as their originals are. '
  },
  {
    q: 'Why NFTs?',
    a: 'Selling knives are cool, but we want to sell an experience with these knives too. NFTs allow us to introduce digital twins for our product, opening the door for potential collaboration with the rest of Web3. '
  },
  {
    q: 'Is the price higher than the traditional store?',
    a: 'Prices aim to be about the same as the price on the main site. Prices in NEAR may be updated over time to better reflect current market conditions.'
  },
];

function Faq() {
  const classes = useStyles();
  const text = useText();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { t } = useTranslation('common');
  const [expanded, setExpanded] = React.useState(0);
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={6}>
          <Grid item md={6} sm={12} xs={12} className={classes.w100SM}>
            <ScrollAnimation
              animateOnce
              animateIn="fadeInLeftShort"
              offset={100}
              delay={200}
              duration={0.3}
            >
              <Title align={isMobile ? 'center' : 'left'}>
                {t('home.faq')}
              </Title>
              <Hidden smDown>
                <div className={classes.illustration}>
                  <img src="/images/K-Gamma-Doppler.png" alt="illustration" />
                </div>
              </Hidden>
            </ScrollAnimation>
          </Grid>
          <Grid item md={6} sm={12}>
            <ScrollAnimation
              animateOnce
              animateIn="fadeInRightShort"
              offset={100}
              delay={200}
              duration={0.3}
            >
              <div className={classes.accordion}>
                {faqData.map((item, index) => (
                  <div className={classes.item} key={index.toString()}>
                    <Accordion
                      classes={{
                        root: classes.paper
                      }}
                      expanded={expanded === index}
                      onChange={handleChange(index)}
                    >
                      <AccordionSummary
                        classes={{
                          content: classes.content,
                          expanded: classes.expanded,
                        }}
                      >
                        <Typography className={classes.heading}>{item.q}</Typography>
                        <ExpandMoreIcon className={classes.icon} />
                      </AccordionSummary>
                      <AccordionDetails
                        classes={{
                          root: classes.detail,
                        }}
                      >
                        <Typography>
                          {item.a}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Faq;
