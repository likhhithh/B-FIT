import { FOODS } from "../data/foods";

const round1 = (n) => Math.round(n * 10) / 10;

export function computeNutrition(food, quantity, unit) {
  // unit: 'g' or 'serving'
  const grams =
    unit === "g"
      ? Number(quantity || 0)
      : Number(quantity || 0) * (food?.serving?.grams || 0);
  if (!food || !grams || grams <= 0) {
    return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, grams: 0 };
  }
  const factor = grams / 100;
  const { calories, protein, carbs, fat, fiber } = food.per100g;
  return {
    calories: Math.round(calories * factor),
    protein: round1(protein * factor),
    carbs: round1(carbs * factor),
    fat: round1(fat * factor),
    fiber: round1(fiber * factor),
    grams,
  };
}

export function searchFoods(query, limit = 10) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  const scored = FOODS.map((f) => {
    const hay = `${f.name} ${f.brand || ""} ${(f.keywords || []).join(
      " "
    )}`.toLowerCase();
    const idx = hay.indexOf(q);
    const score = idx === -1 ? Infinity : idx;
    return { score, item: f };
  }).filter((s) => s.score !== Infinity);
  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, limit).map((s) => s.item);
}
