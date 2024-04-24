import Footer from "./components/Footer/Footer";
import SignUp from "./components/Signup/SignUp";
import { auth, setUserEmail } from "./Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { lazy, Suspense } from "react";

import { Progress } from "@chakra-ui/react";

const Application = lazy(() => import("./components/Application/Application"));
const SignIn = lazy(() => import("./components/SignIn/SignIn"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [createAccount, setCreateAccount] = useState(true);
  const [inProgress, setInProgress] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("Auth State Change");
      if (user) {
        setUserEmail(user.email.replaceAll(".", "_"));
        setIsLoggedIn(true);
        setInProgress(false);
      } else {
        setIsLoggedIn(false);
        setInProgress(false);
      }
    });
    return () => setInProgress(true);
  }, []);

  return inProgress ? (
    <Progress size="md" isIndeterminate />
  ) : isLoggedIn ? (
    <main className="min-h-screen flex flex-col justify-between ">
      <Suspense fallback={<Progress size="md" isIndeterminate />}>
        <Application />
      </Suspense>

      <Footer />
    </main>
  ) : createAccount ? (
    <main className="h-screen flex flex-col gap-4 sm:gap-8 py-8">
      <SignUp setCreateAccount={setCreateAccount} />
      <Footer />
    </main>
  ) : (
    <Suspense fallback={<Progress size="md" isIndeterminate />}>
      <main className="h-screen flex flex-col gap-4 sm:gap-8 py-8">
        <SignIn setCreateAccount={setCreateAccount} />
        <Footer />
      </main>
    </Suspense>
  );
}

export default App;
