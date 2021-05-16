//---------------------------------
// AmbInt - Admin
// File : [fid].js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         16 05 2021
//---------------------------------

//---------------------------------
// Documentation
//---------------------------------
// Get info on Floor with FID from Room with RID from Organization with ID

//---------------------------------
// Imports
//---------------------------------
import { fetchData } from 'lib/firebase/db';

//---------------------------------
// Handler
//---------------------------------
export default async function handler({ query }, res) {
  // Fetch the organization
  const org = await fetchData(query.id);
  if (!org) {
    return res.status(404).json({
      message: 'Organization not found'
    });
  }

  // Get the organization's rooms
  const rooms_ids = org.rooms;
  if (!rooms_ids) {
    return res.status(404).json({
      message: 'Organization has no rooms'
    });
  }

  if (!rooms_ids.includes(query.rid)) {
    return res.status(500).json({
      message: 'Room missing or is not from this organization'
    });
  }

  // Fetch the room
  const room = await fetchData(query.rid, 'rooms');
  if (!room) {
    return res.status(404).json({
      message: 'Room not found'
    });
  }

  const floors_ids = room.floors;
  if (!floors_ids) {
    return res.status(404).json({
      message: 'Room has floors'
    });
  }

  // Fetch the floor
  const floor = await fetchData(query.fid, 'floors');
  if (floor) {
    return res.status(200).json(floor);
  }

  return res.status(404).json({
    message: 'Floor not found'
  });
}
