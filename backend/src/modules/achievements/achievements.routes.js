import { Router } from "express";
import { authGuard } from "../../middlewares/auth.js";
import { getTodayAchievements } from "./achievements.controller.js";

const router = Router();
router.use(authGuard);

router.get("/today", getTodayAchievements);

export default router;
