import { makeStyles } from '@material-ui/core/styles';

const heroStyles = makeStyles(theme => ({
  video: {
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden',
    width: '120%',
    '& iframe': {
      width: '100%',
      marginTop: -60,
      marginLeft: '-10%'
    },
    [theme.breakpoints.up('lg')]: {
      height: 650,
      transform: 'scale(1.5)',
      marginTop: -90
    },
    [theme.breakpoints.only('md')]: {
      height: 650,
      transform: 'scale(1.3)',
      marginTop: -60,
    },
    [theme.breakpoints.only('sm')]: {
      transform: 'scale(1.2)',
      marginTop: -50,
    },
    [theme.breakpoints.only('xs')]: {
      transform: 'scale(1.5)',
      marginTop: -30,
    },
    background: theme.palette.common.black,
  },
  illustration: {
    width: '100%',
    height: 500,
  },
  particleBackground: {
    position: 'absolute',
    width: '100%',
    height: 500,
    top: 0,
    left: 0
  },
  slideshow: {
    height: '100%',
    width: '100%',
    '& > div': {
      height: '100%',
      width: '100%',
    }
  },
  slideItem: {
    height: 500,
    width: '100%'
  },
  img: {
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  }
}));

export default heroStyles;
