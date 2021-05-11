//---------------------------------
// AmbInt - Admin
// File : [fid].js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         11 05 2021
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

export function fetchCollection(collection = 'users') {
  return firestore.collection(collection)
    .get()
    .then((data) => {
      let result = [];
      data.forEach((user) => {
        result.push(user.data());
      });

      return result;
    })
    .catch((error) => {
      return error;
    });
}

export function fetchData(uid, collection = 'users') {
  return firestore.collection(collection).doc(uid)
    .get()
    .then((doc) => {
      return (doc.exists) ? doc.data() : null;
    })
    .catch((error) => {
      return null;
    });
}

export function update(uid, data, collection = 'users') {
  return firestore.collection(collection).doc(uid)
    .set(data)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}
