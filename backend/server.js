import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import ReservationRouter from "./routes/reservationRoute.js";
import { errorMiddleware } from "./error/error.js";

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", ReservationRouter);

// Home Route
app.get("/", (req, res) => {
  res.send("Food App Backend Running 🚀");
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is Healthy ✅",
  });
});

// Test API
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API Working 🚀",
  });
});

// Error Middleware
app.use(errorMiddleware);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error ❌");
    console.log(err);
  });