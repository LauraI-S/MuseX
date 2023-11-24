import express from "express";
import cors from "cors";
import colors from "colors";
<<<<<<< HEAD
<<<<<<< HEAD
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import musicianRoute from "../server/routes/musicianRoute.js";
import userRoute from "../server/routes/userRoute.js";
=======
// import router from "./routes/testRoute.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
>>>>>>> fac4c93cbd084f5592abeadbf449615e8a9594ea
=======
// import router from "./routes/testRoute.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
>>>>>>> fac4c93cbd084f5592abeadbf449615e8a9594ea

dotenv.config();
const router = express.Router();

const app = express();

<<<<<<< HEAD
<<<<<<< HEAD
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
  app.use("/api", musicianRoute);
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
=======
=======
>>>>>>> fac4c93cbd084f5592abeadbf449615e8a9594ea
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
<<<<<<< HEAD
>>>>>>> fac4c93cbd084f5592abeadbf449615e8a9594ea
=======
>>>>>>> fac4c93cbd084f5592abeadbf449615e8a9594ea
