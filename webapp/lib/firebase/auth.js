//---------------------------------
// AmbInt - Admin
// File : auth.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         15 05 2021
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
import { createUser } from './db';

//---------------------------------
// Formats
//---------------------------------
const UserDataFormat = (user) => ({
  uid: user.uid | null,
  email: user.email | null,
  name: user.displayName | null
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
        router.replace('/');
      } else {
        const details = UserDataFormat(user);
        const token = await user.getIdToken();

        // Update state managers
        setUserDetails(details);
        setIsLogged(true);

        // Set cookie
        nookies.set(undefined, 'token', token, { path: '/' });

        // Modify url
        router.replace(`/app/organization/${details.uid}`);
      }
    });

    return () => { unlisten(); };
  }, []);

  // Authentication Functions
  const signInWithEmailAndPassword = useCallback(
    async (email, password) => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
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

        createUser(details.uid, details);
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
