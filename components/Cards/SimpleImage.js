import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useText } from '~/theme/common';
import useStyles from './cards-style';

export default function ImageThumb(props) {
  const classes = useStyles();
  const {
    img,
    onClick
  } = props;

  return (
    <Paper className={clsx(classes.simpleImg, 'long')} >
      <img className={classes.img} src={img} />
    </Paper>
  );
}

ImageThumb.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  openPopup: PropTypes.func,
};

ImageThumb.defaultProps = {
  openPopup: () => {}
};
