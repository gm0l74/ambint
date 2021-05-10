//---------------------------------
// AmbInt - Admin
// File : [id].js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         07 05 2021
//---------------------------------

//---------------------------------
// Documentation
//---------------------------------
// Get info on Organization with ID
// List all rooms registered by an Organization

//---------------------------------
// Handler
//---------------------------------
export default function handler({ query }, res) {
  res.status(200).json({
    id: '1',
    name: 'Instituto Superior Técnico'
  });

  // res.status(404).json({ message: `org with id ${id} is not found})
}
