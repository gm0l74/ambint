//---------------------------------
// AmbInt - Admin
// File : _app.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         20 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import Head from 'next/head';
import Router from 'next/router';

import { AuthProvider } from 'lib/firebase/auth';

import PageChange from 'components/PageChange';

// Styling
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'styles/tailwind.css';
import 'styles/auth.css';

//---------------------------------
// Router
//---------------------------------
Router.events.on('routeChangeStart', (url) => {
  document.body.classList.add('body-page-transition');
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById('page-transition')
  );
});

Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});

Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});

//---------------------------------
// Exports
//---------------------------------
export default function App({ Component, classes, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <React.Fragment>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <title>MesaLivre Manager</title>
      </Head>
      <Layout>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Layout>
    </React.Fragment>
  );
}
