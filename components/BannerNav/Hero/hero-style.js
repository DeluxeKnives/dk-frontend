import { makeStyles } from '@material-ui/core/styles';

const heroStyles = makeStyles(theme => ({
  video: {
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden',
    height: 500,
    width: '120%',
    '& iframe': {
      width: '100%',
      marginTop: -60,
      marginLeft: '-10%'
    },
    [theme.breakpoints.up('md')]: {
      height: 650,
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
