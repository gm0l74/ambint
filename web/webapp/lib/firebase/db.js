//---------------------------------
// AmbInt - Admin
// File : db.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         20 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import firebase from './firebase';

export const firestore = firebase.firestore();

//---------------------------------
// Exports
//---------------------------------
// USED BY /api/index.js
export function search(collection, filters) {
  let query = firestore.collection(collection);

  for (let [key, value] of Object.entries(filters)) {
    if (['true', 'false'].includes(value)) {
      // Boolean adjustment
      value = (value === 'true');
    }

    query = query.where(key, '==', value);
  }

  return query.get()
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

export async function count_seats(key, value) {
  let occupied = 0, total = 0;

  await firestore.collection('seats')
  .where(key, '==', value)
  .get()
  .then((doc) => {
    doc.forEach((user) => {
      const data = user.data();
      if (data.state) {
        occupied += 1;
      }
      total += 1;
    });

    return true;
  })
  .catch((error) => {
    return error;
  });

  return [occupied, total];
}

// USED BY /api/toogle.js
export function toogle(uid, state) {
  return firestore.collection('seats')
  .doc(uid)
  .get()
  .then((doc) => {
    if (doc.exists) {
      doc.ref.update({
        // state: !doc.data().state
        state: state
      });

      return true;
    } else {
      throw new Error('Seat not found');
    }
  })
  .catch((error) => {
    return null;
  });
}

// USED throughout the app
export async function create(collection, data, uid = null) {
  let ref = firestore.collection(collection);
  ref = (!uid) ? ref.doc() : ref.doc(uid);

  await ref.set({ ...data }, { merge: true });

  return ref.get()
  .then((doc) => {
    if (doc.exists) {
      doc.ref.update({
        uid: doc.id
      });

      return true;
    } else {
      throw new Error('Document not found');
    }
  })
  .catch((error) => {
    return null;
  });
}

export function update(collection, data, uid) {
  return firestore.collection(collection)
  .doc(uid)
  .update(data);
}
