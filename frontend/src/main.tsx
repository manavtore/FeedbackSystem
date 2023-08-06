import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
