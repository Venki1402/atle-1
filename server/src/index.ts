import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contestRoutes from "./routes/contestRoutes";
import cron from "node-cron";
import { syncContests } from "./services/contestService";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/contest-tracker";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contests", contestRoutes);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

cron.schedule("0 */6 * * *", async () => {
  console.log("Running scheduled contest sync...");
  await syncContests();
  console.log("Scheduled sync completed");
});
