//---------------------------------
// AmbInt - Admin
// File : _app.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         15 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React from 'react';
import ReactDOM from 'react-dom';

import Head from 'next/head';

import { AuthProvider } from 'lib/firebase/auth';

// Styling
// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'styles/tailwind.css';
import 'styles/auth.css';

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
        <title>Mesa Livre Manager</title>
      </Head>
      <Layout>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Layout>
    </React.Fragment>
  );
}
