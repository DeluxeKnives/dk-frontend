import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'next-i18next';
import { useText } from '~/theme/common';
import useStyles from './cards-style';

function BlogPost(props) {
  const classes = useStyles();
  const text = useText();
  const {
    img,
    title,
    desc,
  } = props;
  const { t } = useTranslation('common');

  return (
    <Paper className={classes.post}>
      <figure>
        <img src={img} alt="thumb" />
      </figure>
      <div className={classes.text}>
        <Typography variant="h5" className={text.subtitle2}>{title}</Typography>
        <Typography display="block" component="p" className={text.paragraph}>{desc}</Typography>
      </div>
      <Button
        href="#"
        color="primary"
        className={classes.readmore}
        classes={{
          root: classes.rootReadmore,
          text: classes.textReadmore
        }}
      >
        {t('unisex-landing.read_more')}
      </Button>
    </Paper>
  );
}

BlogPost.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default BlogPost;
