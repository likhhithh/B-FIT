import React from "react";
import clsx from "clsx";

export function Skeleton({ className }) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-md bg-slate-200 dark:bg-white/10",
        className
      )}
    />
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-3 w-full" />
      ))}
    </div>
  );
}
