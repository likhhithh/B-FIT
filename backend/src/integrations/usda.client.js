import axios from "axios";

const USDA_KEY = process.env.USDA_API_KEY;

export async function searchUSDA(query, pageSize = 20) {
  if (!USDA_KEY) {
    return { items: [], note: "USDA not configured" };
  }
  const url = "https://api.nal.usda.gov/fdc/v1/foods/search";
  const { data } = await axios.get(url, {
    params: { api_key: USDA_KEY, query, pageSize },
  });
  const items = (data?.foods || []).map((f) => ({
    id: f.fdcId,
    name: f.description,
    nutrientsPer100g: null, // Detailed nutrients come from another endpoint
    servings: [{ label: "100 g", grams: 100 }],
  }));
  return { items };
}
