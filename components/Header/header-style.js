import { makeStyles, alpha } from '@material-ui/core/styles';

const headerStyles = makeStyles(theme => ({
  '@keyframes slideRight': {
    from: {
      opacity: 0,
      transform: 'translateX(-100px)'
    },
    to: {
      opacity: 1,
      transform: 'none'
    }
  },
  fixed: {},
  openDrawer: {},
  header: {
    color: theme.palette.text.primary,
    background: 'none',
    boxShadow: 'none',
    position: 'fixed',
    visibility: 'hidden',
    opacity: 0,
    '&$fixed': {
      transition: 'opacity 0.5s ease-out',
      position: 'fixed',
      visibility: 'visible',
      opacity: 1,
      zIndex: 10,
      padding: theme.spacing(1),
      background: alpha(theme.palette.background.paper, 0.8),
      backdropFilter: 'saturate(180%) blur(10px)',
      '& $logo': {
        '& a': {
          color: theme.palette.text.primary,
        },
      },
      '& $bar': {
        [theme.breakpoints.down('sm')]: {
          backgroundColor: theme.palette.text.secondary,
          '&:after, &:before': {
            backgroundColor: theme.palette.text.secondary
          }
        }
      }
    },
    '&$openDrawer': {
      zIndex: 1001,
      [theme.breakpoints.up('md')]: {
        background: 'none',
        backdropFilter: 'none',
      }
    }
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& nav': {
      alignItems: 'center',
      display: 'flex'
    }
  },
  logo: {
    flex: 1,
    display: 'flex',
    padding: theme.spacing(0, 2),
    justifyContent: 'center',
    '& a': {
      textDecoration: 'none',
      display: 'flex',
      fontSize: 22,
      color: theme.palette.text.primary,
      alignItems: 'center',
      fontWeight: 500,
      [theme.breakpoints.down('sm')]: {
        color: theme.palette.common.white
      }
    },
    '& img': {
      transition: 'all 0.3s ease-out',
      width: 48,
      height: 48,
      marginRight: theme.spacing()
    }
  },
  invert: {},
  navLogo: {
    width: '100%',
    '&$invert': {
      '& $logo': {
        '& a': {
          color: theme.palette.text.primary,
        }
      },
      '& $mobileMenu': {
        '& $bar': {
          [theme.breakpoints.down('sm')]: {
            backgroundColor: theme.palette.text.secondary,
            '&:after, &:before': {
              backgroundColor: theme.palette.text.secondary
            },
          }
        }
      },
    }
  },
  titleMenu: {
    textTransform: 'capitalize'
  },
  bar: {},
  menu: {},
  menuOpen: {},
  show: {},
  paperNav: {
    background: alpha(theme.palette.background.paper, 0.85),
    backdropFilter: 'saturate(180%) blur(10px)',
    width: '100%',
    position: 'fixed',
    zIndex: 50,
    height: '100%',
  },
  mobileMenu: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 1),
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0
    },
    '& $bar': {
      backgroundColor: theme.palette.text.secondary,
      '&:after, &:before': {
        backgroundColor: theme.palette.text.secondary
      },
      [theme.breakpoints.down('sm')]: {
        backgroundColor: theme.palette.common.white,
        '&:after, &:before': {
          backgroundColor: theme.palette.common.white
        },
      }
    }
  },
  rootMenu: {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: '100%',
    marginTop: 100,
  },
  detail: {
    position: 'relative',
    padding: theme.spacing(0, 4),
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
      marginTop: 100,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(5)
    }
  },
  nameDeco: {
    margin: 0,
    padding: 0,
    transform: 'rotate(-90deg)',
    transformOrigin: 'top right',
    letterSpacing: 10,
    position: 'absolute',
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'uppercase',
    color: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
    top: 0,
    left: '-50%',
    fontSize: 18,
    zIndex: 20,
  },
  logoName: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(5)
    },
    '& img': {
      filter: 'grayscale(1) contrast(0.5) brightness(1.5)',
      width: 80,
      marginBottom: theme.spacing(2)
    },
    '& h4': {
      textTransform: 'uppercase',
    }
  },
  margin: {
    margin: theme.spacing(2)
  },
  socmed: {
    margin: theme.spacing(3, 0, 3, -2),
    '& button': {
      margin: theme.spacing(),
      width: 36,
      height: 36,
    },
    '& i': {
      fontSize: 24
    }
  },
  tw: {
    color: '#20B1D1'
  },
  fb: {
    color: '#193CCC'
  },
  in: {
    color: '#0050FF'
  },
  ig: {
    color: '#A418E6'
  },
  contact: {
    color: theme.palette.text.secondary,
  },
  divider: {
    margin: theme.spacing(1.5),
    border: 'none',
    background: 'none'
  },
  download: {
    marginTop: theme.spacing(3)
  },
  mobileNav: {
    height: '100%',
    position: 'relative',
    overflow: 'auto',
    '& $menu': {
      padding: theme.spacing(0, 2),
      overflow: 'auto',
      width: '100%',
      height: '100%',
      listStyle: 'none',
      '& li': {
        textAlign: 'left',
        animationName: '$slideRight',
        animationTimingFunction: 'ease',
        '& a': {
          fontSize: 24,
          marginBottom: theme.spacing(),
          padding: theme.spacing(1, 3),
          [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(1, 4),
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            opacity: 0.2,
            borderRadius: theme.rounded.medium,
            overflow: 'hidden',
            background: `linear-gradient(120deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            height: '100%',
            width: 0,
            transition: 'all 0.2s cubic-bezier(0, 0, 0.14, 0.97)'
          },
          '&:hover': {
            color: theme.palette.primary.main,
            background: 'none',
            '&:before': {
              width: '100%'
            },
          }
        }
      },
    }
  },
  menuList: {
    textTransform: 'capitalize',
    '& span': {
      fontSize: 24
    }
  }
}));

export default headerStyles;
