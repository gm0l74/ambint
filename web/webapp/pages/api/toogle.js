//---------------------------------
// AmbInt - Admin
// File : toogle.js
//
// @ version             1.0
//
// @ start date          16 05 2021
// @ last update         20 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import { toogle } from 'lib/firebase/db';

//---------------------------------
// Handler
//---------------------------------
export default async function handler({ query }, res) {
  if (!query.uid) {
    return res.status(500).json({
      message: 'Parameter "uid" was not specified'
    });
  }

  if (!query.state) {
    return res.status(500).json({
      message: 'Parameter "state" was not specified'
    });
  }

  const result = await mark(query.uid, query.state);
  if (!result) {
    return res.status(404).json({
      message: 'Seat not found'
    });
  }

  return res.status(200).json({
    message: 'ok'
  });
}
