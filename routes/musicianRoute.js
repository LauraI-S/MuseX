import express from "express";
import { getAllMusicians } from "../controller/musicianController.js";

const router = express.Router();

router.get("/musicians", getAllMusicians);

export default router;
