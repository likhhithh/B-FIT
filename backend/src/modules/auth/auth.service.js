import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./user.model.js";
import { env } from "../../core/config/env.js";
import { BadRequest, Unauthorized } from "../../core/httpErrors.js";

export async function registerUser({ email, password, name }) {
  const existing = await User.findOne({ email });
  if (existing) throw BadRequest("Email already in use");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, name });
  return { user: user.toJSON() };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw Unauthorized("Invalid credentials");
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw Unauthorized("Invalid credentials");
  const token = signToken(user._id.toString());
  return { user: user.toJSON(), token };
}

export function signToken(sub) {
  return jwt.sign({ sub }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}
