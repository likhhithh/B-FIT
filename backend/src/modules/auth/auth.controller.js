import { registerUser, login } from "./auth.service.js";
import User from "./user.model.js";
import { env } from "../../core/config/env.js";

const cookieOpts = {
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

function formatDateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function dayDiff(a, b) {
  const A = new Date(`${a}T00:00:00`);
  const B = new Date(`${b}T00:00:00`);
  return Math.round((B - A) / (1000 * 60 * 60 * 24));
}

export async function registerController(req, res, next) {
  try {
    const { user } = await registerUser(req.body);
    // Do NOT log in on register. Client should login next.
    res.status(201).json({
      success: true,
      message: "Registered successfully. Please log in.",
      user: { email: user.email, name: user.name || "" },
    });
  } catch (err) {
    next(err);
  }
}

export async function loginController(req, res, next) {
  try {
    const { user, token } = await login(req.body);

    // Update streaks
    const today = formatDateKey(new Date());
    const dbUser = await User.findById(user._id);
    if (dbUser) {
      let count = dbUser.streakCount || 0;
      const last = dbUser.lastLoginDate;
      if (!last) {
        count = 1;
      } else {
        const diff = dayDiff(last, today);
        if (diff === 0) {
          // same day, keep
        } else if (diff === 1) {
          count += 1;
        } else if (diff > 1) {
          count = 1;
        }
      }
      dbUser.streakCount = count;
      dbUser.lastLoginDate = today;
      await dbUser.save();
      user.streakCount = count;
      user.lastLoginDate = today;
    }

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
