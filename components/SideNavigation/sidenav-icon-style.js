import { makeStyles, darken } from '@material-ui/core/styles';

const sideNavIconStyles = makeStyles(theme => ({
  logo: {
    display: 'block',
    margin: theme.spacing(1.5, 0),
    position: 'relative',
    textAlign: 'center',
    '& img': {
      width: '100%',
      height: 59
    }
  },
  menu: {
    margin: '0 auto',
    background: theme.palette.type === 'dark' ? darken(theme.palette.primary.dark, 0.5) : theme.palette.primary.light,
    boxShadow: theme.shade.light,
    padding: theme.spacing(0.5),
    borderRadius: theme.rounded.big,
    width: 80,
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
  icon: {
    display: 'block',
    minWidth: 0,
    margin: '0 auto',
    transition: 'all 0.3s ease-in',
    '& span': {
      fontSize: 36,
      background: `linear-gradient(120deg, ${theme.palette.type === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.main}, ${theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main})`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    }
  },
  text: {
    transition: 'all 0.3s cubic-bezier(0, 1.73, 1, 1.02)',
    color: theme.palette.common.white,
    visibility: 'hidden',
    position: 'absolute',
    left: -4,
    background: 'rgba(0, 0, 0, 0.8)',
    textTransform: 'capitalize',
    borderRadius: theme.rounded.medium,
    padding: theme.spacing(2, 2, 2, 7),
    zIndex: 2,
    whiteSpace: 'nowrap',
    opacity: 0,
    '& span': {
      fontSize: 18,
      fontWeight: theme.typography.fontWeightBold
    }
  },
  link: {
    background: 'none !important',
    textAlign: 'center',
    borderRadius: theme.rounded.medium,
    padding: theme.spacing(1),
    '&:before': {
      content: '""',
      transition: 'all 0.75s ease-out',
      width: 0,
      height: 30,
      background: `linear-gradient(120deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
      borderRadius: 7,
      position: 'absolute',
      left: -4,
      top: 20,
      opacity: 0,
    },
    '&:hover': {
      '&:before': {
        opacity: 1,
        width: 7,
      },
      '& $icon': {
        zIndex: 3,
        '& span': {
          color: theme.palette.common.white,
          background: 'transparent',
          '-webkit-text-fill-color': 'currentColor',
        },
      },
      '& $text': {
        visibility: 'visible',
        opacity: 1,
        left: theme.spacing(1)
      }
    }
  },
}));

export default sideNavIconStyles;
