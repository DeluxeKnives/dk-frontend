// pages/[locale]/about.js
// It's a real page containing translations or components with translations

import React from 'react';
import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import brand from '~/public/text/brand';
import Header from '../../components/Header';
import Gallery from '../../components/Gallery';

export default function Store(props) {
  const { t } = useTranslation('common');
  const { onToggleDark, onToggleDir } = props;

  return (
    <React.Fragment>
      <Head>
        <title>
          {brand.unisex.name}
        </title>
      </Head>
      <CssBaseline />
      <div>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
        />
        <section id="store-top" style={{ height: "300px" }}>

        </section>
        <section id="store">
          <Gallery />
        </section>
      </div>
    </React.Fragment>
  );
}

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };