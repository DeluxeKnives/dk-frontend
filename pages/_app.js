import React, { useState, useEffect } from 'react';
import App from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  createTheme,
  StylesProvider,
  jssPreset
} from '@material-ui/core/styles';
import { create } from 'jss';
import { PageTransition } from 'next-page-transitions';
import rtl from 'jss-rtl';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoadingBar from 'react-top-loading-bar';
import { appWithTranslation } from 'next-i18next';
import lngDetector from '../lib/languageDetector';
import appTheme from '../theme/appTheme';
import { NearWalletProvider } from '../lib/NearWalletProvider';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import {WebSocket} from 'ws';
import { getMainDefinition } from '@apollo/client/utilities';

/* import css vendors */
import 'react-image-lightbox/style.css';
import '~/vendors/hamburger-menu.css';
import 'animate.css/animate.css';
import '../vendors/top-loading-bar.css';
import '../vendors/animate-extends.css';
import '../vendors/page-transition.css';
import '../vendors/slick/slick.css';
import '../vendors/slick/slick-theme.css';

let themeType = 'dark';
if (typeof Storage !== 'undefined') { // eslint-disable-line
  themeType = localStorage.getItem('luxiTheme') || 'dark';
}

// GraphQL setup
const httpLink = new HttpLink({
  uri: `https://interop-${process.env.NEAR_NETWORK}.hasura.app/v1/graphql`
});
const wsLink = typeof window === 'undefined' ? null : new GraphQLWsLink(createClient({
  url: `wss://interop-${process.env.NEAR_NETWORK}.hasura.app/v1/graphql`,
  options: { reconnect: true },
  webSocketImpl: WebSocket
}));
const link =
  typeof window !== "undefined" && wsLink != null
    ? split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === "OperationDefinition" &&
          def.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
    : httpLink;
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function MyApp(props) {
  const [loading, setLoading] = useState(0);
  const curLang = lngDetector.detect();

  const [theme, setTheme] = useState({
    ...appTheme('deluxe_custom', themeType),
    direction: curLang === 'ar' ? 'rtl' : 'ltr'
  });

  useEffect(() => {
    // Set layout direction
    document.dir = curLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', curLang);

    // Remove preloader
    const preloader = document.getElementById('preloader');
    if (preloader !== null || undefined) {
      setTimeout(() => {
        preloader.remove();
      }, 1500);
    }

    // Remove loading bar
    setLoading(0);
    setTimeout(() => { setLoading(100); }, 2000);

    // Refresh JSS in SSR
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const toggleDarkTheme = () => {
    const newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light';
    localStorage.setItem('luxiTheme', theme.palette.type === 'light' ? 'dark' : 'light');
    setTheme({
      ...appTheme('uni', newPaletteType),
      direction: theme.direction,
    });
  };

  const toggleDirection = dir => {
    document.dir = dir;
    setTheme({
      ...theme,
      direction: dir,
      palette: {
        ...theme.palette
      }
    });
  };

  const muiTheme = createTheme(theme);
  const { Component, pageProps, router } = props; // eslint-disable-line
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <LoadingBar
            height={0}
            color={theme.palette.primary.light}
            progress={loading}
            className="top-loading-bar"
          />
          <NearWalletProvider
            network={process.env.NEAR_NETWORK}
            apiKey={process.env.MINTBASE_API_KEY}
          >
            <ApolloProvider client={client}>
              <div id="main-wrap">
                <PageTransition timeout={300} classNames="page-fade-transition">
                  <Component
                    {...pageProps}
                    onToggleDark={toggleDarkTheme}
                    onToggleDir={toggleDirection}
                    key={router.route}
                  />
                </PageTransition>
              </div>
            </ApolloProvider>
          </NearWalletProvider>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}
/*

*/

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

MyApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) });

export default appWithTranslation(MyApp);
