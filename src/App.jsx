import BackgroundContainer from "./components/BackgroundContainer";
import AppContainer from "./components/AppContainerItems/AppContainer";
import Footer from "./components/Footer";
import SignUp from "./components/Signup/SignUp";
import { auth } from "./Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  });

  return isLoggedIn ? (
    <>
      <BackgroundContainer />
      <AppContainer />
      <Footer />
    </>
  ) : (
    <SignUp />
  );
}

export default App;
