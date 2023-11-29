import userModel from "../Model/userModel.js";
import { encryptPassword } from "../utils/encryptPassword.js";

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
const number = 1;

if (number === 1) {
  console.log("hi");
}

if (number !== 1) {
  console.log("hello");
}

const signup = async (req, res) => {
  console.log("register controller working :>> ");
  //!seeing the given data in postman
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
    });
  }

  //if a user with that email is found in our database, we send a response to our client informing about it(email already existing ...)
  if (!existingUser) {
    //IF we cannot find a user with the same email in our DB, we proceed with the registration : 1st hash pasword, 2nd save user, 3rd reponse to the client

    //?encrypt password
    const hashedPassword = await encryptPassword(req.body.password);
    if (hashedPassword) {
      //using model, saving information, storing in database
      const newUser = new userModel({
        name: req.body.name,
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

export { signup };

// name,
// email,
//? LINE 48: check savedUser?  am I sending the information of the user back if I write savedUser? CHECK!

//  res.status(201).json({
//     message: "user registered!!",
//     user: {
//       name: savedUser.userName,
//       email: savedUser.email,
//       // userImage: savedUser.userImage,
//     },
//   });
//  else {
//     res.status(500).json({
//       message: "something went wrong",
//     });
