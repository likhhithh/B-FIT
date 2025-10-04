import { z } from "zod";

// YYYY-MM-DD
export const DateParam = {
  params: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
};

// Accept any non-zero number (supports + for add, - for subtract)
export const AddWaterSchema = {
  ...DateParam,
  body: z.object({
    amount: z
      .number({ invalid_type_error: "amount must be a number" })
      .finite()
      .refine((n) => n !== 0, { message: "amount cannot be 0" }),
  }),
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
    sets: z.number().int().nonnegative().optional(),
    reps: z.number().int().nonnegative().optional(),
  }),
};

// At least one of steps or distanceKm must be provided
export const AddStepsSchema = {
  ...DateParam,
  body: z
    .object({
      steps: z.number().int().nonnegative().optional(),
      distanceKm: z.number().nonnegative().optional(),
    })
    .refine((o) => o.steps !== undefined || o.distanceKm !== undefined, {
      message: "Provide steps or distanceKm",
      path: ["steps"],
    }),
};

// Absolute set for the day
export const SetStepsSchema = {
  ...DateParam,
  body: z.object({
    steps: z.number().int().nonnegative().default(0),
    distanceKm: z.number().nonnegative().default(0),
  }),
};
