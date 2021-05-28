//---------------------------------
// AmbInt - Admin
// File : Button.js
//
// @ version             1.0
//
// @ start date          07 05 2021
// @ last update         20 05 2021
//---------------------------------

//---------------------------------
// component Button
//---------------------------------
const Button = ({ icon, title, callback }) => {
  return (
    <button
      className='w-full m-4 p-9 bg-white rounded-lg shadow-lg tracking-wide uppercase border cursor-pointer'
      onClick={callback}
    >
      <i className={`fas fa-${icon} text-5xl`}></i>
      <p className='text-center text-lg mt-8'>
        {title}
      </p>
    </button>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default Button;
