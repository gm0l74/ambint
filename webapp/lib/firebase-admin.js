//---------------------------------
// AmbInt - Admin
// File : [fid].js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         07 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import admin from 'firebase-admin';

//---------------------------------
// Config
//---------------------------------
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
    })
  });
}

const db = admin.firestore();
const auth = admin.auth();

//---------------------------------
// Exports
//---------------------------------
export { db, auth };
