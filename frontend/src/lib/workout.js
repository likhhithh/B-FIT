import { EXERCISES } from "../data/exercises";

export function caloriesBurned(met, weightKg, minutes) {
  const w = Number(weightKg || 0);
  const m = Number(minutes || 0);
  if (!met || !w || !m) return 0;
  // kcal = MET * 3.5 * kg / 200 * minutes
  return Math.round(((met * 3.5 * w) / 200) * m);
}

export function searchExercises(query, limit = 12) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  const scored = EXERCISES.map((e) => {
    const idx = e.name.toLowerCase().indexOf(q);
    const score = idx === -1 ? Infinity : idx;
    return { score, item: e };
  }).filter((s) => s.score !== Infinity);
  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, limit).map((s) => s.item);
}
