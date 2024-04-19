import BackgroundContainer from "./components/AppContainerItems/BackgroundContainer";
import AppContainer from "./components/AppContainerItems/AppContainer";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/Signup/SignUp";
import { auth, setUserEmail } from "./Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import SignIn from "./components/SignIn/SignIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [createAccount, setCreateAccount] = useState(true);

  useEffect(() => {
    console.log("USE EFFECT APP,CU:\t", auth.currentUser);
    onAuthStateChanged(auth, (user) => {
      console.log("Auth State Change");
      if (user) {
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
    <main className="h-screen flex flex-col gap-4 sm:gap-8 py-8">
      <SignUp setCreateAccount={setCreateAccount} />
      <Footer />
    </main>
  ) : (
    <main className="h-screen flex flex-col gap-4 sm:gap-8 py-8">
      <SignIn setCreateAccount={setCreateAccount} />
      <Footer />
    </main>
  );
}

export default App;
