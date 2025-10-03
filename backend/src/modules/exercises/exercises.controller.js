import { EXERCISES } from "../../data/exercises.js";

export async function searchExercises(req, res) {
  const q = (req.query.q || "").toString().toLowerCase().trim();
  const limit = Math.min(50, Number(req.query.limit || 20));
  let items = EXERCISES;
  if (q) {
    items = items.filter((e) => e.name.toLowerCase().includes(q));
  }
  res.json({ success: true, items: items.slice(0, limit) });
}
