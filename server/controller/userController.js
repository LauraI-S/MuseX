import userModel from "../Model/userModel.js";
import { issueToken } from "../utils/jwt.js";
import { encryptPassword, verifyPassword } from "../utils/passwordServices.js";

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await userModel.find({});
//     if (users) {
//       return res.status(200).json({
//         users: users,
//         user: users.length,
//       });
//     }
//   } catch (err) {
//     return res.json({
//       errorMessage: err,
//     });
//   }
// };
// const number = 1;

// if (number === 1) {
//   console.log("hi");
// }

// if (number !== 1) {
//   console.log("hello");
// }

const signup = async (req, res) => {
  console.log("register controller working :>> ");
  //!seeing the given data in postman, referring to the data within the body of that request
  console.log("req.body :>> ", req.body);
  //REVIEW write logic in error-handling: if there´s no information in req.body--> send info to client
  if (!req.body) {
    return res.status(400).json({ error: "No data provided" });
  }
  //REVIEW if req.body.email doenst exist write you forgot to put an email
  if (req.body.email === null || undefined) {
    return res.status(400).json({ error: "Email is required" });
  }
  //if the req.body.email exists (an email is being sent from the client), then we check IF the email exists already in the database
  const existingUser = await userModel.findOne({ email: req.body.email });
  if (existingUser) {
    res.status(200).json({
      message: "email already exists",
      //FIXME - show that alert in frontend
    });
  }

  //FIXME - ANCHOR!valid email-format?
  const isValidEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regular expression
    return emailRegex.test(email);
  };
  if (!isValidEmail(req.body.email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  //if a user with that email is found in our database, we send a response to our client informing about it(email already existing ...)
  if (!existingUser) {
    //IF we cannot find a user with the same email in our DB, we proceed with the registration : 1st hash password, 2nd save user, 3rd reponse to the client

    //?encrypt password
    const hashedPassword = await encryptPassword(req.body.password);
    if (hashedPassword) {
      //using model, saving information, storing in database
      const newUser = new userModel({
        name: req.body.userName,
        email: req.body.email,
        // image: req.body.image
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      console.log("savedUser :>> ", savedUser);
      res.status(201).json({
        message: "user registered",
        savedUser,
      });
    } else {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  }
};
const login = async (req, res) => {
  console.log("login route works :>> ");
  const { email, password } = req.body;
  //if there´s no email and no password i send the response
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
          message: "email not found...do you already have an account?",
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

          //generate Token
          const token = issueToken(existingUser._id);
          if (token) {
            res.status(200).json({
              message: "user successfully logged in",
              user: {
                userName: existingUser.userName,
                email: existingUser.email,
                userImage: existingUser.userImage,
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
const getUserProfile = async (req, res) => {
  console.log("getprofile route working :>> ");
  console.log("req :>> ", req.user);

  if (req.user) {
    res.status(200).json({
      message: "user profile",
      user: {
        id: req.user._id,
        email: req.user.email,
        userName: req.user.userName,
        userImage: req.user.userImage,
      },
    });
  }
  if (!req.user) {
    req.status(400).json({
      message: "something went wrong ...Login again",
    });
  }
};

export { signup, login, getUserProfile };
