import express from "express";
import { signup } from "../controller/userController.js";

const router = express.Router();

// router.get("/users", getAllUsers);

router.post("/signup", signup);

export default router;
