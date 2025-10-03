import Food from "./food.model.js";
import { FOODS } from "../../data/foods.js";

export async function searchFoodsService(q = "", limit = 20) {
  const query = (q || "").trim().toLowerCase();
  // Try DB first
  const hasAny = await Food.exists({});
  if (hasAny) {
    const dbItems = await Food.find(query ? { $text: { $search: query } } : {})
      .limit(limit)
      .lean();
    return dbItems;
  }
  // Fallback to local array
  const local = query
    ? FOODS.filter((f) => f.name.toLowerCase().includes(query))
    : FOODS;
  return local.slice(0, limit);
}
