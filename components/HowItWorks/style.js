import { makeStyles } from '@material-ui/core/styles';

const testiStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 5),
    boxShadow: `0px 1px 10px 3px ${theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light}, 0px 1px 1px 0px ${theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main}, 0px 2px 1px -1px ${theme.palette.primary.dark}`,
    color: theme.palette.common.white,
    position: 'relative',
    zIndex: 8,
    borderRadius: theme.rounded.big,
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(5, 2),
    }
  },
  button: {},
  text: {
    paddingTop: theme.spacing(5),
    '& h3': {
      marginBottom: theme.spacing(3),
    },
    '& p': {
      marginBottom: theme.spacing(3),
      fontSize: 18,
      lineHeight: '32px',
    },
    '& $button': {
      minWidth: 160,
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.dark
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  title: {
    color: theme.palette.text.secondary,
  },
  paper: {
    width: 300,
    background: 'none',
    boxShadow: 'none'
  },
  paperBlock: {
    background: theme.palette.common.black,
    color: theme.palette.common.white,
    borderRadius: theme.rounded.big,
    padding: theme.spacing(3),
    marginBottom: 30,
    boxShadow: '0 1.5px 24.5px 4.5px rgba(0, 0, 0, 0.06)',
    '& h6': {
      marginTop: theme.spacing(2),
      fontSize: 14,
    },
    '& $title': {
      fontStyle: 'italic',
      fontSize: 12,
    },
    '&:before': {
      content: '""',
      borderTop: `15px solid ${theme.palette.common.black}`,
      borderLeft: '25px solid transparent',
      borderRight: '25px solid transparent',
      position: 'absolute',
      left: 'calc(50% - 25px)',
      bottom: 15
    }
  },
  card: {
    padding: theme.spacing(3),
    '& avatar': {
      width: 30,
      height: 30
    }
  },
  name: {
    display: 'flex',
    marginTop: theme.spacing(),
    alignItems: 'center',
    '& span': {
      display: 'inline-block',
      marginLeft: theme.spacing()
    }
  },
}));

export default testiStyles;
