//---------------------------------
// AmbInt - Admin
// File : App.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         28 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import FooterApp from "components/AppFooter.js";

//---------------------------------
// Layout App
//---------------------------------
const App = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full">
        {children}
      </div>
      <FooterApp />
    </div>
  );
}

//---------------------------------
// Exports
//---------------------------------
export default App;
