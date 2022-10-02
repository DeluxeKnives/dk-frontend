import { makeStyles, alpha } from '@material-ui/core/styles';

const connectStyles = makeStyles(theme => ({
  button: {
    height: '48px',
    WebkitLineClamp: '1',
    right: 0,
    position: 'relative'
  },
  container: {
    width: '300px',
    position: 'fixed',
    right: 0
  },
  top: {
    top: '16px'
  }
}));

export default connectStyles;
