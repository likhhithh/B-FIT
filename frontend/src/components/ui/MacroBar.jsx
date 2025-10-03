import React from "react";
import { clamp } from "../../lib/utils";

export default function MacroBar({
  protein,
  carbs,
  fat,
  fiber = 0,
  goalProtein,
  goalCarbs,
  goalFat,
  goalFiber = 25,
}) {
  const pP = clamp(goalProtein ? protein / goalProtein : 0);
  const cP = clamp(goalCarbs ? carbs / goalCarbs : 0);
  const fP = clamp(goalFat ? fat / goalFat : 0);
  const fiP = clamp(goalFiber ? fiber / goalFiber : 0);

  return (
    <div>
      <div className="mb-2 text-sm text-slate-600 dark:text-slate-300">
        Macros
      </div>
      <div className="space-y-3">
        <Row
          label="Protein"
          color="bg-green-500"
          value={protein}
          goal={goalProtein}
          pct={pP}
          unit="g"
        />
        <Row
          label="Carbs"
          color="bg-blue-500"
          value={carbs}
          goal={goalCarbs}
          pct={cP}
          unit="g"
        />
        <Row
          label="Fat"
          color="bg-amber-500"
          value={fat}
          goal={goalFat}
          pct={fP}
          unit="g"
        />
        <Row
          label="Fiber"
          color="bg-purple-500"
          value={fiber}
          goal={goalFiber}
          pct={fiP}
          unit="g"
        />
      </div>
    </div>
  );
}

function Row({ label, color, value, goal, pct, unit }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-slate-600 dark:text-slate-300">{label}</span>
        <span className="tabular-nums text-slate-700 dark:text-slate-200">
          {Math.round(value)}
          {unit} / {goal}
          {unit}
        </span>
      </div>
      <div className="h-2 bg-slate-200/70 dark:bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${pct * 100}%` }} />
      </div>
    </div>
  );
}
