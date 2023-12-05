import React, { ChangeEvent, FormEvent, useState } from 'react';

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
    // console.log('propertyName,propertyValue :>> ', propertyName, propertyValue);
    
    //->State (Zustand) used by the handleLoginInputChange-function saves data that might change! the "!" makes sure that it is not set to "null"-which is unwahrscheinlich beacause it is already in a setter-form which means something is happening to it,right?
    //... spread-operator, ("!") non- null-assertion (TS)
  setLoginCredentials({
      ...loginCredentials!,
      [propertyName]: propertyValue,
      });  
  };

//! my Function to handle the login form submission
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevents default behaviour to reload the page when a form is submitted
    console.log('loginCredentials :>> ', loginCredentials);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    //(!) making sure that loginCredentials is not null when called 
urlencoded.append("email", loginCredentials!.email);
urlencoded.append("password", loginCredentials!.password);

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
};
    try {
      const response = await fetch
        ("http://localhost:4000/api/users/login",
          requestOptions);
      console.log('response :>> ', response);
      if (response.ok) {
        const result = await response.json();
        console.log('result :>> ', result);
      }
      if (!response.ok) {
        const result = await response.json();
        console.log('result not ok:>> ', result);
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
    //TODO - set user with userinformation in Authcontext with 
  };


  return (
    <div className="container">
      <br />
      <div className="login-container">
        <h1 className="text-center">LOG IN</h1>
        <form onSubmit={login}>
          <p className="text-center">Enter your credentials below to log in:</p>
         {/* email-Input */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              placeholder="Enter your e-mail..."
              // value={loginCredentials}
              name="email"
              onChange={handleLoginInputChange}
            />
          </div>

     {/* !Password-Input */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "hide" : "password"}
              placeholder="Enter your password..."
              // value={loginCredentials}
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