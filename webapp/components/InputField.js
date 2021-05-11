//---------------------------------
// AmbInt - Admin
// File : InputField.js
//
// @ version             1.0
//
// @ start date          07 05 2021
// @ last update         11 05 2021
//---------------------------------

//---------------------------------
// component InputField
//---------------------------------
const InputField = ({ data }) => {
  return (
    <div className="flex">
      <span className="text-sm border border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">Label:</span>
      <input name="field_name" className="border border-2 rounded-r px-4 py-2 w-full" type="text" placeholder="Write something here..." />
    </div>
  );
};

//---------------------------------
// Exports
//---------------------------------
export default InputField;
