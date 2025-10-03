import Exercise from "./exercise.model.js";
import { EXERCISES } from "../../data/exercises.js";

export async function searchExercisesService(q = "", limit = 20) {
  const query = (q || "").trim().toLowerCase();
  const hasAny = await Exercise.exists({});
  if (hasAny) {
    const db = await Exercise.find(query ? { $text: { $search: query } } : {})
      .limit(limit)
      .lean();
    return db;
  }
  const local = query
    ? EXERCISES.filter((e) => e.name.toLowerCase().includes(query))
    : EXERCISES;
  return local.slice(0, limit);
}
