import mongoose from "mongoose";

const GoalsSchema = new mongoose.Schema(
  {
    calories: { type: Number, default: 2200 },
    waterMl: { type: Number, default: 3000 },
    protein: { type: Number, default: 130 },
    carbs: { type: Number, default: 280 },
    fat: { type: Number, default: 70 },
    burnCalories: { type: Number, default: 400 },
    stepsGoal: { type: Number, default: 8000 },
    distanceKmGoal: { type: Number, default: 5 },
  },
  { _id: false }
);

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "" },
    sex: {
      type: String,
      enum: ["male", "female", "unspecified"],
      default: "unspecified",
    },
    age: { type: Number, default: 25 },
    heightCm: { type: Number, default: 170 },
    weightKg: { type: Number, default: 70 },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very_active"],
      default: "moderate",
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    profile: { type: ProfileSchema, default: () => ({}) },
    units: {
      water: { type: String, enum: ["ml", "oz"], default: "ml" },
      weight: { type: String, enum: ["kg", "lb"], default: "kg" },
    },
    goals: { type: GoalsSchema, default: () => ({}) },

    // Streaks/badges
    streakCount: { type: Number, default: 0 },
    lastLoginDate: { type: String, default: null }, // YYYY-MM-DD
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", UserSchema);
export default User;
