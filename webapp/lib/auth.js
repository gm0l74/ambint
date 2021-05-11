//---------------------------------
// AmbInt - Admin
// File : auth.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         11 05 2021
//---------------------------------

//---------------------------------
// Imports
//---------------------------------
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

import firebase from './firebase';
import { createUser } from './db';

//---------------------------------
// Utilities
//---------------------------------
const formatAuth = (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  rooms: user.rooms || null
});

//---------------------------------
// Contexts
//---------------------------------
export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

//---------------------------------
// AuthProvider
//---------------------------------
export function AuthProvider({ children }) {
  const [ isLogged, setIsLogged ] = useState(false);
  const [ userData, setUserData ] = useState(undefined);

  const router = useRouter();

  useEffect(() => {
    const unlisten = firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUserData(null);
        setIsLogged(false);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const formattedAuth = formatAuth(user);
        const token = await user.getIdToken();

        setUserData(formattedAuth);
        setIsLogged(true);
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });

    return () => { unlisten(); };
  }, []);

  const signInWithEmailAndPassword = useCallback(async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      // Firestore database update
      const user = formatAuth(response.user);
      createUser(user.uid, user);

      router.replace(`/app/organization/${user.uid}`);
    });
  });

  const signOut = useCallback(async () => {
    return firebase.auth().signOut()
    .then(() => {
      router.replace('/');
    });
  });

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        userData,
        signInWithEmailAndPassword,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 'test@test.com', 'AdminTesting1!'
