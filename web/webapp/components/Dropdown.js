//---------------------------------
// AmbInt - Admin
// File : List.js
//
// @ version             1.0
//
// @ start date          20 05 2021
// @ last update         28 05 2021
//---------------------------------

//---------------------------------
// Documentation
//---------------------------------
// Inspired by:
// https://tailwindcomponents.com/component/dropdown-1

//---------------------------------
// Imports
//---------------------------------
import React, { useState } from "react";

//---------------------------------
// component Dropdown
//---------------------------------
const Dropdown = ({
  options = [],
  option = null,
  callback = () => {}
}) => {
  const [ selected, setSelected ] = useState(option);

  return (
    <div className="relative inline-flex">
      <svg
        className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 412 232"
      >
        <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/>
      </svg>
      <select
        className="border border-gray-300 rounded-lg text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
        onChange={(opt) => {
          setSelected(opt.target.value);
          callback(opt.target.value);
        }}
      >
        <option>Select an option</option>
        {
          options.map((item, i) => {
            const name = item.displayName || item;
            const uid = item.uid || item;

            return <option key={i} value={uid}>{name}</option>;
          })
        }
      </select>
    </div>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default Dropdown;
