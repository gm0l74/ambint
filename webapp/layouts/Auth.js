//---------------------------------
// AmbInt - Admin
// File : Auth.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         08 05 2021
//---------------------------------

//---------------------------------
// Layout Auth
//---------------------------------
const Auth = ({ children }) => {
  return (
    <main>
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-200">
        <div className="content text-3xl text-center">
          <h1 className="text-7xl text-green-600 font-bold">
            Mesa Livre Manager
          </h1>
          <p className="m-3">
            Manage study places
          </p>
        </div>
        <div className="container mx-auto flex flex-col items-center">
          {children}
        </div>
      </div>
    </main>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default Auth;
