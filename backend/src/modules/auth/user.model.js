import mongoose from "mongoose";

const GoalsSchema = new mongoose.Schema(
  {
    calories: { type: Number, default: 2200 },
    waterMl: { type: Number, default: 3000 },
    protein: { type: Number, default: 130 },
    carbs: { type: Number, default: 280 },
    fat: { type: Number, default: 70 },
    burnCalories: { type: Number, default: 400 },
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
    name: { type: String, trim: true },
    profile: {
      weightKg: { type: Number, default: 70 },
    },
    units: {
      water: { type: String, enum: ["ml", "oz"], default: "ml" },
      weight: { type: String, enum: ["kg", "lb"], default: "kg" },
    },
    goals: { type: GoalsSchema, default: () => ({}) },
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
