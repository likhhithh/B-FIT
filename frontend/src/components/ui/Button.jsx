import clsx from "clsx";
import React from "react";

export function buttonClasses(variant = "primary", size = "md") {
  return clsx(
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
    {
      "bg-primary text-white hover:bg-blue-600 focus:ring-blue-400 dark:focus:ring-blue-500":
        variant === "primary",
      "bg-success text-white hover:bg-green-600 focus:ring-green-400 dark:focus:ring-green-500":
        variant === "success",
      "border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:bg-slate-50/60 dark:hover:bg-white/5":
        variant === "outline",
      "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10":
        variant === "ghost",
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400":
        variant === "destructive",
    },
    {
      "h-8 px-3 text-sm": size === "sm",
      "h-10 px-4 text-sm": size === "md",
      "h-12 px-5 text-base": size === "lg",
    }
  );
}

export default function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}) {
  return (
    <button
      className={clsx(buttonClasses(variant, size), className)}
      {...props}
    />
  );
}
