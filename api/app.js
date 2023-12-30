import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import hotelRoute from "./routes/hotelRoute.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import roomRoute from "./routes/roomRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

//middleware
app.get("/", (req, res) => {
  res.send("Hello, the world");
});

//middleware routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/hotel", hotelRoute);
app.use("/room", roomRoute);
app.use("/transaction", transactionRoute);
//Allow all request
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected sucessfully");
  } catch (err) {
    throw err;
  }
};
app.listen(8800, () => {
  connect();
  console.log("Connected to server");
});
