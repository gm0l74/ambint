//---------------------------------
// AmbInt - Admin
// File : Auth.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         20 05 2021
//---------------------------------

//---------------------------------
// Layout Auth
//---------------------------------
const Auth = ({ children }) => {
  return (
    <main>
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-200">
        <img
          style={{ width: "490px", height: "auto" }}
          src="/icon.png"
        />
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
