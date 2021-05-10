//---------------------------------
// AmbInt - Admin
// File : AppNavbar.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         08 05 2021
//---------------------------------

//---------------------------------
// component AppNavbar
//---------------------------------
const AppNavbar = () => {
  return (
    <nav className="w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
      <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
        <p className="text-6xl text-green-600 uppercase font-semibold">
          Mesa Livre Manager
        </p>
      </div>
    </nav>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default AppNavbar;
