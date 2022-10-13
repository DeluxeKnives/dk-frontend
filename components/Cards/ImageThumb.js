import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useText } from '~/theme/common';
import useStyles from './cards-style';

export default function ImageThumb(props) {
  const classes = useStyles();
  const text = useText();
  const {
    img,
    title,
    price,
    remaining,
    size,
    onClick
  } = props;

  const setSize = sizePaper => {
    switch (sizePaper) {
      case 'short':
        return classes.short;
      case 'long':
        return classes.long;
      default:
        return classes.medium;
    }
  };
  
  return (
    <Paper className={clsx(classes.imgThumb, setSize(size))}>
      <ButtonBase onClick={onClick}>
        <div className={classes.figure}>
          <div className={classes.img} style={{ backgroundImage: `url(${img})` }} />
        </div>
        <div className={classes.detail}>
          <Typography variant="h6" className={text.subtitle}>{title}</Typography>
          <div>
            <span>Price:</span>
            <span style={{ float: "right" }}>{price} NEAR</span>
          </div>
          <div>
            <span>Remaining:</span>
            <span style={{ float: "right" }}>{remaining} Units</span>
          </div>
        </div>
      </ButtonBase>
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
  openPopup: () => { }
};
