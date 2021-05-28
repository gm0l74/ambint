//---------------------------------
// AmbInt - Admin
// File : PageChange.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         16 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React from 'react';

//---------------------------------
// component PageChange
//---------------------------------
const PageChange = (props) => {
  return (
    <div>
      <div className='my-32 mx-auto max-w-sm text-center relative z-50 top-0'>
        <div className='block mb-4'>
          <i className='fas fa-circle-notch animate-spin text-white mx-auto text-6xl'></i>
        </div>
        <h4 className='text-lg font-medium text-white'>
          Loading {props.path}
        </h4>
      </div>
    </div>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default PageChange;
