import { register, login } from "./auth.service.js";
import User from "./user.model.js";
import { env } from "../../core/config/env.js";

const cookieOpts = {
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  path: "/",
};

export async function registerController(req, res, next) {
  try {
    const { user, token } = await register(req.body);
    res.cookie("token", token, cookieOpts);
    res.status(201).json({ success: true, user, token });
  } catch (err) {
    next(err);
  }
}

export async function loginController(req, res, next) {
  try {
    const { user, token } = await login(req.body);
    res.cookie("token", token, cookieOpts);
    res.json({ success: true, user, token });
  } catch (err) {
    next(err);
  }
}

export async function logoutController(_req, res) {
  res.clearCookie("token", { ...cookieOpts, maxAge: 0 });
  res.json({ success: true, message: "Logged out" });
}

export async function meController(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
}
