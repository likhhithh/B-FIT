import jwt from "jsonwebtoken";
import { env } from "../core/config/env.js";
import { Unauthorized } from "../core/httpErrors.js";
import User from "../modules/auth/user.model.js";

export async function authGuard(req, _res, next) {
  try {
    const header = req.headers.authorization || "";
    const token =
      (header.startsWith("Bearer ") && header.slice(7)) || req.cookies?.token;

    if (!token) throw Unauthorized("No token provided");

    const payload = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(payload.sub).lean();
    if (!user) throw Unauthorized("User not found");

    req.user = { id: user._id.toString(), email: user.email };
    next();
  } catch (err) {
    next(Unauthorized("Invalid or expired token"));
  }
}
