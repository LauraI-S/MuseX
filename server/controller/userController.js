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

const signup = async (req, res) => {
  console.log("register controller working :>> ");
  //!seeing the given data in postman
  console.log("req.body :>> ", req.body);
  //REVIEW write logic in error-handling: if there´s no information in req.body--> send info to client
  if (req.body === null || undefined) {
    return res.status(400).json({ error: "No data provided" });
  }
  //REVIEW if req.body.email doenst exist write you forgot to put an email
  if (req.body.email === null || undefined) {
    return res.status(400).json({ error: "Email is required" });
  }

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
};

export { signup };

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
