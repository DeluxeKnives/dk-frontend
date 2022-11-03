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
    <React.Fragment>
      <Paper className={clsx(classes.simpleImg, 'long')}>
        <div className={classes.topLeft}>
          {props.children}
        </div>
        <div className={classes.figure}>
          <img className={classes.img} src={img} />
        </div>
      </Paper>
    </React.Fragment>
  );
}

SimpleImage.propTypes = {
  img: PropTypes.string.isRequired
};
