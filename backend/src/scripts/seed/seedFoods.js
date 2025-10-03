import mongoose from "mongoose";
import { connectDB } from "../../core/config/db.js";
import { logger } from "../../core/logger.js";
import Food from "../../modules/foods/food.model.js";
import { FOODS } from "../../data/foods.js";

async function run() {
  await connectDB();
  logger.info("Seeding foods...");
  for (const f of FOODS) {
    await Food.updateOne(
      { name: f.name },
      { $set: { ...f, source: "seed" } },
      { upsert: true }
    );
  }
  logger.info("Foods seeded.");
  await mongoose.disconnect();
}
run().catch((err) => {
  logger.error(err);
  process.exit(1);
});
