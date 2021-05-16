//---------------------------------
// AmbInt - Admin
// File : [id].js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         16 05 2021
//---------------------------------

//---------------------------------
// Documentation
//---------------------------------
// Get info on Organization with ID
// List all rooms registered by an Organization

//---------------------------------
// Imports
//---------------------------------
import { fetchData } from 'lib/firebase/db';

//---------------------------------
// Handler
//---------------------------------
export default async function handler({ query }, res) {
  const data = await fetchData(query.id);
  if (data) {
    return res.status(200).json(data);
  }

  return res.status(404).json({
    message: 'Organization not found'
  });
}
