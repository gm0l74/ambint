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
import firebase from './firebase';

const firestore = firebase.firestore();

//---------------------------------
// Exports
//---------------------------------
export function updateUser(uid, data) {
  return firestore.collection('users').doc(uid).update(data);
}

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
