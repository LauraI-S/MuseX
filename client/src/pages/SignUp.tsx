import React, { ChangeEvent, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "../styles/SignUp.css"; // Import a CSS file for custom styling
import { AuthContext } from "../context/AuthContext";

export interface User {
  name: string;
  email: string;
  password: string;
  userImage: string;
}

function SignUp() {
  const { signup, user } = useContext(AuthContext);
  const [newUser, setNewUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    userImage: "",
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
  const signUp = (e) => {
    // e.preventDefault();
    signUp(newUser.email, newUser.name, newUser.password);
    console.log("newUser :>> ", newUser);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-API-Key", "{{token}}");

    const urlencoded = new URLSearchParams();
    urlencoded.append("name", newUser.name);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append(
      "image",
      newUser.userImage
        ? newUser.userImage
        : "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    fetch("http://localhost:4000/api/users/signup", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result", result);
        window.alert("You have successfully registered!");
      })
      .catch((error) => {
        console.log("error", error);
        window.alert("Registration failed. Please try again.");
      });
  };
  return (
    <div className="container">
      <br />
      <div className="registration-container form-container">
        <h1 className="text-center">SIGN UP</h1>
        <form onSubmit={(e) => signUp(e)}>
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
