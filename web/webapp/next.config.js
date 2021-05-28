//---------------------------------
// AmbInt - Admin
// File : next.config.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         28 05 2021
//---------------------------------
const { createSecureHeaders } = require('next-secure-headers');

module.exports = {
  // async headers() {
  //   return [{
  //     source: '/(.*)',
  //     headers: createSecureHeaders({
  //       forceHTTPSRedirect: [
  //         false,
  //         {
  //           maxAge: 60 * 60 * 24 * 4,
  //           includeSubDomains: true
  //         }
  //       ],
  //       referrerPolicy: 'same-origin'
  //     })
  //   }];
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
