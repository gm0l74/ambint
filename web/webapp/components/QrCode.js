//---------------------------------
// AmbInt - Admin
// File : QrCode.js
//
// @ version             1.0
//
// @ start date          07 05 2021
// @ last update         07 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import QRCode from 'react-qr-code';

//---------------------------------
// component QrCode
//---------------------------------
const QrCode = ({ data }) => {
  return <QRCode value={data} />;
};

//---------------------------------
// Exports
//---------------------------------
export default QrCode;
