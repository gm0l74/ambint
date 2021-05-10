//---------------------------------
// AmbInt - Admin
// File : FloorItem.js
//
// @ version             1.0
//
// @ start date          07 05 2021
// @ last update         07 05 2021
//---------------------------------
import Link from "next/link";

//---------------------------------
// component FloorItem
//---------------------------------
const FloorItem = ({ floor }) => {
  return (
    <Link href={`/organization/${floor.id}`}>
      <a>
        <h3>
          {floor.name}
        </h3>
      </a>
    </Link>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default FloorItem;
