import express from "express";
import {
  getAllMusicians,
  getMusicianDetails,
  // getMusiciansByInstruments,
  // getMusiciansWithLikes,
} from "../controller/musicianController.js";

const router = express.Router();

router.get("/all", getAllMusicians);
router.get("/musicianDetails", getMusicianDetails);
// router.get("/:likes", getMusiciansWithLikes);
// router.get("/:instrument", getMusiciansByInstruments);

export default router;
