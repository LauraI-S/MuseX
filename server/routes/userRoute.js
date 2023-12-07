import express from "express";
import {
  signup,
  login,
  getUserProfile,
  imageUpload,
  deleteUser,
} from "../controller/userController.js";
import jwtAuthorization from "../middlewares/jwtAuthorization.js";
import multerUpload from "../middlewares/multer.js";

const router = express.Router();

// router.get("/users", getAllUsers);

router.post("/imageUpload", multerUpload.single("image"), imageUpload);
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", jwtAuthorization, getUserProfile);
router.delete("/deleteUser", jwtAuthorization, deleteUser);

export default router;
