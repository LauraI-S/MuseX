import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { getToken } from "../utils/token";

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
  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target :>> ", e);
    const file = e.target.files?.[0] || "";
    setSelectedFile(file);
  };
  //TODO - I can reach the type of the images using files.type (and maybe let the user know, that the provided file-type is...?)
  const uploadImage = async () => {
    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/imageupload",
        requestOptions
      );
      const result = await response.json();
    } catch (error) {
      console.log("error", error);
    }
  };

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

  const userID = user?.id;

  const deleteUser = () => {
    const token = getToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    fetch("http://localhost:4000/api/users/deleteUser", requestOptions)
      .then((response) => response.text())
      // .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    //   var requestOptions = {
    //     method: "DELETE",
    //   };

    //   fetch("http://localhost:4000/api/users/deletuser", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h3>User Profile</h3>

      <Button variant="secondary" onClick={deleteUser()}>
        Delete
      </Button>
      <input type="file" onChange={handleInputChange} />
      <Button variant="secondary"> upload picture</Button>

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
