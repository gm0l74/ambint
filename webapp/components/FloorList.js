//---------------------------------
// AmbInt - Admin
// File : FloorList.js
//
// @ version             1.0
//
// @ start date          07 05 2021
// @ last update         07 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import FloorItem from './FloorItem';

//---------------------------------
// component FloorList
//---------------------------------
const FloorList = ({ floors }) => {
  return (
    <div>
      {
        floors.map((floor, index) => (
          <FloorItem
            key={index}
            floor={floor}
          />
        ))
      }
    </div>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default FloorList;
