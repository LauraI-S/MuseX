import express from "express";
import { getAllMusicians } from "../controller/musicianController.js";

const router = express.Router();

router.get("/all", getAllMusicians);

export default router;
