

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Button, Form } from "react-bootstrap";
// import { AuthContext } from "../context/AuthContext";

function SignUp() {
  const { signup } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [showOrHide, setShowOrHide] = useState("show");
  const redirectTo = useNavigate();

  const changePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setShowOrHide("hide");
      return;
    }
    setPasswordType("password");
    setShowOrHide("show");
  };

  const handleDisplayNameEntry = (e) => {
    const displayNameInput = e.target.value;
    setDisplayName(displayNameInput);
  };

  const handleEmailEntry = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
  };

  const handlePswEntry = (e) => {
    const pswInput = e.target.value;
    setPassword(pswInput);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      alert("Invalid email or password. Please check your input.");
      return;
    }

    // Assuming register returns a Promise
    signup(displayName, email, password)
      .then(() => {
        // Redirect after a successful registration
        redirectTo("/recipes");
      })
      .catch((error) => {
        console.error("Error during registration: ", error);
        alert("Registration failed. Please try again.");
      });
  };

  useEffect(() => {
    setDisplayName(displayName);
    setEmail(email);
    setPassword(password);
  }, []);

  return (
    <div>
      <br />
      <div className="registration-container">
        <h1> SIGN UP</h1>
        <div className="salad">
          <img src={salad} alt="Salad" />
        </div>
        <form className="signUpForm" onSubmit={handleSignUp}>
          <p>Fill in the information below to sign up:</p>
          {/* <label htmlFor="username">Username:</label>
          <input
            onChange={handleDisplayNameEntry}
            className="searchInputBox"
            type="text"
            placeholder="Choose username..."
            name="username"
          />
          <br /> */}
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
        </form>
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
  );
}

export default SignUp;
