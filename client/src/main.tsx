import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./context/AuthContext.js";
import { RequestsContextProvider } from "./context/RequestContext.js";
import MyNavbar from "./components/MyNavbar.tsx";
import { BrowserRouter, Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RequestsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RequestsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
