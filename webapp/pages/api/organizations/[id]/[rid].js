//---------------------------------
// AmbInt - Admin
// File : [rid].js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         07 05 2021
//---------------------------------

//---------------------------------
// Documentation
//---------------------------------
// Get info on Room with ID from Organization with ID
// List all floors registered by a Room

//---------------------------------
// Handler
//---------------------------------
export default function handler({ query }, res) {
  console.log(query);
  res.status(200).json({
    id: '1',
    name: 'Instituto Superior Técnico'
  });

  // res.status(404).json({ message: `org with id ${id} is not found})
}
