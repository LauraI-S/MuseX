import express from "express";
import {
  signup,
  login,
  getUserProfile,
  imageUpload,
  deleteUser,
  logout,
} from "../controller/userController.js";
import jwtAuthorization from "../middlewares/jwtAuthorization.js";
import multerUpload from "../middlewares/multer.js";

const router = express.Router();

// router.get("/users", getAllUsers);

// handle auth
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

//!handle posts
// GET all requests for
router.get("/", (req, res) => {
  res.json({ mssg: "GET all requests for musicians" });
});

//GET a single request
router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a single request for musicians" });
});

//POST a new request
router.post("/", (req, res) => {
  res.json({ mssg: "POST a new request for musicians" });
});

//DELETE a request
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a request for musicians" });
});

//UPDATE a request
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a request for musicians" });
});

// router.delete("/deleteUser", jwtAuthorization, deleteUser);

export default router;
