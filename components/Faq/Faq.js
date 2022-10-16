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
import { useText } from '~/theme/common';
import Title from '../Title';
import useStyles from './faq-style';
import ScrollAnimation from 'react-scroll-animation-wrapper';

const faqData = [
  {
    q: 'Pellentesque ac bibendum tortor?',
    a: 'Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor. '
  },
  {
    q: 'In mi nulla, fringilla vestibulum?',
    a: 'Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor. '
  },
  {
    q: 'Quisque lacinia purus ut libero?',
    a: 'Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor. '
  },
  {
    q: 'Quisque ut metus sit amet augue?',
    a: 'Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor. '
  },
  {
    q: 'Pellentesque ac bibendum tortor?',
    a: 'Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor. '
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
          <Grid item md={6} sm={12}>
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
                  <img src="/images/crypto/faq.png" alt="illustration" />
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
