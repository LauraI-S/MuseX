import express from "express";
import cors from "cors";
import colors from "colors";
import mongoose from "mongoose";
import musicianRoute from "../server/routes/musicianRoute.js";
import userRoute from "../server/routes/userRoute.js";
import * as dotenv from "dotenv";
import passport from "passport";
import passportConfig from "./config/passport.js";
import cloudinaryConfig from "./config/cloudinary.js";

dotenv.config();
const router = express.Router();

const app = express();

const DBConnection = async () => {
  console.log("process.env.DB :>> ", process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connection to MONGO_URI established".bgGreen);
  } catch (error) {
    console.log("error connection to MONGO_URI:>> ".red, error);
  }
};
DBConnection();

//!Midddleware Configuration
const addMiddlewares = () => {
  app.use(express.json());
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  cloudinaryConfig();
  passportConfig(passport); //imported from passport.js
  // passport.use(JwtStrategy); would be also a way to "call" passport
};

//!routes
const addRoutes = () => {
  app.use("/api", router);
  app.use("/api/musicians", musicianRoute);
  app.use("/api/users", userRoute);
};
//!listen for requrests on port...
const startServer = () => {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log("Server is running on ".rainbow + port + " port".rainbow);
    // console.log("hello :>> ");
  });
};

//!IIFE  (Immediately Invoked Function Expression)
(async function controller() {
  await DBConnection();
  addMiddlewares();
  addRoutes();
  startServer();
})();
//!middleware
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
