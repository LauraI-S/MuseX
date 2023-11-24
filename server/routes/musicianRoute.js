import express from "express";
import {
  getAllMusicians,
  // getMusiciansByInstruments,
  // getMusiciansWithLikes,
} from "../controller/musicianController.js";

const router = express.Router();

router.get("/all", getAllMusicians);
// router.get("/:likes", getMusiciansWithLikes);
// router.get("/:instrument", getMusiciansByInstruments);

export default router;
