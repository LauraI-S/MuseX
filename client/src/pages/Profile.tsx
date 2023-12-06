import React, { useState } from "react";
import { Button } from "react-bootstrap";

type User = {
  id: string;
  email: string;
  userName: string;
  userImage: string;
};

type OkResponse = {
  message: string;
  user: User;
};

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("you need log in");
    }
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch("http://localhost:4000/api/users/profile", requestOptions)
        .then((response) => response.json())
        .then((result: OkResponse) => {
          setUser(result.user);
          console.log("result", result);
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div>
      <h3>User Profile</h3>
      <div>
        <Button variant="secondary" onClick={getProfile}>
          Get Profile
        </Button>
      </div>

      {user && (
        <img
          src={user.userImage}
          alt={`picture from user ${user.userName}`}
          style={{ width: "200px" }}
        />
      )}
    </div>
  );
}

export default Profile;
