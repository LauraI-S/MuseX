import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "../src/styles/index.css";
import "bootstrap/dist/css/bootstrap.css";
import Home from "../src/pages/Home";
import SignUp from "../src/pages/SignUp";
import Login from "./pages/Login";
import DetailsCard from "./pages/DetailsCard";
import MyNavbar from "./components/MyNavbar";
import Profile from "./pages/Profile";
import PostRequirements from "./pages/PostRequirements";
import { AuthContext } from "./context/AuthContext";
import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      {/* <Router> */}
      <MyNavbar />
      <h1>Muse-X find YOUR Musician</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostRequirements />} />
        <Route path="/details" element={<DetailsCard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={<Profile key={user ? user.id : "no-user"} />}
        />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
