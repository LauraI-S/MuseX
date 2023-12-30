import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./context/AuthContext.js";
import { RequestsContextProvider } from "./context/RequestContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RequestsContextProvider>
        <App />
      </RequestsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
