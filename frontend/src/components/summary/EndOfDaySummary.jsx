// src/components/summary/EndOfDaySummary.jsx
import React from "react";
import Card from "../ui/Card.jsx";

export default function EndOfDaySummary({
  dateLabel,
  goals,
  consumed = 0,
  burned = 0,
  waterMl = 0,
  steps = 0,
  distanceKm = 0,
  protein = 0,
  carbs = 0,
  fat = 0,
}) {
  const net = consumed - burned;
  const waterPct = goals?.waterMl ? waterMl / goals.waterMl : 0;
  const calPct = goals?.calories ? net / goals.calories : 0;
  const proteinPct = goals?.protein ? protein / goals.protein : 0;

  // Simple grading
  let grade = "C";
  let message =
    "Nice try today—every step counts. Let’s push a bit more tomorrow!";
  let color = "text-amber-500";
  const hits = [
    waterPct >= 1 ? "Hydration goal" : null,
    calPct >= 0.9 && calPct <= 1.1 ? "Calories on target" : null,
    proteinPct >= 0.9 ? "Protein target" : null,
    steps >= 8000 ? "Great steps" : null,
  ].filter(Boolean);

  if (hits.length >= 3) {
    grade = "A";
    color = "text-green-600";
    message = "Crushed it today! Your consistency is building momentum.";
  } else if (hits.length === 2) {
    grade = "B";
    color = "text-blue-600";
    message = "Solid work! You’re close—tomorrow, let’s snag one more goal.";
  }

  return (
    <Card className="card-hover">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {dateLabel}
          </div>
          <div className={`text-2xl font-display ${color}`}>
            End of day: {grade}
          </div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {message}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Net calories
          </div>
          <div className="text-xl font-semibold tabular-nums">{net} kcal</div>
        </div>
      </div>

      <div className="mt-4 grid md:grid-cols-3 gap-3">
        <Block
          label="Hydration"
          value={`${waterMl} ml`}
          pct={waterPct}
          hint={`Goal ${goals?.waterMl || 0} ml`}
          barColor="bg-blue-500"
        />
        <Block
          label="Calories"
          value={`${net} kcal`}
          pct={Math.min(1, Math.abs(calPct))}
          hint={`Goal ${goals?.calories || 0} kcal`}
          barColor="bg-emerald-500"
        />
        <Block
          label="Protein"
          value={`${Math.round(protein)} g`}
          pct={Math.min(1, proteinPct)}
          hint={`Goal ${goals?.protein || 0} g`}
          barColor="bg-amber-500"
        />
      </div>

      <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
        <Row label="Steps" value={steps.toLocaleString()} />
        <Row label="Distance" value={`${distanceKm.toFixed(2)} km`} />
        <Row label="Workouts burned" value={`-${burned} kcal`} />
      </div>

      {hits.length > 0 && (
        <div className="mt-3 text-xs text-slate-600 dark:text-slate-300">
          Wins today: {hits.join(" • ")}
        </div>
      )}
    </Card>
  );
}

function Block({ label, value, pct, hint, barColor }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {label}
        </div>
        <div className="text-sm font-medium">{value}</div>
      </div>
      <div className="mt-1 h-2 bg-slate-200/70 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor}`}
          style={{ width: `${Math.max(0, Math.min(1, pct)) * 100}%` }}
        />
      </div>
      {hint && (
        <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
          {hint}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
