import axios from "axios";

const NIX_APP_ID = process.env.NUTRITIONIX_APP_ID;
const NIX_APP_KEY = process.env.NUTRITIONIX_APP_KEY;

export async function searchNutritionix(query) {
  if (!NIX_APP_ID || !NIX_APP_KEY) {
    return { items: [], note: "Nutritionix not configured" };
  }
  const url = "https://trackapi.nutritionix.com/v2/search/instant";
  const { data } = await axios.get(url, {
    params: { query },
    headers: {
      "x-app-id": NIX_APP_ID,
      "x-app-key": NIX_APP_KEY,
    },
  });
  // Map common foods to a simplified structure (per serving estimate)
  const items = (data?.common || []).map((i) => ({
    id: i.tag_id || i.food_name,
    name: i.food_name,
    // Real nutrient breakdown requires /natural/nutrients with qty/serving.
    // Here we provide a minimal object for autocomplete.
    nutrientsPer100g: null,
    servings: [
      {
        label: i.serving_unit || "1 serving",
        grams: i.serving_weight_grams || 100,
      },
    ],
  }));
  return { items };
}
