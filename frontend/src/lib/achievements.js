// Badge tiers per your spec (adjust labels if you like)
export function getBadge(streak) {
  if (streak > 100) return { name: "Conqueror", emoji: "👑", nextAt: null };
  if (streak === 100) return { name: "Platinum", emoji: "🏆", nextAt: 101 };
  if (streak >= 75) return { name: "Diamond", emoji: "💎", nextAt: 100 };
  if (streak >= 50) return { name: "Gold", emoji: "🥇", nextAt: 75 };
  if (streak >= 25) return { name: "Silver II", emoji: "🥈", nextAt: 50 };
  if (streak >= 10) return { name: "Silver I", emoji: "🥈", nextAt: 25 };
  return { name: "Rookie", emoji: "🔥", nextAt: 10 };
}

export function computeDailyAchievements({ log, goals }) {
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

  return [
    { key: "water", label: "Hydration goal", done: !!hitWater },
    {
      key: "calories",
      label: "Calories on target (±10%)",
      done: !!hitCalories,
    },
    { key: "protein", label: "Protein target", done: !!hitProtein },
    {
      key: "steps",
      label: `Steps goal (${stepsGoal.toLocaleString()})`,
      done: !!hitSteps,
    },
    { key: "burn", label: "Workout burn goal", done: !!hitBurn },
  ];
}
