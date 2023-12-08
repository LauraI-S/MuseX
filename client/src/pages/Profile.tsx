import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { getToken } from "../utils/token";
import "../styles/Profile.css";

type UserImageType = {
  userImage: string;
  user: User;
};
type User = {
  id: string;
  password: string;
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
  const [newUser, setNewUser] = useState<User | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("e.target :>> ", e);
    const file = e.target.files?.[0] || "";
    setSelectedFile(file);
  };
  //TODO - I can reach the type of the images using files.type (and maybe let the user know, that the provided file-type is...?)

  const uploadImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      const result: UserImageType = await response.json();
      const userImage: UserImageType = result.userImage;
      console.log("result :>> ", result);
      // setNewUser({ ...newUser!, [e.target.name]: e.target.value });
      setNewUser(result.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("you need to log in first");
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

  // const userID = user?.id;

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
      <h3>Create a Profile</h3>

      <Button variant="secondary" onClick={deleteUser}>
        Delete
      </Button>

      <div className="input-container">
        <form onSubmit={uploadImage}>
          <input type="file" onChange={handleInputChange} />
          <Button variant="secondary" onClick={uploadImage}>
            {" "}
            upload picture
          </Button>
        </form>
        {newUser && <img src={newUser.userImage} alt="user image" />}

        {selectedFile && (
          <img src={URL.createObjectURL(selectedFile)} alt="user image" />
        )}
      </div>
      {newUser && (
        <div className="user-info">
          <h4>User Information</h4>
          <p>
            <strong>User ID:</strong> {newUser.id}
          </p>
          <p>
            <strong>Email:</strong> {newUser.email}
          </p>
          <p>
            <strong>Username:</strong> {newUser.userName}
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile;
