import User from "../auth/user.model.js";

export async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
}

export async function updateMe(req, res, next) {
  try {
    const allowed = ["name", "profile", "units"];
    const update = {};
    for (const k of allowed) {
      if (req.body[k] !== undefined) update[k] = req.body[k];
    }
    const user = await User.findByIdAndUpdate(req.user.id, update, {
      new: true,
    });
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
}
