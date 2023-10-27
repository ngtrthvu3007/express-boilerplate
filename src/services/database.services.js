import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const url = "the string for connecting to mongodb database, you can find it in cluster database from cloud mongodb";

export const databaseConnection = async () => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("Connect Db success!");
    })
    .catch((error) => {
      console.log("Error in Database Service: ", error);
    });
};
