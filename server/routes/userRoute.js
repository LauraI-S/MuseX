import express from "express";
import {
  signup,
  login,
  getUserProfile,
  imageUpload,
  deleteUser,
  logout,
} from "../controller/userController.js";
import Request from "../Model/requestModel.js";
import jwtAuthorization from "../middlewares/jwtAuthorization.js";
import multerUpload from "../middlewares/multer.js";

const router = express.Router();

//! handle authentification
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post(
  "/imageUpload",
  jwtAuthorization,
  multerUpload.single("image"),
  imageUpload
);
router.get("/profile", jwtAuthorization, getUserProfile);

router.delete("/deleteUser", jwtAuthorization, deleteUser);

export default router;

// //!handle posts
// // GET all requests for
// router.get("/", (req, res) => {
//   res.json({ mssg: "GET all requests for musicians" });
// });
// //GET a single request
// router.get("/:id", (req, res) => {
//   res.json({ mssg: "GET a single request for musicians" });
// });

// //POST a new request
// router.post("/", async (req, res) => {
//   //create a new request-document inside the collections, using the model
//   const { title, likes, genre } = req.body;

//   try {
//     const request = await requestModel.create({ title, likes, genre });
//     res.status(200).json(request);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// //DELETE a request
// router.delete("/:id", (req, res) => {
//   res.json({ mssg: "DELETE a request for musicians" });
// });

// //UPDATE a request
// router.patch("/:id", (req, res) => {
//   res.json({ mssg: "UPDATE a request for musicians" });
// });
