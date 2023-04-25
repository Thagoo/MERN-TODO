import express from "express";
import mongoose from "mongoose";
import cookies from "cookie-parser";
import dotenv from "dotenv";
import todoRoute from "./api/routes/todo.js";
import userRoute from "./api/routes/user.js";
import authRoute from "./api/routes/auth.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookies());
//mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/mern-todo")
  .then((response) => {
    console.log("mongodb connection successfull");
  })
  .catch((error) => {
    console.log("mongodb connection unsuccessfull", error);
  });

mongoose.connection.on("disconnected" | "error", (err) => {
  console.log(err);
});

app.use("/api/todo", todoRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(8000, () => {
  console.log("Backend Server started at port 8000");
});
