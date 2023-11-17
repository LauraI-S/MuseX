import express from "express";
import cors from "cors";
import router from "./routes/testRoute.js";

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

app.use("/myApi", router);
