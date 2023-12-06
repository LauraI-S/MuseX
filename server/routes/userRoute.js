import express from "express";
import { signup, login, getUserProfile } from "../controller/userController.js";
import jwtAuthorization from "../middlewares/jwtAuthorization.js";

const router = express.Router();

// router.get("/users", getAllUsers);

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", jwtAuthorization, getUserProfile);

export default router;
