import React, { ChangeEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../styles/SignUp.css'; // Import a CSS file for custom styling

function SignUp() {
  const [newUser, setNewUser] = useState<User>({
    userName: "",
    email: "",
    password: "",
    userImage: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignupInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //!the following line basically combines the new user-information with existing information
    //!...:spread-operator keeps track of the previously stored information
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    console.log('e.target.name :>> ', e.target.name);
    console.log('e.target.value :>> ', e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //!preventing new page-reload by default, console-logging my new user
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('newUser :>> ', newUser);
    // Add your sign-up logic here
  };
  return (
    <div className="container fancy-container">

      <br />
      <div className="registration-container fancy-form-container">
        <h1 className="text-center">SIGN UP</h1>
        <form onSubmit={handleSubmit}>
          <p className="text-center">Fill in the information below to sign up:</p>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? 'hide' : 'password'}
              placeholder="Enter password..."
              name="password"
              onChange={handleSignupInputChange}
              className="form-control"
              required
            />
            <div
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Rather hide' : 'Show me that'} password
            </div>
          </div>
          <Button type="submit" className="btn-primary btn-block">
            Sign up
          </Button>
        </form>
      </div>
      <p className="text-center">
        Already have an account?{' '}
        <a className="resetButton" href="login">
          Log in!
        </a>
      </p>
      {/* Your checkbox can be added here */}
    </div>
  );
}

export default SignUp;