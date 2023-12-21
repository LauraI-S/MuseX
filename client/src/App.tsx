import React, { useContext, useEffect, useState } from "react";
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
import MyNavbar from "./components/MyNavbar";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/AuthContext";
import AuthContextProvider from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <Router>
        <MyNavbar />
        <h1>Muse-X</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<DetailsCard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<Profile key={user ? user.id : "no-user"} />}
          />
          {/* <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          /> */}
          //TODO - Add more protected routes such as ...whatever?
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

// //ANCHOR start creating AuthContext!
// const [user, setUser] = useState(false);

// //the two functions below, they probably belong better to another file (utilities, context...etc..)
// const getToken = () => {
//   const token = localStorage.getItem("token");
//   return token;
// };
// const isUserLoggedIn = () => {
//   const token = getToken();

//   return token ? true : false;
// };

// const handleLogout = () => {
//   logout();
//   Navigate("/");
// };
// const logout = () => {
//   localStorage.removeItem("token");
//   setUser(false);
// };
// useEffect(() => {
//   const isUserLogged = isUserLoggedIn();
//   if (isUserLogged) {
//     console.log("%c user is logged in", "color:green");
//     setUser(true);
//   } else {
//     console.log("%c user is NOT logged in", "color:red");
//     setUser(false);
//   }
// }, [user]);
