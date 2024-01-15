import musicianModel from "../Model/musicianModel.js";
import userModel from "../Model/userModel.js";
import { issueToken } from "../utils/jwt.js";
import { encryptPassword, verifyPassword } from "../utils/passwordServices.js";
import { v2 as cloudinary } from "cloudinary";
import validator from "validator";
import react from "react";

const imageUpload = async (req, res) => {
  console.log("req.file :>> ", req.file);
  if (req.file) {
    try {
      //! Upload the image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images", //!<-- this creates a folder within cloudinary that stores the image
      });
      console.log("result".bgBlue, result);
      // Update the user's profile with the image URL
      const userId = req.user._id;
      await userModel.findByIdAndUpdate(userId, { image: result.secure_url });
      // Return the updated user profile data
      const updatedUser = await userModel.findById(userId);

      res.status(201).json({
        message: "image uploaded",
        image: result.secure_url,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          image: updatedUser.image,
        },
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(500).json({
      message: "file not supported",
    });
  }
};

const signup = async (req, res) => {
  console.log("register controller working :>> ");
  //!seeing the given data in postman, referring to the data within the body of that request
  console.log("req.body :>> ", req.body);
  //REVIEW write logic in error-handling: if there´s no information in req.body--> send info to client
  if (!req.body) {
    return res.status(400).json({ error: "No data provided" });
  }
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }
  //REVIEW if req.body.email doenst exist write you forgot to put an email
  if (req.body.email === null || undefined) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!req.body.password) {
    return res.status(400).json({ error: "Password is required" });
  }
  //if the req.body.email exists (an email is being sent from the client), then we check IF the email exists already in the database
  const existingUser = await userModel.findOne({ email: req.body.email });
  console.log("existingUser function finished :>> ");
  if (existingUser) {
    return res.status(409).json({
      message: "email already exists",
    });
  }
  //validation with vilidator
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }
  if (!validator.isStrongPassword(req.body.password)) {
    return res.status(400).json({ error: "Password not strong enough" });
  }
  validator.isStrongPassword(req.body.password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
  //if a user with that email is found in our database, we send a response to our client informing about it(email already existing ...)
  if (!existingUser) {
    //IF we cannot find a user with the same email in our DB, we proceed with the registration : 1st hash password, 2nd save user, 3rd reponse to the client
    //?encrypt password
    const hashedPassword = await encryptPassword(req.body.password);
    if (hashedPassword) {
      //using model, saving information, storing in database
      const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
        password: hashedPassword,
      });
      console.log("new user created :>> ");

      const savedUser = await newUser.save();
      console.log("new user saved :>> ");
      // Create a token for the new user
      const token = issueToken(savedUser._id);

      res.status(201).json({
        message: "user registered!",
        user: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          image: savedUser.image,
        },
        token, // Send the token as part of the response
      });
    } else {
      res.status(500).json({
        message: "Error encrypting password",
      });
    }
  }
};

const login = async (req, res) => {
  console.log("login route works :>> ");
  const { email, password } = req.body;
  //if there´s no email and no password I send a response
  if (!email && !password) {
    res.status(400).json({
      //(400)=Bad Request
      message: "password or email are missing",
    });
  } else {
    try {
      //logic check if the user exists?
      const existingUser = await userModel.findOne({ email: req.body.email });
      if (!existingUser) {
        res.status(500).json({
          message:
            "email not found...are you sure you already have an account?",
        });
      }
      //what if the user exists? check password!
      if (existingUser) {
        //check if password is correct?
        const existingPassword = await verifyPassword(
          req.body.password,
          existingUser.password
        );
        if (!existingPassword) {
          //password is incorrect
          res.status(402).json({
            message: "wrong password",
          });
        }
        if (existingPassword) {
          //if password is right

          //create Token
          const token = issueToken(existingUser._id);
          if (token) {
            res.status(200).json({
              message: "user successfully logged in",
              user: {
                userName: existingUser.name,
                email: existingUser.email,
                image: existingUser.image,
                id: existingUser._id,
              },
              token,
            });
          }
        }
      }
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({
        message: "something went wrong",
      });
    }
  }
};
const logout = async (req, res) => {
  console.log("logout-route working :>> ");
  const token = req.headers.authorization?.split("")[1];
  console.log("logout-req :>> ", req);
  if (!token) {
    res.status(200).json({ message: "Logout successful" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      res.clearCookie("token");
    } catch (error) {
      res.status(200).json({ message: "Logout successful" });
    }
  }
};

const getUserProfile = async (req, res) => {
  console.log("getprofile route working :>> ");
  console.log("req :>> ", req.user);

  if (req.user) {
    res.status(200).json({
      message: "user profile",
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        image: req.user.image,
      },
    });
  }
  if (!req.user) {
    req.status(400).json({
      message: "something went wrong ...Login again",
    });
  }
};

const deleteUser = async (req, res) => {
  console.log("req.user :>> ", req.user);
  try {
    const user = req.user;
    const deletedUser = await userModel.findOneAndDelete({
      _id: user._id,
    });

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found. Are you sure you want to delete this user?",
      });
    }
    // await musicianModel.deleteOne({ user: user.id });
    // console.log("user._id :>> ", user.id);
    //FIXME - Ask Helene for help!!! this line is supposed to delete the user within the musician but would delete all of the musician

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { imageUpload, signup, login, getUserProfile, deleteUser, logout };
