import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "../src/styles/index.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MusicianDetails from "./pages/MusicianDetails";
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
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostRequirements />} />
        <Route path="/musicians/:_id" element={<MusicianDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
