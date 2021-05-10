//---------------------------------
// AmbInt - Admin
// File : fetcher.js
//
// @ version             1.0
//
// @ start date          08 05 2021
// @ last update         08 05 2021
//---------------------------------

//---------------------------------
// Fetcher
//---------------------------------
const fetcher = async (url, token) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin'
  });

  return res.json();
};

//---------------------------------
// Exports
//---------------------------------
export default fetcher;
