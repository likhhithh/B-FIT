// Minimal sample foods (per 100g). Expand or replace with real DB/API.
export const FOODS = [
  {
    id: "oats-dry",
    name: "Oats (dry)",
    nutrientsPer100g: {
      calories: 389,
      protein: 16.9,
      carbs: 66.3,
      fat: 6.9,
      fiber: 10.6,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 cup (dry)", grams: 90 },
      { label: "1/2 cup (dry)", grams: 45 },
    ],
  },
  {
    id: "chicken-breast-cooked",
    name: "Chicken breast (cooked)",
    nutrientsPer100g: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 piece (medium)", grams: 120 },
    ],
  },
  {
    id: "rice-white-cooked",
    name: "Rice, white (cooked)",
    nutrientsPer100g: {
      calories: 130,
      protein: 2.4,
      carbs: 28.2,
      fat: 0.3,
      fiber: 0.4,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 cup", grams: 158 },
    ],
  },
  {
    id: "banana",
    name: "Banana",
    nutrientsPer100g: {
      calories: 89,
      protein: 1.1,
      carbs: 22.8,
      fat: 0.3,
      fiber: 2.6,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 medium", grams: 118 },
    ],
  },
  {
    id: "roti-chapati",
    name: "Roti/Chapati (atta)",
    nutrientsPer100g: {
      calories: 297,
      protein: 9.8,
      carbs: 54.5,
      fat: 3.2,
      fiber: 10.8,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 roti", grams: 40 },
    ],
  },
];
