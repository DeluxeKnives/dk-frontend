const { i18n } = require('./next-i18next.config')
const withImages = require('next-images');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = withImages({
  // i18n,
  trailingSlash: true,
  images: {
    disableStaticImages: true
  },
  publicRuntimeConfig: {
    localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
      ? process.env.LOCALE_SUBPATHS
      : 'none',
  },
  webpack: (config, options) => {
    cssModules: true,
    config.plugins.push(
      //      new ESLintPlugin({
      //        exclude: ['node_modules']
      //      })
    );
    config.node = {}
    return config;
  },
  env: {
    NEAR_NETWORK: "testnet",
    NEXT_PUBLIC_DEVELOPER_KEY: "0da4bb5e-3666-467a-a98a-f4adfdf81ae6",
    MINTBASE_MARKET_ADDRESS: "market-v2-beta.mintspace2.testnet",
    MINTBASE_SHOP_ID: "shopifyteststore.mintspace2.testnet",
    BACKEND_URL: "http://52.90.177.47:8080"
  }
});
