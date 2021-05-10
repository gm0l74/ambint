//---------------------------------
// AmbInt - Admin
// File : AppFooter.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         08 05 2021
//---------------------------------

//---------------------------------
// component AppFooter
//---------------------------------
const AppFooter = () => {
  return (
    <div className="container mx-auto px-4">
      <hr className="mb-4 border-b-1 border-blueGray-200" />
      <div className="flex flex-wrap items-center justify-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
          Copyright © 2021 Mesa Livre
        </div>
      </div>
    </div>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default AppFooter;
