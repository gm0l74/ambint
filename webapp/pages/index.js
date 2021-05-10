//---------------------------------
// AmbInt - Admin
// File : index.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         09 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../lib/auth';
import LoginTemplate from '../templates/Login';
import Auth from '../layouts/Auth';

//---------------------------------
// Page Index
//---------------------------------
function Index() {
  const { isLogged } = useAuth();
  const router = useRouter();

  if (isLogged) {
    router.push({
      pathname: '/app/organization/[id]',
      query: { id: '1' }
    });
  }

  return (
    <>
      {
        !isLogged ? <LoginTemplate /> :
        <div className='w-full h-full fixed z-50 top-0 left-0 items-center flex bg-gray-200'>
          <span className='text-green-600 mx-auto block relative'>
            <i className='fas fa-circle-notch fa-spin fa-10x'></i>
          </span>
        </div>
      }
    </>
  )
};

Index.layout = Auth;


//---------------------------------
// Exports
//---------------------------------
export default Index;
