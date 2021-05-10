//---------------------------------
// AmbInt - Admin
// File : index.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         07 05 2021
//---------------------------------
const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:3000' : 'https://yourwebsite.com'
