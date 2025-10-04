import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import foodRoutes from "../modules/foods/foods.routes.js";
import exerciseRoutes from "../modules/exercises/exercises.routes.js";
import logRoutes from "../modules/logs/logs.routes.js";
import goalsRoutes from "../modules/goals/goals.routes.js";
import achievementsRoutes from "../modules/achievements/achievements.routes.js";

const router = Router();

router.get("/health", (_req, res) => res.json({ success: true, status: "ok" }));

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/foods", foodRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/logs", logRoutes);
router.use("/goals", goalsRoutes);
router.use("/achievements", achievementsRoutes);

export default router;
