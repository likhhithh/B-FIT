import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../logger.js";

export async function connectDB() {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(env.MONGO_URI, {
      dbName: "bfit",
    });
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error({ err }, "MongoDB connection error");
    process.exit(1);
  }
}
