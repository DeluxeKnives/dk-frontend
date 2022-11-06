import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
import SideNavigationIcon from '../../components/SideNavigation/SideNavigationIcon';
import brand from '~/public/text/brand';

const useStyles = makeStyles(theme => ({
  dedicatedPage: {
    background: theme.palette.type === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
  },
  wrap: {
    width: '100%',
    height: '100%',
    minHeight: 800,
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    overflow: 'hidden',
    marginBottom: theme.spacing(-15)
  },
}));

function Game(props) {
  const classes = useStyles();
  const { errorCode, stars } = props;
  const { t } = useTranslation('common');

  if (errorCode) {
    return (
      <Fragment>
        <Head>
          <title>
            {brand.unisex.name}
          </title>
        </Head>
        <div className={clsx(classes.dedicatedPage, classes.wrap)}>
          <SideNavigationIcon />
          <h2 style={{
 position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
}}
          >
            COMING SOON
          </h2>
        </div>
      </Fragment>
    );
  }

  return (
    <div className={classes.dedicatedPage}>
      <h3 className={classes.wrap}>
        COMING SOON
      </h3>
    </div>
  );
}

Game.propTypes = {
  errorCode: PropTypes.string,
  stars: PropTypes.number,
};

Game.defaultProps = {
  errorCode: '400',
  stars: 0,
};

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };

export default Game;
