import { makeStyles } from '@material-ui/core/styles';

const cardsStyles = makeStyles(theme => ({
  iconText: {
    position: 'relative',
    textAlign: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.rounded.big,
    background: theme.palette.background.paper,
    overflow: 'hidden',
    width: 240,
    height: 200,
    transition: 'all 0.3s ease-out',
    [theme.breakpoints.down(1500)]: {
      width: 200
    },
    '&:hover': {
      background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      '& $more': {
        bottom: 0,
      },
      '& $name': {
        color: theme.palette.common.white,
        top: 0,
        '&:after': {
          width: 30,
        }
      },
      '& $desc': {
        top: 0,
        opacity: 1,
      },
      '& $icon': {
        transform: 'scale(0.5)',
        opacity: 0,
      }
    }
  },
  icon: {
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s ease-out',
    '& span': {
      '&:before': {
        fontSize: 130,
        background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent'
      }
    }
  },
  more: {
    position: 'absolute',
    bottom: -90,
    width: '100%',
    padding: theme.spacing(3),
    left: 0,
    height: 200,
    transition: 'all 0.3s ease-out',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  name: {
    fontWeight: theme.typography.fontWeightBold,
    transition: 'all 0.3s ease-out',
    marginBottom: theme.spacing(4),
    top: 30,
    position: 'relative',
    '&:after': {
      content: '""',
      width: 0,
      transition: 'all 0.5s ease-out',
      display: 'block',
      position: 'relative',
      margin: '0 auto',
      top: theme.spacing(1),
      borderTop: '2px solid #FFF',
    }
  },
  desc: {
    top: 60,
    position: 'relative',
    opacity: 0,
    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    color: theme.palette.common.white,
  },
  figure: {},
  img: {},
  imgThumb: {
    border: `8px solid ${theme.palette.background.paper}`,
    position: 'relative',
    borderRadius: theme.rounded.big,
    overflow: 'hidden',
    '& button': {
      textAlign: 'left',
      width: '100%',
      height: '100%',
    },
    '& $figure': {
      height: '100%',
      width: '100%',
      position: 'relative',
      margin: 0,
      overflow: 'hidden',
      borderRadius: theme.rounded.big,
    },
    '& $img': {
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      transform: 'scale(1.1)',
      transition: 'transform 0.2s ease-out',
    },
    '&:hover': {
      '& $img': {
        transform: 'scale(1)'
      },
      '& $detail': {
        opacity: 1,
        backgroundPosition: '60% 0',
        '&:before': {
          bottom: 0
        },
        '& h6, & a, & div': {
          transform: 'translate(0, 20px)',
        }
      }
    }
  },
  simpleImg: {
    border: `8px solid ${theme.palette.background.paper}`,
    width: '100%',
    borderRadius: theme.rounded.big,
    '& $img': {
      display: 'block',
      width: '100%',
      backgroundSize: 'cover',
      transform: 'scale(1.1)',
      transition: 'transform 0.2s ease-out',
    },
    '&:hover': {
      '& $img': {
        transform: 'scale(1)'
      },
      '& $detail': {
        opacity: 1,
        backgroundPosition: '60% 0',
        '&:before': {
          bottom: 0
        },
        '& h6, & a, & div': {
          transform: 'translate(0, 20px)',
        }
      }
    },
    '& $figure': {
      height: '100%',
      width: '100%',
      position: 'relative',
      margin: 0,
      overflow: 'hidden',
      borderRadius: theme.rounded.big,
    },
    marginBottom: '1rem'
  },
  detail: {
    position: 'absolute',
    transition: 'all 0.3s ease-out',
    width: '100%',
    bottom: 0,
    opacity: 0,
    background: `linear-gradient(120deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    backgroundSize: '300%',
    backgroundPosition: '0% 0',
    padding: theme.spacing(3),
    paddingTop: theme.spacing(1),
    borderRadius: theme.rounded.big,
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      transition: 'all 0.4s ease-out'
    },
    '& h6': {
      position: 'relative',
      transform: 'translate(0, 60px)',
      marginBottom: theme.spacing(3),
      lineHeight: '36px'
    },
    '& a & div': {
      fontSize: 16,
      color: theme.palette.common.white,
      position: 'relative',
      transform: 'translate(0, 60px)',
    },
  },
  short: {
    height: 240,
    [theme.breakpoints.down('md')]: {
      height: 210
    },
    '& $img': {
      width: '100%'
    },
    '&:before': {
      width: 80,
      height: 80
    },
    '& $detail': {
      height: '100%',
    }
  },
  medium: {
    height: 320,
    [theme.breakpoints.down('xs')]: {
      height: 210
    },
    '& $img': {
      width: '100%'
    },
    '& $detail': {
      height: '80%',
    }
  },
  long: {
    height: 580,
    [theme.breakpoints.down('xs')]: {
      height: 210
    },
    '& $img': {
      height: '100%'
    },
    '&:before': {
      width: 190,
      height: 260
    },
    '& $figure': {
      '&:after': {
        width: 300,
        height: 300,
        left: -200,
        bottom: -120,
      }
    },
    '& $detail': {
      height: '25%',
    }
  },
  post: {
    height: 380,
    width: 256,
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 12
    },
    '& figure': {
      margin: 0,
      width: '100%',
      height: 250,
      overflow: 'hidden',
      '& img': {
        width: '100%',
        minHeight: '100%'
      }
    }
  },
  text: {
    height: 200,
    padding: theme.spacing(3),
    '& h5': {
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: theme.spacing(),
    },
    '& span': {
      color: theme.palette.text.secondary,
      display: '-webkit-box',
      '-webkit-line-clamp': 3,
      '-webkit-box-orient': 'vertical'
    }
  },
  textNoMargin: {
    height: 90,
    padding: theme.spacing(2),
    '& h5': {
      fontWeight: theme.typography.fontWeightMedium,
    }
  },
  readmore: {
    '& span': {
      fontWeight: theme.typography.fontWeightRegular
    },
    margin: theme.spacing(0, 3),
    lineHeight: '16px !important',
  },
  textReadmore: {
    color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
    padding: '0px!important',
  }
}));

export default cardsStyles;
