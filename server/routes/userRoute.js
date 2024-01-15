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
