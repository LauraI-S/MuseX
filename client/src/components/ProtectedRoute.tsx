import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

type User = {
  id: string;
  email: string;
  userName: string;
  userImage: string;
};
function ProtectedRoute({ children }) {
  // Bouncer, that checks you and let´s you in... or not
  // const { user } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  //   const allowAccess = isUserAuth(user);
  const navigate = useNavigate();
  //   console.log("allowAccess :>> ", allowAccess);

  const handleLoginClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when loading is completed
    }, 1000); // Adjust the time delay as needed
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>
          {
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          }
        </h1>
      ) : allowAccess ? (
        children
      ) : (
        <div className="registration-container">
          <h2>
            Please
            <Button variant="secondary" onClick={handleLoginClick}>
              login
            </Button>{" "}
            first....
          </h2>
        </div>
      )}
    </>
  );
}

export default ProtectedRoute;
