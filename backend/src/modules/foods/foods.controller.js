import { FOODS } from "../../data/foods.js";

export async function searchFoods(req, res) {
  const q = (req.query.q || "").toString().toLowerCase().trim();
  const limit = Math.min(50, Number(req.query.limit || 20));
  let items = FOODS;
  if (q) {
    items = items.filter((f) => f.name.toLowerCase().includes(q));
  }
  res.json({ success: true, items: items.slice(0, limit) });
}
