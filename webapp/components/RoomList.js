//---------------------------------
// AmbInt - Admin
// File : RoomList.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         07 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import RoomItem from './RoomItem';

//---------------------------------
// component RoomList
//---------------------------------
const RoomList = ({ rooms }) => {
  return (
    <div>
      {
        rooms.map((room, index) => (
          <RoomItem
            key={index}
            room={room}
          />
        ))
      }
    </div>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default RoomList;
