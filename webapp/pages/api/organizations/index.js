//---------------------------------
// AmbInt - Admin
// File : index.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         07 05 2021
//---------------------------------

//---------------------------------
// Documentation
//---------------------------------
// List all Organizations

//---------------------------------
// Handler
//---------------------------------
export default function handler(req, res) {
  res.status(200).json([
    {
    id: '1',
    name: 'Instituto Superior Técnico'
    },
  ]);
}
