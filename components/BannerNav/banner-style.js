import { makeStyles, alpha } from '@material-ui/core/styles';

const bannerStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(10),
      '& > div': {
        padding: 0
      }
    }
  },
  cover: {
    position: 'absolute',
    clip: 'rect(auto,auto, auto, auto)',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    zIndex: 1
  },
  figure: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  img: {
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  banner: {
    position: 'relative',
    padding: theme.spacing(10, 3, 0),
    color: theme.palette.common.white,
    height: 500,
    borderRadius: theme.rounded.big,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 420
    },
    [theme.breakpoints.down('xs')]: {
      height: 400
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5),
    },
  },
  text: {
    maxWidth: 800,
    zIndex: 1,
    overflow: 'hidden',
    borderRadius: theme.rounded.big,
    padding: theme.spacing(5),
    background: `linear-gradient(120deg, ${alpha(theme.palette.secondary.main, 0.5)}, ${alpha(theme.palette.primary.main, 0.5)})`,
    backdropFilter: 'saturate(180%) blur(10px)',
    '& > *': {
      position: 'relative',
      zIndex: 1,
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },
    '& h4, & h2, & h5': {
      marginBottom: theme.spacing()
    }
  },
  storelogo: {
    zIndex: 1,
    margin: 'auto',
    marginRight: '',
    [theme.breakpoints.down('md')]: {
      marginRight: 'auto'
    }
  },
  socmed: {
    '& button': {
      margin: theme.spacing(),
      color: theme.palette.primary.dark,
      width: 36,
      height: 36,
      '& i': {
        color: alpha(theme.palette.common.white, 0.75),
      }
    },
    '& i': {
      fontSize: 24
    }
  },
  bar: {},
  settingIcon: {
    position: 'absolute',
    top: theme.spacing(10),
    right: theme.spacing(10),
    '& svg': {
      fill: theme.palette.common.white
    }
  },
  mobileMenu: {
    marginRight: theme.spacing(),
    '& $bar': {
      backgroundColor: theme.palette.text.secondary,
      '&:after, &:before': {
        backgroundColor: theme.palette.text.secondary,
      }
    }
  },
  mobileNav: {
    width: 240,
    background: theme.palette.background.default,
    padding: theme.spacing(10, 2, 4)
  },
  menuList: {
    textTransform: 'capitalize'
  },
  download: {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
    fontSize: 14,
    padding: theme.spacing(0.5, 2),
    marginRight: theme.spacing(3)
  }
}));

export default bannerStyles;
