import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { AuthContext } from "../context/AuthContext";
import "../styles/MyNavbar.css";

const MyNavbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Logo" height="50" />
      </Link>

      <div className="nav-menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/details">Details</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>
          {/* Add more nav items here */}
        </ul>

        <div className="nav-user">
          {user ? (
            <>
              <div className="user-info">
                <span className="user-name">Welcome, {user.name}</span>
                {user.profilePicture && ( // Check if the profilePicture exists
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="profile-image"
                  />
                )}
              </div>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
