import { Router } from "express";
import { z } from "zod";
import { authGuard } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import {
  AddFoodSchema,
  AddWaterSchema,
  AddWorkoutSchema,
  DateParam,
} from "./logs.schema.js";
import {
  addFood,
  addWater,
  addWorkout,
  getLog,
  removeFood,
  removeWorkout,
} from "./logs.controller.js";

const router = Router();
router.use(authGuard);

const EntryParams = {
  params: DateParam.params.extend({ entryId: z.string() }),
};

router.get("/:date", validate(DateParam), getLog);
router.post("/:date/water", validate(AddWaterSchema), addWater);
router.post("/:date/foods", validate(AddFoodSchema), addFood);
router.delete("/:date/foods/:entryId", validate(EntryParams), removeFood);
router.post("/:date/workouts", validate(AddWorkoutSchema), addWorkout);
router.delete("/:date/workouts/:entryId", validate(EntryParams), removeWorkout);

export default router;
