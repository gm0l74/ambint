//---------------------------------
// AmbInt - Admin
// File : auth.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         09 05 2021
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
import { createUser } from './db'; // TODO

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

  // useEffect(() => {
  //   const unlisten = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setUserData({
  //         name: user.email
  //       });
  //
  //       setIsLogged(true);
  //     } else {
  //       setUserData(null);
  //       setIsLogged(false);
  //     }
  //   });
  //
  //   return () => { unlisten(); };
  // }, []);

  useEffect(() => {
    const unlisten = firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUserData(null);
        setIsLogged(false);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        setUserData(user);
        setIsLogged(true);
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });

    return () => { unlisten(); };
  }, []);

  const signInWithEmailAndPassword = useCallback(async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      // TODO chane 1 with the user specific organization id
      router.replace('/app/organization/1');
    });
  });

  const signOut = useCallback(async () => {
    return firebase.auth().signOut()
    .then(() => {
      // window.location.href = '/auth/login';
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

// function useProvideAuth() {
//   const [auth, setAuth] = useState(null);
//   const [loading, setLoading] = useState(true);
//
//   /**
//    * Callback function used for firebase.auth.onAuthStateChanged().
//    * Takes the user object returned and formats it for my state.
//    * We fetch the idToken and append it to my auth state and store it.
//    */
//   const handleAuthChange = async (authState) => {
//     if (!authState) {
//       return;
//     }
//
//     // Formats response into my required state.
//     const formattedAuth = formatAuthState(authState);
//     // Fetch firebase auth ID Token.
//     formattedAuth.token = await authState.getIdToken();
//     // Stores auth into state.
//     setAuth(formattedAuth);
//     // Sets loading state to false.
//     setLoading(false);
//   };
//
//   /**
//    * Callback function used for response from firebase OAuth.
//    * Store user object returned in firestore.
//    * @param firebase User Credential
//    */
//   const signedIn = async (response) => {
//     if (!response.user) {
//       return false;
//     }
//
//     // Format user into my required state.
//     const authedUser = formatAuthState(response.user);
//     // firestore database function
//     createUser(authedUser.uid, authedUser);
//
//     return true;
//   };
//
//   /**
//    * Callback for when firebase signOut.
//    * Sets auth state to null and loading to true.
//    */
//   const clear = () => {
//     setAuth(null);
//     setLoading(true);
//   };
//
//   /**
//    * Triggers firebase Oauth for twitter and calls signIn when successful.
//    * sets loading to true.
//    */
//   const signInWithEmailAndPassword = (email, password) => {
//     setLoading(true);
//     return firebase.auth()
//     .signInWithEmailAndPassword(email, password)
//     .then(signedIn)
//     .catch((err) => false);
//   };
//
//   const signUpWithEmailAndPassword = (email, username, password) => {
//     setLoading(true);
//     return firebase.auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then(signedIn)
//     .catch((err) => false);
//   }
//
//   /**
//    * Calls firebase signOut and with clear callback to reset state.
//    */
//   const signOut = () => {
//     return firebase.auth().signOut().then(clear);
//   };
//
//   /**
//    * Watches for state change for firebase auth and calls the handleAuthChange callback
//    * on every change.
//    */
//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged(handleAuthChange);
//     return () => unsubscribe();
//   }, []);
//
//   // returns state values and callbacks for signIn and signOut.
//   return {
//     auth,
//     loading,
//     signInWithEmailAndPassword,
//     signOut
//   };
// }
//
// export function AuthProvider({ children }) {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }
//
// export const useAuth = () => useContext(authContext);

// 'test@test.com', 'AdminTesting1!'
