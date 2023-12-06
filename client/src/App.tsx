import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "../src/pages/Home";
import SignUp from "../src/pages/SignUp";
import Login from "./pages/Login";
import DetailsCard from "./pages/DetailsCard";
import { Button } from "react-bootstrap";
import MyNavbar from "./components/MyNavbar";
import Profile from "./pages/Profile";

function App() {
  //ANCHOR start creating AuthContext!
  const [user, setUser] = useState(false);

  //the two functions below, they probably belong better to another file (utilities, context...etc..)
  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };
  const isUserLoggedIn = () => {
    const token = getToken();

    return token ? true : false;
  };

  // const handleLogout = () => {
  //     logout();
  //     Navigate("/")
  // };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
  };
  useEffect(() => {
    const isUserLogged = isUserLoggedIn();
    if (isUserLogged) {
      console.log("%c user is logged in", "color:green");
      setUser(true);
    } else {
      console.log("%c user is NOT logged in", "color:red");
      setUser(false);
    }
  }, [user]);

  return (
    <>
      <Router>
        <MyNavbar user={user} logout={logout} />
        <h1>muse-X</h1>

        <Button variant="secondary" onClick={logout}>
          logout
        </Button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<DetailsCard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login logout={logout} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
