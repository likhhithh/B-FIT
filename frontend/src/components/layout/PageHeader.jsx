import React from "react";

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-4 md:mb-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-display">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
