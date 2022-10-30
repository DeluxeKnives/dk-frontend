import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useText } from '~/theme/common';
import useStyles from './cards-style';

export default function SimpleImage(props) {
  const classes = useStyles();
  const { img } = props;

  return (
    <Paper className={clsx(classes.simpleImg, 'long')} >
      <div className={classes.figure}>
        <img className={classes.img} src={img} />
      </div>
    </Paper>
  );
}

SimpleImage.propTypes = {
  img: PropTypes.string.isRequired
};
