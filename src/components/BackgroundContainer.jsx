import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

const BackgroundContainer = () => {
  return (
    <div className="relative flex justify-center">
      <button
        className="fixed top-2 sm:top-4 text-xs font-bold text-gray-200 px-1 sm:text-lg right-2 sm:right-3 bg-pink-600 rounded-md"
        type="button"
        onClick={() => {
          console.log("SignOut Done");
          signOut(auth);
        }}
      >
        Sign Out
      </button>
      <section className="bg-brown-redish1 bg-cover bg-no-repeat fixed top-1 sm:top-4 rounded-md w-[98%] mx-auto h-36 sm:h-60 -z-10"></section>
    </div>
  );
};

export default BackgroundContainer;
