import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getToken } from "../utils/token";
import "../styles/Profile.css";

type UserImageType = {
  image: string;
  user: User;
};

type User = {
  id: string;
  password: string;
  email: string;
  name: string;
  image: string;
};

type OkResponse = {
  message: string;
  user: User;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newUser, setNewUser] = useState<User | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const uploadImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    const headers = new Headers();
    const token = getToken();
    headers.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "POST",
      body: formData,
      headers: headers,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/imageupload",
        requestOptions
      );
      const result: UserImageType = await response.json();
      setUser(result.user); // Update state with the new user information
      setSelectedFile(null); // Clear the selected file after successful upload
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in first");
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
        const result: OkResponse = await response.json();
        setUser(result.user);
      } else {
        console.log("Error fetching user profile");
      }
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

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
      .catch((error) => console.log("Error deleting user:", error));
  };

  useEffect(() => {
    console.log("Profile component is mounting");
    // Other logic...

    return () => {
      console.log("Profile component is unmounting");
    };
  }, []);

  return (
    <div className="profile-container">
      <h3>User Profile</h3>

      <div className="input-container">
        <form onSubmit={uploadImage}>
          <label htmlFor="image" className="custom-upload-button">
            Upload Picture
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleInputChange}
            />
          </label>
          <Button variant="secondary" type="submit">
            Upload
          </Button>
        </form>
        {newUser && <img src={newUser.image} alt="user image" />}

        {selectedFile && (
          <img src={URL.createObjectURL(selectedFile)} alt="user image" />
        )}
      </div>

      {user && ( // Check if user is defined
        <div className="user-info">
          <h4>User Information</h4>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Username:</strong> {user.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
