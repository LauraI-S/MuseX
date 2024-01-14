import express from "express";
import {
  getAllMusicians,
  getMusicianDetails,
  updateMusician,
  createMusician,
  deleteMusician,
} from "../controller/musicianController.js";

const router = express.Router();

// GET all musicians
router.get("/all", getAllMusicians);

// GET a single musician by ID
router.get("/:_id", getMusicianDetails);

// POST a new musician
router.post("/", createMusician);

// UPDATE a musician by ID
router.patch("/:_id", updateMusician);

// DELETE a musician by ID
router.delete("/:_id", deleteMusician);

export default router;
