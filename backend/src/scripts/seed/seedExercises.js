import mongoose from "mongoose";
import { connectDB } from "../../core/config/db.js";
import { logger } from "../../core/logger.js";
import Exercise from "../../modules/exercises/exercise.model.js";
import { EXERCISES } from "../../data/exercises.js";

async function run() {
  await connectDB();
  logger.info("Seeding exercises...");
  for (const e of EXERCISES) {
    await Exercise.updateOne({ name: e.name }, { $set: e }, { upsert: true });
  }
  logger.info("Exercises seeded.");
  await mongoose.disconnect();
}
run().catch((err) => {
  logger.error(err);
  process.exit(1);
});
