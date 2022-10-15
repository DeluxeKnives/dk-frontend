import { makeStyles } from '@material-ui/core/styles';

const testiStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.text.secondary,
  },
  logo: {
    maxWidth: "300px"
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
  topMargin: {
    marginTop: '3rem'
  }
}));

export default testiStyles;
