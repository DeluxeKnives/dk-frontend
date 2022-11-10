import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'next-i18next';
import { useText } from '~/theme/common';
import useStyles from './cards-style';

function ComingSoon(props) {
  const classes = useStyles();
  const text = useText();
  const {
    img,
    title,
    link,
  } = props;
  const { t } = useTranslation('common');

  return (
    <Paper className={classes.post}>
      <div style={{
 height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
}}
      >
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h5" className={text.title2}>
            COMING SOON
          </Typography>
          <Typography className={text.paragraph}>
            New knives every month.
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default ComingSoon;
