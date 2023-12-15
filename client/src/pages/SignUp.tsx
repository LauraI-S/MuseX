import React, { ChangeEvent, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/SignUp.css"; // Import a CSS file for custom styling
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
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleSignupInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //!the following line basically combines the new user-information with existing information
    //!...:spread-operator keeps track of the previously stored information
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    // console.log("e.target.name :>> ", e.target.name);
    // console.log("e.target.value :>> ", e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //!preventing new page-refresh by default, console-logging my new user
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(newUser.email, newUser.name, newUser.password);
      window.alert("You have successfully registered!");
      // Any additional logic for successful registration in the UI
    } catch (error) {
      console.log("Registration failed. Please try again.", error);
      window.alert("Registration failed. Please try again.");
    }
  };
  return (
    <div className="container">
      <br />
      <div className="registration-container form-container">
        <h1 className="text-center">SIGN UP</h1>
        <form onSubmit={(e) => handleSignUp(e)}>
          <p className="text-center">
            Fill in the information below to sign up:
          </p>
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              name="name"
              onChange={handleSignupInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              placeholder="Enter e-mail..."
              name="email"
              onChange={handleSignupInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "hide" : "password"}
              placeholder="Enter password..."
              name="password"
              onChange={handleSignupInputChange}
              className="form-control"
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? "Rather hide my" : "Show me that"} password
            </div>
          </div>
          <Button type="submit" className="btn-primary btn-block">
            Sign up
          </Button>
        </form>
      </div>
      <p className="text-center">
        Already have an account?{" "}
        <a className="resetButton" href="login">
          Log in!
        </a>
      </p>
      {/* Your checkbox can be added here */}
    </div>
  );
}

export default SignUp;
