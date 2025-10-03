import React from "react";
import { mlToOz } from "../../lib/utils";

export default function WaterBottleMeter({ waterMl, goalMl, unit }) {
  const bottleMl = 250;
  const total = Math.max(1, Math.round(goalMl / bottleMl));
  const filled = Math.min(total, Math.floor(waterMl / bottleMl));
  const display = unit === "ml" ? `${waterMl} ml` : `${mlToOz(waterMl)} oz`;

  return (
    <div>
      <div className="flex items-end gap-1 mb-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-5 h-8 rounded-b-md border border-slate-300 dark:border-white/10 ${
              i < filled ? "bg-blue-500" : "bg-slate-200/70 dark:bg-white/5"
            }`}
            title={`Glass ${i + 1}`}
          />
        ))}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-300">
        {display} / {unit === "ml" ? `${goalMl} ml` : `${mlToOz(goalMl)} oz`}
      </div>
    </div>
  );
}
