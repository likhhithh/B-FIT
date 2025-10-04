import User from "../auth/user.model.js";

export async function getGoals(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select("goals");
    res.json({ success: true, goals: user.goals });
  } catch (err) {
    next(err);
  }
}

export async function updateGoals(req, res, next) {
  try {
    const allowed = [
      "calories",
      "waterMl",
      "protein",
      "carbs",
      "fat",
      "burnCalories",
      "stepsGoal",
      "distanceKmGoal",
    ];
    const patch = {};
    for (const k of allowed)
      if (req.body[k] !== undefined) patch[`goals.${k}`] = req.body[k];
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: patch },
      { new: true }
    ).select("goals");
    res.json({ success: true, goals: user.goals });
  } catch (err) {
    next(err);
  }
}
