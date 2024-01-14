import express from "express";
import requestModel from "../Model/requestModel.js";

import {
  createRequest,
  getRequest,
  getRequests,
  deleteRequest,
  updateRequest,
} from "../controller/requestController.js";
import jwtAuthorization from "../middlewares/jwtAuthorization.js";
import multerUpload from "../middlewares/multer.js";

const router = express.Router();

//!handle posts
// GET all requests for
router.get("/", getRequests);

//GET a single request
router.get("/:id", getRequest);

//POST a new request
router.post("/", createRequest);

//DELETE a request
router.delete("/:id", deleteRequest);

//UPDATE a request
router.patch("/:id", updateRequest);

export default router;
