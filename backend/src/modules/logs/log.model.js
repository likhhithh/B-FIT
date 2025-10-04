import mongoose from "mongoose";

const FoodEntrySchema = new mongoose.Schema(
  {
    name: String,
    quantity: String, // label like "1 cup" or "100 g"
    grams: Number,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const WorkoutEntrySchema = new mongoose.Schema(
  {
    type: String,
    durationMin: Number,
    calories: Number,
    sets: Number,
    reps: Number,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const LogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    date: { type: String, required: true }, // YYYY-MM-DD
    waterMl: { type: Number, default: 0 },
    foods: [FoodEntrySchema],
    workouts: [WorkoutEntrySchema],

    // New
    steps: { type: Number, default: 0 },
    distanceKm: { type: Number, default: 0 },
  },
  { timestamps: true }
);

LogSchema.index({ user: 1, date: 1 }, { unique: true });

const Log = mongoose.model("Log", LogSchema);
export default Log;
