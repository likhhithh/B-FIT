import { z } from "zod";

export const UpdateGoalsSchema = {
  body: z.object({
    calories: z.number().int().positive().optional(),
    waterMl: z.number().int().positive().optional(),
    protein: z.number().nonnegative().optional(),
    carbs: z.number().nonnegative().optional(),
    fat: z.number().nonnegative().optional(),
    burnCalories: z.number().nonnegative().optional(),
  }),
};
