import { EXERCISES } from "../../data/exercises.js";

// kcal = MET * 3.5 * weightKg / 200 * minutes
function estimateCalories(MET, weightKg, minutes) {
  if (!MET || !weightKg || !minutes) return null;
  return Math.round(((MET * 3.5 * weightKg) / 200) * minutes);
}

export async function searchExercises(req, res) {
  const q = (req.query.q || "").toString().toLowerCase().trim();
  const limit = Math.min(50, Number(req.query.limit || 20));
  const weightKg = Number(req.query.weightKg || 0) || null;
  const minutes = Number(req.query.minutes || 0) || null;

  let items = EXERCISES;
  if (q) items = items.filter((e) => e.name.toLowerCase().includes(q));

  const mapped = items.slice(0, limit).map((e) => ({
    ...e,
    estCalories: estimateCalories(e.MET, weightKg, minutes),
  }));

  res.json({ success: true, items: mapped });
}
