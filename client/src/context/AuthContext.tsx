import {
  createContext,
  useState,
  useContext,
  useEffect,
  FormEvent,
} from "react";
import Home from "../pages/Home";

type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  password: string;
};

type AuthInContextType = {
  user: User | null;
  userName: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signup: (email: string, name: string, password: string) => void;
  login: (e: FormEvent<HTMLFormElement>) => void;
};

// Erstelle den Authentifizierungskontext
export const AuthContext = createContext({});

//we want to provide a value from this context:
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    name: "test",
    _id: "",
    email: "",
    password: "",
    image: "",
  });
  const [userName, setUserName] = useState("");
  const [newUser, setNewUser] = useState<User | undefined>(() => ({
    name: "",
    email: "",
    password: "",
    image: "",
  }));

  //? Create the setToken function to update the authentication token:

  //use useEffect to set the default authorization???? it runs whenever the token value changes

  const signup = async () => {
    (email, name, password) => {
      signup(newUser.email, newUser.name, newUser.password);
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
    const login = async (e: FormEvent<HTMLFormElement>) => {
      // e.preventDefault(); //prevents default behaviour to reload the page when a form is submitted
      // console.log("loginCredentials :>> ", loginCredentials);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      //(!) making sure that loginCredentials is not null when called
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
        console.log("response :>> ", response);
        if (response.ok) {
          const result = await response.json();
          console.log("result :>> ", result);
          // !checking if we have a token -> if yes: storing it in our localstorage (which is basically an "object within js that allows us to save key/value pairs in the browser")
          if (result.token) {
            localStorage.setItem("token", result.token);
            //set your user object with the user information => now the token is stored in our browser: Applications/Local Storage/doubleclick on url
          }
        } else {
          const result = await response.json();
          console.log("result not ok:>> ", result);
          alert(result.message);
        }

        if (!response.ok) {
          const result = await response.json();
          console.log("result not ok:>> ", result);
          alert(result.message);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
      // const logout = () => {
      //   localStorage.removeItem("token");
      //   setUser(false);
      // };
      // useEffect(() => {
      //   const isUserLogged = isUserLoggedIn();
      //   if (isUserLogged) {
      //     console.log("%c user is logged in", "color:green");
      //     setUser(true);
      //   } else {
      //     console.log("%c user is NOT logged in", "color:red");
      //     setUser(false);
      //   }
      // }, [user]);
    };

    const getProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("you need to log in first");
      } else {
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
          const result = await response.json();
          console.log("result userProfile :>> ", result);
          setUser(result.user);
        } catch (error) {
          console.log("error", error);
        }
      }
    };

    useEffect(() => {
      getProfile();
    }, []);

    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          // logout,
          signup,
          login,
          userName,
        }}
      >
        <Home />
        {children}
      </AuthContext.Provider>
    );
  };
};
