// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { createContext, useContext, useState } from "react";
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
      console.log("Error");
      console.log(err);
    });
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((UserCredential) => {
      console.log("Signed In UserCredential");
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
        console.log(todoOnFirebase);
        // return await snapshot.val();
      } else {
        console.log("Data Not Exist !!");
        console.log(userEmail);
        // return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
export default function FirebaseProvider(props) {
  // const [userEmail, setUserEmail] = useState("");
  return (
    <FirbaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        setUserEmail,
        userEmail,
      }}
    >
      {props.children}
    </FirbaseContext.Provider>
  );
}
