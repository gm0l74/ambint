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
import React, { useState } from "react";

import { useAuth } from "../lib/auth";

import LoginTemplate from "../templates/Login";
import RegisterTemplate from "../templates/Register";

import Auth from "../layouts/Auth";

//---------------------------------
// Page Index
//---------------------------------
function Index() {
  const { isLogged } = useAuth();
  const [ state, setState ] = useState("login");

  return (
    <>
      {
        isLogged &&
        <div className="w-full h-full fixed z-50 top-0 left-0 items-center flex bg-gray-200">
          <span className="text-green-600 mx-auto block relative">
            <i className="fas fa-circle-notch fa-spin fa-10x"></i>
          </span>
        </div>
      }
      {
        (state === "login") &&
        <LoginTemplate change={() => setState("register")} />
      }
      {
        (state !== "login") &&
        <RegisterTemplate change={() => setState("login")}/>
      }
    </>
  )
};

Index.layout = Auth;

//---------------------------------
// Exports
//---------------------------------
export default Index;
