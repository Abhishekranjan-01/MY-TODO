import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  sendSignInLinkToEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { createContext, useContext, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-time-todo-20643.firebaseapp.com",
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: "real-time-todo-20643",
  storageBucket: "real-time-todo-20643.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APPID,
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
export let userEmail = null;
export const setUserEmail = (email) => {
  userEmail = email;
  console.log(userEmail);
};
export const signUpUserWithEmailAndPassword = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((UserCredential) => {
      console.log("Signed Up");
      console.log(UserCredential);
    })
    .catch((err) => {
      console.log("Create Account Error");
      console.log(err);
      alert(err);
    });
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((UserCredential) => {
      // console.log("Signed In UserCredential");
      // console.log(UserCredential);
    })
    .catch((reason) => {
      console.log(reason.message);
      console.dir(reason);
      alert(reason);
    });
};

export function signInWithGoogle() {
  signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      // console.log(result.user);
      // console.log(getAdditionalUserInfo(result));
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export async function addTodoOnFirebase(email, todo) {
  set(ref(database, `users/${email}`), todo);
}

export async function getTodoFromFirebase(email, dispatchTodoList) {
  const dbRef = ref(database);

  get(child(dbRef, `users/${email}`))
    .then(async (snapshot) => {
      console.log("Email In Get:\t", email);
      if (snapshot.exists()) {
        const todoOnFirebase = await snapshot.val();
        dispatchTodoList({
          name: "LOAD_PREVIOUS_TODO_LIST",
          payload: todoOnFirebase,
        });
      } else {
        console.log("Data Not Exist !!");
        // console.log(userEmail);
      }
    })
    .catch((error) => {
      console.dir(error);
      alert(error);
    });
}
// console.log("Auth.currentUser:\t", auth.currentUser);
export function sendPasswordResetLinkOnMail(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert(" Password reset email sent!");
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
}
export default function FirebaseProvider(props) {
  return (
    <FirbaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        sendPasswordResetLinkOnMail,
        setUserEmail,
        userEmail,
      }}
    >
      {props.children}
    </FirbaseContext.Provider>
  );
}
