import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import VideoBG from "../images-videos/VideoBG.mp4";
import "../images-videos/VideoBG.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Home.css";

//!Subscribe Home to the Context!
function Home() {
  const { user, displayUser } = useContext(AuthContext);
  return (
    <>
      <div className="content">
        <h2 className="header">
          Hey {displayUser || (user && user.email)}! <br></br>Ready to enjoy a
          gluten-free meal with our exclusive recipes?
          <span>
            <br></br>
            <Link to="/login">
              <Button variant="light" className="login-button">
                Login
              </Button>
            </Link>
            or
            <Link to="/register">
              <Button variant="light" className="register-button">
                Sign Up
              </Button>
            </Link>
            to explore our delicious collection!
          </span>
        </h2>
      </div>
    
    </>
  );
}

export default Home;
