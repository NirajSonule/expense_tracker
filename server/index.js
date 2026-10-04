import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";

// Initializtion
dotenv.config();
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    Credential: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on PORT ${process.env.PORT || 3000}`);
});
