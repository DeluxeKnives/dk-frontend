// pages/[locale]/about.js
// It's a real page containing translations or components with translations

import React from 'react';
import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';                                

export default function Store() {
  const { t } = useTranslation('common');
  return (
    <div>
      <p>This is the store page</p>
      <p>{t('title')}</p>
    </div>
  );
}

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };