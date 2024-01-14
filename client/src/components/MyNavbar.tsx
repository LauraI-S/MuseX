import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { AuthContext } from "../context/AuthContext";
import "../styles/MyNavbar.css";

const MyNavbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login"); // Navigate to the login page after successful logout
  };

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
            <Link to="/post">Post</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>

      <div className={`nav-user ${user ? "logged-in" : ""}`}>
        {user ? (
          <>
            <div className="user-info">
              <span className="user-name">Welcome, {user.name}!</span>
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name}
                  className="profile-image"
                />
              )}
            </div>
            <button onClick={handleLogoutClick} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="auth-links">
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default MyNavbar;
