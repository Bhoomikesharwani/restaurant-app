import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import ReservationRouter from './routes/reservationRoute.js';

import { errorMiddleware } from "./error/error.js";
dotenv.config();

const app = express();

// middlewares
app.use(cors({
    origin:  [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["POST"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/v1/reservation', ReservationRouter);
app.use(errorMiddleware);
/* =======================
   ROUTES / LINKS
======================= */

// Home link
app.get("/", (req, res) => {
  res.send("Food App Backend Running 🍕🔥");
});

// Health check link
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy 💪",
  });
});

// Test API link
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API working perfectly 🚀",
  });
});

/* =======================
   DATABASE
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🚀`);
});