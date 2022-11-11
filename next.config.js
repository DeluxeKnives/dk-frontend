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
  webpack: (config, { isServer }) => {
    cssModules: true,
      config.plugins.push(
        //      new ESLintPlugin({
        //        exclude: ['node_modules']
        //      })
      );

    // if (!isServer) {
    //   // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
    //   config.resolve.fallback = {
    //     ws: false,
    //     '@splinetool/runtime': false
    //   }
    // }

    config.node = {}
    return config;
  },
  env: {
    // NEAR_NETWORK: "mainnet",
    // NEXT_PUBLIC_DEVELOPER_KEY: "0da4bb5e-3666-467a-a98a-f4adfdf81ae6",
    // MINTBASE_MARKET_ADDRESS: "simple.market.mintbase1.near",
    // MINTBASE_SHOP_ID: "deluxeknives.mintbase1.near",
    // BACKEND_URL: "https://backend.deluxeknives.com",
    NEAR_NETWORK: "testnet",
    NEXT_PUBLIC_DEVELOPER_KEY: "0da4bb5e-3666-467a-a98a-f4adfdf81ae6",
    MINTBASE_MARKET_ADDRESS: "market-v2-beta.mintspace2.testnet",
    MINTBASE_SHOP_ID: "shopifyteststore.mintspace2.testnet",
    BACKEND_URL: "http://localhost:8080"
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
});
