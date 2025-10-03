// Simple in-app food database (macros per 100 g). You can replace with API later.
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
      { label: "1/2 cup", grams: 79 },
    ],
  },
  {
    id: "rice-brown-cooked",
    name: "Rice, brown (cooked)",
    nutrientsPer100g: {
      calories: 123,
      protein: 2.6,
      carbs: 25.6,
      fat: 1.0,
      fiber: 1.8,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 cup", grams: 195 },
      { label: "1/2 cup", grams: 98 },
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
      { label: "1/2 piece", grams: 60 },
    ],
  },
  {
    id: "egg-large",
    name: "Egg, whole (large)",
    nutrientsPer100g: {
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11,
      fiber: 0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 egg", grams: 50 },
      { label: "2 eggs", grams: 100 },
    ],
  },
  {
    id: "milk-2pct",
    name: "Milk 2%",
    nutrientsPer100g: {
      calories: 50,
      protein: 3.4,
      carbs: 4.8,
      fat: 1.9,
      fiber: 0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 cup (240 ml)", grams: 240 },
    ],
  },
  {
    id: "yogurt-greek-plain",
    name: "Greek Yogurt (plain)",
    nutrientsPer100g: {
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      fiber: 0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 cup", grams: 245 },
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
    id: "apple",
    name: "Apple",
    nutrientsPer100g: {
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fat: 0.2,
      fiber: 2.4,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 medium", grams: 182 },
    ],
  },
  {
    id: "bread-whole-wheat",
    name: "Bread (whole wheat)",
    nutrientsPer100g: {
      calories: 247,
      protein: 13,
      carbs: 41,
      fat: 4.2,
      fiber: 7,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 slice", grams: 28 },
      { label: "2 slices", grams: 56 },
    ],
  },
  {
    id: "peanut-butter",
    name: "Peanut butter",
    nutrientsPer100g: {
      calories: 588,
      protein: 25,
      carbs: 20,
      fat: 50,
      fiber: 6,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 tbsp", grams: 16 },
      { label: "2 tbsp", grams: 32 },
    ],
  },
  {
    id: "almonds",
    name: "Almonds",
    nutrientsPer100g: {
      calories: 579,
      protein: 21.2,
      carbs: 21.7,
      fat: 49.9,
      fiber: 12.5,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "10 almonds", grams: 12 },
      { label: "1/4 cup", grams: 35 },
    ],
  },
  {
    id: "avocado",
    name: "Avocado",
    nutrientsPer100g: {
      calories: 160,
      protein: 2,
      carbs: 8.5,
      fat: 14.7,
      fiber: 6.7,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1/2 medium", grams: 100 },
    ],
  },
  {
    id: "broccoli-cooked",
    name: "Broccoli (cooked)",
    nutrientsPer100g: {
      calories: 55,
      protein: 3.7,
      carbs: 11.2,
      fat: 0.6,
      fiber: 3.3,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 cup chopped", grams: 156 },
    ],
  },
  {
    id: "sweet-potato-baked",
    name: "Sweet potato (baked)",
    nutrientsPer100g: {
      calories: 90,
      protein: 2,
      carbs: 21,
      fat: 0.1,
      fiber: 3.3,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 medium", grams: 130 },
    ],
  },
  {
    id: "olive-oil",
    name: "Olive oil",
    nutrientsPer100g: {
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      fiber: 0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 tsp", grams: 4.5 },
      { label: "1 tbsp", grams: 13.5 },
    ],
  },
  {
    id: "whey-isolate",
    name: "Whey protein (isolate)",
    nutrientsPer100g: {
      calories: 370,
      protein: 90,
      carbs: 5,
      fat: 2,
      fiber: 0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 scoop", grams: 30 },
    ],
  },
  {
    id: "lentils-cooked",
    name: "Lentils (cooked)",
    nutrientsPer100g: {
      calories: 116,
      protein: 9,
      carbs: 20,
      fat: 0.4,
      fiber: 7.9,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 cup", grams: 198 },
      { label: "1/2 cup", grams: 99 },
    ],
  },
  {
    id: "chickpeas-cooked",
    name: "Chickpeas (cooked)",
    nutrientsPer100g: {
      calories: 164,
      protein: 9,
      carbs: 27.4,
      fat: 2.6,
      fiber: 7.6,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 cup", grams: 164 },
      { label: "1/2 cup", grams: 82 },
    ],
  },
  {
    id: "paneer",
    name: "Paneer",
    nutrientsPer100g: {
      calories: 265,
      protein: 18,
      carbs: 6.1,
      fat: 20,
      fiber: 0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 piece", grams: 50 },
    ],
  },
  {
    id: "tofu-firm",
    name: "Tofu (firm)",
    nutrientsPer100g: {
      calories: 76,
      protein: 8,
      carbs: 1.9,
      fat: 4.8,
      fiber: 0.3,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1/2 block", grams: 170 },
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
      { label: "2 rotis", grams: 80 },
    ],
  },
  {
    id: "idli",
    name: "Idli",
    nutrientsPer100g: {
      calories: 168,
      protein: 5.7,
      carbs: 30.5,
      fat: 2.3,
      fiber: 2.0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 idli", grams: 35 },
      { label: "2 idlis", grams: 70 },
    ],
  },
  {
    id: "dosa-plain",
    name: "Dosa (plain)",
    nutrientsPer100g: {
      calories: 168,
      protein: 4.9,
      carbs: 30.6,
      fat: 3.7,
      fiber: 1.0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 dosa", grams: 120 },
    ],
  },
  {
    id: "sambar",
    name: "Sambar",
    nutrientsPer100g: {
      calories: 65,
      protein: 3.2,
      carbs: 9.5,
      fat: 1.9,
      fiber: 2.0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 cup", grams: 200 },
    ],
  },
  {
    id: "curd-dahi",
    name: "Curd (Dahi, plain)",
    nutrientsPer100g: {
      calories: 61,
      protein: 3.5,
      carbs: 4.7,
      fat: 3.3,
      fiber: 0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 cup", grams: 245 },
    ],
  },
  {
    id: "salmon-cooked",
    name: "Salmon (cooked)",
    nutrientsPer100g: {
      calories: 206,
      protein: 22.1,
      carbs: 0,
      fat: 12.3,
      fiber: 0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 fillet", grams: 154 },
    ],
  },
  {
    id: "cheese-cheddar",
    name: "Cheddar cheese",
    nutrientsPer100g: {
      calories: 403,
      protein: 25,
      carbs: 1.3,
      fat: 33,
      fiber: 0,
    },
    servings: [
      { label: "100 g", grams: 100 },
      { label: "1 slice", grams: 28 },
    ],
  },
];
