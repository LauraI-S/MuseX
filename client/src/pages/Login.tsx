import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

interface LoginProps {
  logout: () => void;
}

function Login({ logout }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginCredentials, setLoginCredentials] =
    useState<LoginCredentialsType | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { isUserLoggedIn } = useContext(AuthContext);

  //my function to toggle the password-visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const propertyValue = e.target.value;
    const propertyName = e.target.name;
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
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", loginCredentials!.email);
    urlencoded.append("password", loginCredentials!.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/users/login",
        requestOptions
      );
      if (response.ok) {
        const result = await response.json();
        // !checking if we have a token -> if yes: storing it in our localstorage (which is basically an "object within js that allows us to save key/value pairs in the browser")
        if (result.token) {
          localStorage.setItem("token", result.token);
          setLoginSuccess(true);
          //set your user object with the user information => now the token is stored in our browser: Applications/Local Storage/doubleclick on url
        }
      } else {
        const result = await response.json();
        console.log("result not ok:>> ", result);
        alert(result.message);
      }

      if (!response.ok) {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    const isUserLogged = isUserLoggedIn();
    if (isUserLogged) {
      console.log("%c user is logged in :>> ", "color: green");
    } else {
      console.log("%c user is not logged in :>> ", "color: red");
    }
  }, []);

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome Back!</h1>
      <form onSubmit={login} className="login-form">
        <p className="login-subtitle">Log in to find your perfect musicians:</p>

        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            className="login-input"
            onChange={handleLoginInputChange}
          />
        </div>

        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            name="password"
            className="login-input"
            onChange={handleLoginInputChange}
          />
          <div className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide Password" : "Show Password"}
          </div>
        </div>

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>

      <p className="login-text">
        Don't have an account?{" "}
        <a className="signup-link" href="signup">
          Sign up now!
        </a>
      </p>

      {loginSuccess && (
        <div className="login-success">You've been successfully logged in!</div>
      )}
    </div>
  );
}

export default Login;
