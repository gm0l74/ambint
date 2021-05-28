//---------------------------------
// AmbInt - Admin
// File : firebase.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         20 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

//---------------------------------
// Config
//---------------------------------
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY.replace(/\\n/g, '\n'),
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN.replace(/\\n/g, '\n'),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID.replace(/\\n/g, '\n')
  });
}

//---------------------------------
// Exports
//---------------------------------
export default firebase;
