import React, { ChangeEvent, useState } from 'react';

type LoginCredentialsType= {
  // userName: string;
    email: string;
    password: string;
}

function Login() {
const [showPassword, setShowPassword] = useState(false);
const [loginCredentials, setLoginCredentials] = useState<LoginCredentialsType | null>(null);

  //my function to toggle the password-visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const propertyValue = e.target.value;
    const propertyName = e.target.name;
    console.log('propertyName,propertyValue :>> ', propertyName, propertyValue);
    
    //->State (Zustand) used by the handleLoginInputChange-function saves data that might change! the "!" makes sure that it is not set to "null"-which is unwahrscheinlich beacause it is already in a setter-form which means something is happening to it,right?
    setLoginCredentials({ ...loginCredentials!, [propertyName]: propertyValue })
  };

//! my Function to handle the login form submission
  const login = (e) => {
    e.preventDefault(); //prevents default behaviour to reload the page when a form is submitted
    console.log('loginCredentials :>> ', loginCredentials);
  };


  return (
    <div className="container">
      <br />
      <div className="login-container">
        <h1 className="text-center">LOG IN</h1>
        <form onSubmit={login}>
          <p className="text-center">Enter your credentials below to log in:</p>
        //! email-Input
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              placeholder="Enter your e-mail..."
              value={loginCredentials.email}
              name="email"
              onChange={handleLoginInputChange}
            />
          </div>

     //!Password-Input
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter your password..."
              value={loginCredentials.password}
              name="password"
              onChange={handleLoginInputChange}
            />
          </div>
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? "Rather hide my" : "Show me that"} password
          </div>
          
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>

      <p className="text-center">
        Don't have an account?{' '}
        <a className="resetButton" href="signup">
          Sign up!
        </a>
      </p>
          </div>

  );
};

export default Login