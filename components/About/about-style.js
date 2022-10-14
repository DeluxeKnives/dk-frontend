import { makeStyles } from '@material-ui/core/styles';
const gold = '#EF5923';

const aboutStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    '& > div': {
      [theme.breakpoints.down('xs')]: {
        padding: 0
      }
    }
  },
  about: {
    display: 'flex',
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      '& > h5': {
        fontSize: 18,
        lineHeight: '28px',
        marginTop: theme.spacing(7),
        padding: theme.spacing(0, 2)
      }
    }
  },
  line: {
    borderTop: 0,
    borderLeft: 0,
    height: 40,
    width: 'calc(100% - 130px)',
    border: '2px solid',
    borderImageSource: `linear-gradient(120deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    borderImageSlice: 1,
    position: 'relative',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  reward: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0.5, 7, 0, 0),
    },
    [theme.breakpoints.down('xs')]: {
      overflow: 'auto'
    }
  },
  item: {
    textAlign: 'center',
    color: gold,
    margin: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    },
    '& figure': {
      height: 70,
      margin: theme.spacing(0, 0, 2),
      [theme.breakpoints.down('sm')]: {
        height: 50
      },
      '& img': {
        height: '100%',
      },
    },
    '& p': {
      fontFamily: 'Times New Roman',
      [theme.breakpoints.down('sm')]: {
        fontSize: 16
      }
    },
    '& h5': {
      fontWeight: theme.typography.fontWeightMedium,
      textTransform: 'uppercase',
      [theme.breakpoints.down('sm')]: {
        fontSize: 16
      }
    },
  },
  photo: {
    position: 'relative',
    marginTop: -140,
    background: theme.palette.common.white,
    width: 270,
    height: 335,
    zIndex: 1,
    borderRadius: theme.rounded.big,
    [theme.breakpoints.down('sm')]: {
      width: 200,
      minHeight: 200,
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: -40,
    },
    '& figure': {
      margin: 0,
      borderRadius: theme.rounded.big,
      overflow: 'hidden',
      '& img': {
        width: '100%',
        minHeight: '100%',
      }
    }
  },
  frame: {
    position: 'absolute',
    width: '90%',
    left: '5%',
    top: theme.spacing(2),
    height: '105%',
    border: '2px solid transparent',
    background: `linear-gradient(120deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main}) border-box`,
    mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
    maskComposite: 'xor',
    zIndex: 5,
    borderRadius: theme.rounded.big
  },
  socmed: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: `${theme.spacing(4)}px auto`,
    maxWidth: 600,
    '& button': {
      margin: theme.spacing(1, 2),
      width: 36,
      height: 36,
      '& i': {
        color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
      }
    },
    '& i': {
      fontSize: 22
    }
  },
}));

export default aboutStyles;
