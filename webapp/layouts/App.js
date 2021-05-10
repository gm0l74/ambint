//---------------------------------
// AmbInt - Admin
// File : App.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         08 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import React from "react";

import AppNavbar from "components/AppNavbar.js";
import FooterApp from "components/AppFooter.js";

//---------------------------------
// Layout App
//---------------------------------
const App = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4">
        <AppNavbar />
      </header>
      <main className="p-4 flex-grow">
        {children}
      </main>
      <footer className="p-4">
        <FooterApp />
      </footer>
    </div>
  );
}

//---------------------------------
// Exports
//---------------------------------
export default App;
