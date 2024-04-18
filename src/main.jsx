import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";
import FirebaseProvider from "./Firebase/Firebase.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </ChakraProvider>
);
