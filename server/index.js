import express from "express";
import cors from "cors";
import router from "./routes/testRoute.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

const router = express.Router();

// loading .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const port = process.env.PORT || 5001;

const DBConnection = async () => {
  console.log("process.env.DB :>> ", process.env.DB);
  try {
    await mongoose.connect(process.env.DB);
    console.log("connection to MONGODB established");
  } catch (error) {
    console.log("error :>> ", object);
  }
};
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

app.use("/api", router);
router.get("/test", (req, res) => {
  res.json({
    message: "test route",
  });
});
