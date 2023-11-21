import express from "express";
import cors from "cors";
import colors from "colors";
// import router from "./routes/testRoute.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import musicianRoute from "../server/routes/musicianRoute.js";

dotenv.config();
const router = express.Router();

const app = express();

const port = process.env.PORT || 5001;

// loading .env file

const DBConnection = async () => {
  console.log("process.env.DB :>> ", process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connection to MONGODB established".bgGreen);
  } catch (error) {
    console.log("error connection to MONGODB:>> ".red, error);
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
app.use("/api", router);
app.use("/api", musicianRoute);
router.get("/test", (req, res) => {
  res.json({
    message: "this is my test route",
  });
});

app.listen(port, () => {
  console.log("Server is running on ".rainbow + port + " port".rainbow);
  // console.log("hello :>> ");
});

//!IIFE  (Immediately Invoked Function Expression)

const serverController = () => {};

(async function controller() {
  await DBConnection();
  addMiddlewares();
  addRoutes();
  startServer();
})();
