//---------------------------------
// AmbInt - Admin
// File : RoomItem.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         07 05 2021
//---------------------------------
import Link from "next/link";

//---------------------------------
// component RoomItem
//---------------------------------
const RoomItem = ({ room }) => {
  return (
    <Link href={`/organization/${room.id}`}>
      <a>
        <h3>
          {room.name}
        </h3>
      </a>
    </Link>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default RoomItem;
