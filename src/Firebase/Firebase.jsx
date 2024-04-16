// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { createContext, useContext } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-time-todo-20643.firebaseapp.com",
  databaseURL: "https://real-time-todo-20643-default-rtdb.firebaseio.com",
  projectId: "real-time-todo-20643",
  storageBucket: "real-time-todo-20643.appspot.com",
  messagingSenderId: "300774970689",
  appId: "1:300774970689:web:1d541d6fab99c02a6a3dc0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();
// googleAuthProvider.addScope(
//   "https://www.googleapis.com/auth/contacts.readonly"
// );

const FirbaseContext = createContext(null);
export const useFirebase = () => useContext(FirbaseContext);

export const signUpUserWithEmailAndPassword = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((UserCredential) => {
      console.log("Signed Up");
      console.log(UserCredential);
    })
    .catch((err) => {
      console.log("Error");
      console.log(err);
    });
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((UserCredential) => {
      console.log("Signed In");
      console.log(UserCredential);
    })
    .catch((reason) => {
      console.log(reason);
    });
};

export function signInWithGoogle() {
  signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      console.log(result.user);
      console.log(getAdditionalUserInfo(result));
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
export default function FirebaseProvider(props) {
  return (
    <FirbaseContext.Provider
      value={{ signUpUserWithEmailAndPassword, signInUserWithEmailAndPassword }}
    >
      {props.children}
    </FirbaseContext.Provider>
  );
}