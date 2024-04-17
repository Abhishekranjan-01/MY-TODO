import BackgroundContainer from "./components/BackgroundContainer";
import AppContainer from "./components/AppContainerItems/AppContainer";
import Footer from "./components/Footer";
import SignUp from "./components/Signup/SignUp";
import { auth, setUserEmail, useFirebase } from "./Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import SignIn from "./SignIn/SignIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [createAccount, setCreateAccount] = useState(true);
  const firebase = useFirebase();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("Auth State Change");
      if (user) {
        console.log(user.email.replaceAll(".", "_"));
        // firebase.setUserEmail(user.email.replaceAll(".", "_"));
        setUserEmail(user.email.replaceAll(".", "_"));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return isLoggedIn ? (
    <main className="min-h-screen flex flex-col justify-between ">
      <section>
        <BackgroundContainer />
        <AppContainer />
      </section>

      <Footer />
    </main>
  ) : createAccount ? (
    <SignUp setCreateAccount={setCreateAccount} />
  ) : (
    <SignIn setCreateAccount={setCreateAccount} />
  );
}

export default App;
