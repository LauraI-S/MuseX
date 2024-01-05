import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./context/AuthContext.js";
import { RequestsContextProvider } from "./context/RequestContext.tsx";
import MyNavbar from "./components/MyNavbar.tsx";
import { BrowserRouter, Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  //   <AuthContextProvider>
  //     <MyNavbar />
  //     <RequestsContextProvider>
  //       <App />
  //     </RequestsContextProvider>provider-route??
  //   </AuthContextProvider>
  // </React.StrictMode>
  // <React.StrictMode>
  //   <AuthContextProvider>
  //     <RequestsContextProvider>
  //       <MyNavbar />
  //       <App />
  //     </RequestsContextProvider>
  //   </AuthContextProvider>
  // </React.StrictMode>
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
