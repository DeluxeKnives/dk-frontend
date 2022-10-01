import { makeStyles } from '@material-ui/core/styles';

const counterStyles = makeStyles(theme => ({
  counterWrap: {
    borderRadius: theme.rounded.big,
    overflow: 'hidden',
    position: 'relative',
    background: `linear-gradient(120deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    padding: theme.spacing(5, 0),
    '&:before': {
      background: theme.palette.type === 'dark' ? theme.palette.background.default : '#EEEEEE',
      content: '""',
      borderRadius: theme.rounded.big,
      position: 'absolute',
      width: 'calc(100% - 2px)',
      height: 'calc(100% - 2px)',
      left: 1,
      top: 1
    }
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  counterItem: {
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(5),
    },
    '& i': {
      background: `linear-gradient(120deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      marginRight: theme.spacing(2),
      fontSize: 64,
      lineHeight: '40px'
    }
  }
}));

export default counterStyles;
