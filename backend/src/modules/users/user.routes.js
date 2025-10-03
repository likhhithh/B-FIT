import { Router } from "express";
import { authGuard } from "../../middlewares/auth.js";
import { getMe, updateMe } from "./user.controller.js";

const router = Router();
router.get("/me", authGuard, getMe);
router.patch("/me", authGuard, updateMe);

export default router;
