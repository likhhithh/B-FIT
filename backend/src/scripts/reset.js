import mongoose from "mongoose";
import { connectDB } from "../core/config/db.js";
import { logger } from "../core/logger.js";

async function run() {
  await connectDB();
  logger.warn("Dropping database...");
  await mongoose.connection.dropDatabase();
  logger.info("Database dropped.");
  await mongoose.disconnect();
}
run().catch((err) => {
  logger.error(err);
  process.exit(1);
});
