import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Home from '../src/pages/Home';
import SignUp from '../src/pages/SignUp';
import Login from './pages/Login';
import DetailsCard from './pages/DetailsCard';
import { Button } from 'react-bootstrap';

function App() {
  //ANCHOR start creating AuthContext!
  const [user, setUser] = useState("")

    //the two functions below, they probably belong better to another file (utilities, context...etc..)
  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };
    const isUserLoggedIn = () => {
    const token = getToken();

    return token ? true : false;
  };
  const logout= () => {
    localStorage.removeItem("token");
    setUser(false)
  }
   useEffect(() => {
    const isUserLogged = isUserLoggedIn();
    if (isUserLogged) {
      console.log("%c user is logged in", "color:green");
    } else {
      console.log("%c user is NOT logged in", "color:red");
    }
  }, [user]);
  return (
    <>
    <h1>Muse-X
      </h1>
      <Button onClick={logout}>logout</Button>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<DetailsCard/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      </Router>
      </>
  );
}

export default App;
