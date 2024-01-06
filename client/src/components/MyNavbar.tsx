import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { AuthContext } from "../context/AuthContext";
import "../styles/MyNavbar.css";

const MyNavbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Logo" height="200" />
      </Link>

      <button
        className="nav-toggle"
        aria-label="toggle navigation"
        onClick={() => setIsNavExpanded(!isNavExpanded)}
      >
        <span className="hamburger"></span>
      </button>

      <div className={isNavExpanded ? "nav-menu expanded" : "nav-menu"}>
        <ul>
          <li>
            <Link to="/" onClick={() => setIsNavExpanded(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/details" onClick={() => setIsNavExpanded(false)}>
              Details
            </Link>
          </li>
          <li>
            <Link to="/post" onClick={() => setIsNavExpanded(false)}>
              Post
            </Link>
          </li>
          {/* Add more nav items here */}
        </ul>

        <div className="nav-user">
          {user ? (
            <>
              Welcome, {user.name}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <ul>
                <li>
                  <Link to="/login" onClick={() => setIsNavExpanded(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={() => setIsNavExpanded(false)}>
                    Signup
                  </Link>
                </li>
                <li>
                  <Link to="/profile" onClick={() => setIsNavExpanded(false)}>
                    Profile
                  </Link>
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
