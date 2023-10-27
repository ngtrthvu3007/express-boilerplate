import express from "express";
import dotenv from "dotenv";
import { defaultErrorHandler } from "./middlewares/defaultErrorHandler";
import { databaseConnection } from "./services/database.js";
import userRouter from "./routers/user.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

databaseConnection();
app.use(express.json());
// import and define rounters here
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log("Server is ready on port: ", port);
});

app.use(defaultErrorHandler);
