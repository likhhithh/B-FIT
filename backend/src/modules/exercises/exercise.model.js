import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: "text" },
    MET: { type: Number, required: true },
    slug: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

ExerciseSchema.index({ name: "text" });
const Exercise = mongoose.model("Exercise", ExerciseSchema);
export default Exercise;
