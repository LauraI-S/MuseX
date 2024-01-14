import React, { ChangeEvent, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/SignUp.css";
import { AuthContext } from "../context/AuthContext";

export interface User {
  name: string;
  email: string;
  password: string;
  image: string;
}

function SignUp() {
  const { user, signup } = useContext(AuthContext);
  const [newUser, setNewUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignupInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(newUser.email, newUser.name, newUser.password);
      window.alert("You've joined the band! 🎸🤘");
    } catch (error) {
      console.log("Registration failed. Please try again.", error);
      window.alert("Oops, registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <br />
      <div className="registration-container form-container">
        <h1 className="text-center">Join the Gang</h1>
        <form onSubmit={(e) => handleSignUp(e)}>
          <p className="text-center">
            Fill in your rockstar details to join the MUSE-X- community:
          </p>
          <div className="form-group">
            <label htmlFor="name">Rockstar Name:</label>
            <input
              type="text"
              name="name"
              onChange={handleSignupInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Band Email:</label>
            <input
              type="text"
              placeholder="Enter band email..."
              name="email"
              onChange={handleSignupInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Band Password:</label>
            <input
              type={showPassword ? "hide" : "password"}
              placeholder="Enter band password..."
              name="password"
              onChange={handleSignupInputChange}
              className="form-control"
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide Password" : "Show Password"}
            </div>
            <p className="password-tip">
              Password Tip: 8+ characters, mix in lowercase, uppercase, numbers,
              and a special symbol for a groovy and secure tune! 🎶🔒🤘
            </p>
          </div>
          <Button type="submit" className="btn-primary btn-block">
            Join the Band
          </Button>
        </form>
      </div>
      <p className="text-center">
        Already part of the band?{" "}
        <a className="resetButton" href="login">
          Log in!
        </a>
      </p>
    </div>
  );
}

export default SignUp;
