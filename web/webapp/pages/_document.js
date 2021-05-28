//---------------------------------
// AmbInt - Admin
// File : _document.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         20 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

//---------------------------------
// class AppDocument
//---------------------------------
class AppDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='theme-color' content='#000000' />
        </Head>
        <body className='text-blueGray-700 antialiased'>
          <div id='page-transition'></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

//---------------------------------
// Exports
//---------------------------------
export default AppDocument;
