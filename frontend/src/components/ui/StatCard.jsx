import React from "react";
import clsx from "clsx";

export default function StatCard({ label, value, hint, tone = "default" }) {
  return (
    <div
      className={clsx(
        "card card-hover p-4 md:p-5",
        tone === "success" && "border-green-200/60 dark:border-green-900/40",
        tone === "warning" && "border-amber-200/60 dark:border-amber-900/40",
        tone === "info" && "border-blue-200/60 dark:border-blue-900/40"
      )}
    >
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
      {hint && (
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </div>
      )}
    </div>
  );
}
