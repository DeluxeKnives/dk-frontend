import { makeStyles } from '@material-ui/core/styles';

const titleStyles = makeStyles(theme => ({
  dark: {},
  title: {
    display: 'block',
    position: 'relative',
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    height: theme.spacing(8),
    backgroundSize: 72,
    padding: theme.spacing(2, 0),
    '& h4': {
      color: theme.palette.text.primary,
      verticalAlign: 'middle',
      fontWeight: theme.typography.fontWeightRegular,
      textTransform: 'capitalize',
      fontSize: 36,
      lineHeight: '56px',
      [theme.breakpoints.down('md')]: {
        fontSize: 32,
        lineHeight: '48px'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 24,
        lineHeight: '36px',
      },
      '& strong': {
        fontWeight: theme.typography.fontWeightBold,
      }
    },
    '&:after': {
      content: '""',
      width: 12,
      height: 12,
      bottom: -16,
      borderRadius: 12,
      background: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
      position: 'absolute',
      left: '50%',
      marginLeft: -6
    },
    '&$dark': {
      '& h4': {
        color: theme.palette.common.white,
      },
      '&:after': {
        background: theme.palette.primary.light
      }
    }
  }
}));

export default titleStyles;
