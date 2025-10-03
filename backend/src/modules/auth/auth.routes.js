import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { LoginSchema, RegisterSchema } from "./auth.schema.js";
import {
  loginController,
  meController,
  registerController,
  logoutController,
} from "./auth.controller.js";
import { authGuard } from "../../middlewares/auth.js";

const router = Router();

router.post("/register", validate(RegisterSchema), registerController);
router.post("/login", validate(LoginSchema), loginController);
router.post("/logout", logoutController);
router.get("/me", authGuard, meController);

export default router;
