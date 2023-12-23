import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import * as dotenv from "dotenv";
import colors from "colors";

// Import route handlers
import musicianRoute from "../server/routes/musicianRoute.js";
import userRoute from "../server/routes/userRoute.js";
import requestRoute from "../server/routes/requestRoute.js";

// Import configurations
import passportConfig from "./config/passport.js";
import cloudinaryConfig from "./config/cloudinary.js";

dotenv.config();

const app = express();

// Database connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to the database established".bgGreen);
  } catch (error) {
    console.error("Error connecting to MONGO_URI:".red, error);
  }
};

// Middleware Configuration
const configureMiddlewares = () => {
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  cloudinaryConfig();
  passportConfig(passport); // Imported from passport.js
};

// Route Configuration
const configureRoutes = () => {
  const router = express.Router();
  app.use("/api", router);
  app.use("/api/musicians", musicianRoute);
  app.use("/api/users", userRoute);
  app.use("/api/requests", requestRoute);
};

// Server startup
const startServer = () => {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`.rainbow);
  });
};

// IIFE (Immediately Invoked Function Expression)
(async function initializeServer() {
  await connectToDatabase();
  configureMiddlewares();
  configureRoutes();
  startServer();
})();
