import React, { useEffect } from 'react';
import useStyles from './hero-style';

function Animation() {
  const classes = useStyles();

  useEffect(() => {
    if (window.VANTA !== undefined) {
      window.VANTA.HALO({
        el: '#vanta_art',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 400.00,
        minWidth: 400.00,
        size: 3.00
      });
    }
  }, []);

  return (
    <div className={classes.illustration} id="vanta_art" />
  );
}

export default Animation;
