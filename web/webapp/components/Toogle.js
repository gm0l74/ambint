//---------------------------------
// AmbInt - Admin
// File : Toogle.js
//
// @ version             1.0
//
// @ start date          20 05 2021
// @ last update         20 05 2021
//---------------------------------

//---------------------------------
// Documentation
//---------------------------------
// Inpired by
// https://tailwindcomponents.com/component/ios-switches

//---------------------------------
// Imports
//---------------------------------
import React, { useState } from "react";

//---------------------------------
// component Toogle
//---------------------------------
const Toogle = ({
  toogle = true,
  callback = () => {}
}) => {
  const [state, setState] = useState(toogle);

  return (
    <>
      {
        !state &&
        <span
          className="border rounded-full border-grey bg-red-500 flex items-center cursor-pointer w-12 justify-start"
          onClick={() => {
            setState(true);
            callback(true);
          }}
        >
          <span className="rounded-full border w-6 h-6 border-grey shadow-inner bg-white shadow">
          </span>
        </span>
      }
      {
        state &&
        <span
          className="border rounded-full border-grey flex items-center cursor-pointer w-12 bg-green-500 justify-end"
          onClick={() => {
            setState(false);
            callback(false);
          }}
        >
          <span className="rounded-full border w-6 h-6 border-grey shadow-inner bg-white shadow">
          </span>
        </span>
      }
    </>
  );
}

//---------------------------------
// Exports
//---------------------------------
export default Toogle;
