import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { getToken } from "../utils/token";
import { MyNavbar } from "../components/MyNavbar";
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

      if (response.ok) {
        // After successful image upload, fetch the user profile again
        await getProfile();
        setSelectedFile(null); // Clear the selected file after successful upload
      } else {
        console.log("Error uploading image:", response.statusText);
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };
  useEffect(() => {
    // Fetch user profile when the component mounts
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = getToken();
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

  const deleteUser = async () => {
    const token = getToken();
    if (!token) {
      alert("Please log in to delete your account.");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/deleteUser",
        requestOptions
      );

      if (response.ok) {
        // Handle successful deletion, e.g., redirect to login page
        alert("Account deleted successfully.");
      } else {
        console.log("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };
  return (
    <Card className="profile-container">
      <Card.Header>
        <h3>User Profile</h3>
      </Card.Header>
      <Card.Body>
        <div className="image-container">
          {/* Profile image */}
          {user && (
            <div className="profile-image">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="user image"
                  className="selected-image"
                />
              ) : (
                <img src={user.image} alt="user image" />
              )}
            </div>
          )}

          <div className="input-container">
            <form onSubmit={uploadImage}>
              <label htmlFor="image" className="custom-upload-button">
                Upload Picture
                <input type="file" id="image" onChange={handleInputChange} />
              </label>
              <Button variant="secondary" type="submit">
                Upload
              </Button>
            </form>
          </div>

          {/*! User Information */}
          {user && (
            <div className="user-info">
              <h4>User Information</h4>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Username:</strong> {user.name}
              </p>
            </div>
          )}

          {/* Delete Profile Button */}
          {user && (
            <div className="delete-button">
              <Button variant="danger" onClick={deleteUser}>
                Delete Profile
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Profile;
