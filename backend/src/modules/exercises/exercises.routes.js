import { Router } from "express";
import { authGuard } from "../../middlewares/auth.js";
import { searchExercises } from "./exercises.controller.js";

const router = Router();
router.get("/", authGuard, searchExercises);
export default router;
