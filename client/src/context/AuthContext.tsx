import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  ChangeEvent,
} from "react";
import { Navigate } from "react-router-dom";

type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  password: string;
};

interface AuthContextType {
  user: User | null;
  name: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signup: (email: string, name: string, password: string) => void;
  login: () => void;
  getProfile: () => void;
  logout: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}
type LoginCredentialsType = {
  // userName: string;
  email: string;
  password: string;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState("");
  const [loginCredentials, setLoginCredentials] =
    useState<LoginCredentialsType | null>(null);

  const getProfile = async () => {
    console.log("getProfile function called");
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to log in first");
      setUser(null);
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/profile",
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log("result userProfile :>> ", result);

        // Update the user state with the fetched user profile
        setUser(result.user);
      } else {
        console.log("Error fetching user profile");
        setUser(null); // Set user to null in case of an error
      }
    } catch (error) {
      console.log("error", error);
      setUser(null); // Set user to null in case of an error
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getProfile();
    }
  }, []);

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

  const login = async () => {
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
        console.log("result for login response :>> ", result);

        if (result.token) {
          localStorage.setItem("token", result.token);
          setUser(result.user);
        }
      } else {
        const result = await response.json();
        console.log("result not ok:>> ", result);
        alert(result.message);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const isUserLoggedIn = () => {
    const token = getToken();
    return token ? true : false;
  };
  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setUser(false);
  // };
  useEffect(() => {
    const isUserLogged = isUserLoggedIn();
    if (isUserLogged) {
      console.log("%c user is logged in", "color:green");
      setUser(true);
    } else {
      console.log("%c user is NOT logged in", "color:red");
      setUser(false);
    }
  }, []);

  // useEffect(() => {
  //   const isUserLogged = isUserLoggedIn();
  //   if (isUserLogged) {
  //     console.log("%c user is logged in :>> ", "color: green");
  //   } else {
  //     console.log("%c user is not logged in :>> ", "color: red");
  //   }
  // }, []);

  const logout = async () => {
    console.log("logout function triggered :>> ");
    const isUserLogged = isUserLoggedIn();
    console.log("Is user logged in?", isUserLogged);

    if (isUserLogged) {
      try {
        // Call the backend logout route to clear the session or invalidate the token
        const response = await fetch("http://localhost:4000/api/users/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (response.ok) {
          // Clear the token from local storage
          localStorage.removeItem("token");

          // Update the user state
          setUser(null);
          console.log("Logout successful");

          // Redirect or perform any other action after logout
          // ...
        } else {
          const result = await response.json();
          console.log("Logout failed: ", result.message);
        }
      } catch (error) {
        console.log("Error during logout: ", error);
      }
    } else {
      console.log("User is not logged in");
    }
  };

  const handleLogout = () => {
    logout();
  };
  const signup = async (email: string, name: string, password: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("name", name);
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    urlencoded.append(
      "image",
      "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/signup",
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log("result", result);

        // Update the user state with the registered user information
        setUser(result.user);
        setUserName(result.user.name);

        // window.alert("You have successfully registered!");
      } else {
        const result = await response.json();
        console.log("result not ok:>> ", result);
        alert(result.message);
      }
    } catch (error) {
      console.log("error :>> ", error);
      // window.alert("Registration failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signup,
        login,
        getProfile,
        handleLoginInputChange,
        isUserLoggedIn,
        handleLogout,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
