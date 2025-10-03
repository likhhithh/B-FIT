import { z } from "zod";

export const DateParam = {
  params: z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }),
};

export const AddWaterSchema = {
  ...DateParam,
  body: z.object({ amount: z.number().int().positive() }),
};

export const AddFoodSchema = {
  ...DateParam,
  body: z.object({
    name: z.string().min(1),
    quantity: z.string().optional(),
    grams: z.number().positive().optional(),
    calories: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    carbs: z.number().nonnegative(),
    fat: z.number().nonnegative(),
    fiber: z.number().nonnegative().optional(),
  }),
};

export const AddWorkoutSchema = {
  ...DateParam,
  body: z.object({
    type: z.string().min(1),
    durationMin: z.number().int().positive().optional(),
    calories: z.number().nonnegative(),
  }),
};
