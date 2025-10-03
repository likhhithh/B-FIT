import { Router } from "express";
import { authGuard } from "../../middlewares/auth.js";
import { getGoals, updateGoals } from "./goals.controller.js";

const router = Router();
router.get("/", authGuard, getGoals);
router.put("/", authGuard, updateGoals);
export default router;
