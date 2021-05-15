//---------------------------------
// AmbInt - Admin
// File : index.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         11 05 2021
//---------------------------------

//---------------------------------
// Documentation
//---------------------------------
// List all Organizations

//---------------------------------
// Imports
//---------------------------------
import { fetchCollection } from 'lib/firebase/db';

//---------------------------------
// Handler
//---------------------------------
export default async function handler(req, res) {
  const data = await fetchCollection();
  if (data) {
    return res.status(200).json(data);
  }

  return res.status(404).json({
    message: 'No organizations'
  });
}
