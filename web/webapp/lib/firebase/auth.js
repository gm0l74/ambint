//---------------------------------
// AmbInt - Admin
// File : auth.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         28 05 2021
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
import nookies from 'nookies';

import { useRouter } from 'next/router';

// Authentication services
import firebase from './firebase';
import { create } from './db';

//---------------------------------
// Formats
//---------------------------------
const UserDataFormat = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName
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
  const [ userDetails, setUserDetails ] = useState(undefined);

  const router = useRouter();

  useEffect(() => {
    const unlisten = firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        // Update state managers
        setUserDetails(null);
        setIsLogged(false);

        // Set cookie
        nookies.set(undefined, 'token', '', { path: '/' });

        // Modify url
        if (router.pathname.includes('/app')) {
          router.replace('/');
        }
      } else {
        const details = UserDataFormat(user);
        const token = await user.getIdToken();

        // Update state managers
        setUserDetails(details);
        setIsLogged(true);

        // Set cookie
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });

    return () => { unlisten(); };
  }, []);

  // Authentication Functions
  const signInWithEmailAndPassword = useCallback(
    async (email, password) => {
      return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        return null;
      })
      .catch((err) => {
        return err;
      });
    }
  );

  const signUpWithEmailAndPassword = useCallback(
    async (email, username, password) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        // Insert username
        response.user.updateProfile({
          displayName: username
        });

        // Database update
        const details = UserDataFormat(response.user);

        // Account for delayed update
        details.displayName = username;

        create('users', { ...details, type: 'user' }, response.user.uid);
        return null;
      })
      .catch((err) => {
        return err;
      });
    }
  );

  const sendPasswordResetEmail = useCallback(
    async (email) => {
      return firebase.auth().sendPasswordResetEmail(email);
    }
  );

  const signOut = useCallback(
    async () => {
      return firebase.auth().signOut();
    }
  );

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        userDetails,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword,
        sendPasswordResetEmail,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
