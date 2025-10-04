import Log from "../logs/log.model.js";
import User from "../auth/user.model.js";

function dateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function computeDailyAchievements({ log, goals }) {
  const foods = log?.foods || [];
  const workouts = log?.workouts || [];
  const waterMl = log?.waterMl || 0;
  const steps = log?.steps || 0;

  const consumed = foods.reduce((s, f) => s + (f.calories || 0), 0);
  const burned = workouts.reduce((s, w) => s + (w.calories || 0), 0);
  const net = consumed - burned;
  const protein = foods.reduce((s, f) => s + (f.protein || 0), 0);

  const hitWater = goals?.waterMl ? waterMl >= goals.waterMl : false;
  const hitProtein = goals?.protein ? protein >= goals.protein : false;
  const hitBurn = goals?.burnCalories ? burned >= goals.burnCalories : false;
  const stepsGoal = goals?.stepsGoal || 8000;
  const hitSteps = steps >= stepsGoal;
  const hitCalories = goals?.calories
    ? Math.abs(net - goals.calories) <= goals.calories * 0.1
    : false;

  const list = [
    { key: "water", label: "Hydration goal", done: !!hitWater },
    {
      key: "calories",
      label: "Calories on target (±10%)",
      done: !!hitCalories,
    },
    { key: "protein", label: "Protein target", done: !!hitProtein },
    { key: "steps", label: `Steps goal (${stepsGoal})`, done: !!hitSteps },
    { key: "burn", label: "Workout burn goal", done: !!hitBurn },
  ];

  // Grading
  const hits = list.filter((x) => x.done).length;
  let grade = "C";
  let message = "Nice try today—every step counts.";
  if (hits >= 3) {
    grade = "A";
    message = "Crushed it today! Your consistency is building momentum.";
  } else if (hits === 2) {
    grade = "B";
    message = "Solid work! You’re close—tomorrow, snag one more goal.";
  }

  return {
    list,
    grade,
    message,
    summary: { consumed, burned, net, protein, waterMl, steps },
  };
}

export async function getTodayAchievements(req, res, next) {
  try {
    const d = req.query.date || dateKey(new Date());
    const user = await User.findById(req.user.id);
    const log = (await Log.findOne({ user: req.user.id, date: d })) || {
      foods: [],
      workouts: [],
      waterMl: 0,
      steps: 0,
    };

    const data = computeDailyAchievements({ log, goals: user.goals });
    res.json({
      success: true,
      date: d,
      ...data,
      streak: { count: user.streakCount, last: user.lastLoginDate },
    });
  } catch (err) {
    next(err);
  }
}
