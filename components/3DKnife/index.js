import Spline from '@splinetool/react-spline';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  knife: {
    position: "absolute",
    zIndex: 5,

    [theme.breakpoints.up('xl')]: {
      top: -60,
      right: "10%"
    },

    [theme.breakpoints.up('lg')]: {
      top: -60,
      right: "0%"
    },

    [theme.breakpoints.only('md')]: {
      top: -60,
      right: "-10%",
      transform: "scale(0.8)"
    },

    [theme.breakpoints.down('sm')]: {
      top: -100,
      right: -150,
      transform: "scale(0.6)"
    },

    [theme.breakpoints.down('xs')]: {
      top: -100,
      right: -200,
      transform: "scale(0.4)"
    },

  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <Spline className={classes.knife} scene="https://prod.spline.design/KjTUr0Xoj48vIbON/scene.splinecode" />
  );
}
