//---------------------------------
// AmbInt - Admin
// File : index.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         11 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React, { useState } from 'react';

// Services
import { useAuth } from 'lib/firebase/auth';

// Authentication templates
import { AUTH_TABS } from 'templates/auth/auth.tabs';

import T_Login from 'templates/auth/T_Login';
import T_Register from 'templates/auth/T_Register';

// Layouts
import Auth from 'layouts/Auth';

//---------------------------------
// Page Index
//---------------------------------
function Index() {
  // Authentication manager
  const { isLogged } = useAuth();

  // State managers
  const [ state, setState ] = useState(AUTH_TABS.LOGIN);

  // Authentication screen renderer
  const AuthenticationRenderer = (screen) => {
    switch (screen) {
      case AUTH_TABS.LOGIN:
        return <T_Login changeTab={setState} />;

      case AUTH_TABS.REGISTER:
        return <T_Register changeTab={setState} />;

      default:
        throw new Error(`No rendered for auth state ${screen}`);
    };
  };

  // JSX
  return (
    <>
      {
        isLogged &&
        <div
          className='w-full h-full fixed z-50 top-0 left-0 \
          items-center flex bg-gray-200'
        >
          <span className='text-green-600 mx-auto block relative'>
            <i className='fas fa-circle-notch fa-spin fa-10x'></i>
          </span>
        </div>
      }
      { AuthenticationRenderer(state) }
    </>
  );
};

Index.layout = Auth;

//---------------------------------
// Exports
//---------------------------------
export default Index;
