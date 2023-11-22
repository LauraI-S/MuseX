import express from "express";
import cors from "cors";
import colors from "colors";
// import router from "./routes/testRoute.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import musicianRoute from "../server/routes/musicianRoute.js";
import userRoute from "../server/routes/userRoute.js";

dotenv.config();
const router = express.Router();

const app = express();

// loading .env file

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

const addMiddlewares = () => {
  app.use(express.json());
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
};
const addRoutes = () => {
  app.use("/api/musicians", musicianRoute);
  app.use("/api", userRoute);
};

const startServer = () => {
  const port = process.env.PORT || 5001;
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

// router.get("/test", (req, res) => {
//   res.json({
//     message: "this is my test route",
//   });
// });
