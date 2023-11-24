import React from 'react';
import { Button, Form } from 'react-bootstrap';
import "../styles/SignUp.css"


function SignUp() {
  return (
    <div>
      <h1>Sign Up</h1>
      
  <div>
      <br />
      <div className="registration-container">
        <h1> SIGN UP</h1>
        {/* <div className="salad">
          <img src={salad} alt="Salad" />
        </div> */}
        <Form className="signUpForm" onSubmit={handleSignUp}>
          <p>Fill in the information below to sign up:</p>
           <label htmlFor="username">Username:</label>
          <input
            onChange={handleDisplayNameEntry}
            className="searchInputBox"
            type="text"
            placeholder="Choose username..."
            name="username"
          />
          <br /> 
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleEmailEntry}
            className="searchInputBox"
            type="text"
            placeholder="Enter e-mail..."
            name="email"
            required
          />
          <br /> <label htmlFor="psw">Password:</label>
          <input
            onChange={handlePswEntry}
            className="searchInputBox"
            type={passwordType}
            placeholder="Enter password..."
            name="psw"
            required
          />
          <span
            onClick={changePasswordType}
            className="hide-password"
            style={{ cursor: "pointer" }}
          >
            {showOrHide}
          </span>
          <Button type="submit" className="signupbtn">
            Sign up
          </Button>
        </Form>
      </div>
      <p>
        Already have an account?{" "}
        <a className="resetButton" href="login">
          Log in!
        </a>
      </p>
      <Form>
        {["checkbox"].map((type) => (
          <div key={`default`} className="ckeckbox-box">
            <Form.Check
              type={type}
              id={`default`}
              label={
                <span className="checkbox-label">
                  Yes please, send me tasty emails! I'd like to receive news and
                  exclusive offers from the Cook`cinelle. By signing up, you
                  agree to our Terms of Use. Learn how we collect, use, and
                  share your data in our Privacy Policy.
                </span>
              }
            />
          </div>
        ))}
      </Form>
    </div>

    </div>
  );
}

export default SignUp;




