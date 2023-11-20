import express from "express";
import cors from "cors";
import colors from "colors";
// import router from "./routes/testRoute.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const app = express();

const port = process.env.PORT || 5001;

// loading .env file

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const DBConnection = async () => {
  console.log("process.env.DB :>> ", process.env.DB);
  try {
    await mongoose.connect(process.env.DB);
    console.log("connection to MONGODB established".yellow);
  } catch (error) {
    console.log("error connection to MONGODB:>> ".red, error);
  }
};

app.use("/api", router);
router.get("/test", (req, res) => {
  res.json({
    message: "this is my test route",
  });
});

DBConnection();

app.listen(port, () => {
  console.log("Server is running on".rainbow + port + "port".bgGreen);
  // console.log("hello :>> ");
});
console.log("process.env.MONGODB :>> ", process.env.MONGODB);
