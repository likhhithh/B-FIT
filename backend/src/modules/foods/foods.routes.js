import { Router } from "express";
import { authGuard } from "../../middlewares/auth.js";
import { searchFoods } from "./foods.controller.js";

const router = Router();
router.get("/", authGuard, searchFoods);
export default router;
