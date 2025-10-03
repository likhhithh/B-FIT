import mongoose from "mongoose";

const NutrientsSchema = new mongoose.Schema(
  {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
  },
  { _id: false }
);

const ServingSchema = new mongoose.Schema(
  {
    label: String,
    grams: Number,
  },
  { _id: false }
);

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: "text" },
    slug: { type: String, unique: true, sparse: true },
    nutrientsPer100g: { type: NutrientsSchema, required: true },
    servings: [ServingSchema],
    source: { type: String, default: "local" }, // local|usda|nutritionix
  },
  { timestamps: true }
);

FoodSchema.index({ name: "text" });
const Food = mongoose.model("Food", FoodSchema);
export default Food;
