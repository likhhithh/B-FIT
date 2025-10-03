import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button, { buttonClasses } from "../ui/Button";
import { useTheme } from "../../hooks/useTheme";
import { Moon, Sun, Flame } from "lucide-react";

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const loc = useLocation();
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-[#0B1220]/70 border-b border-slate-200/70 dark:border-white/10">
      <div className="container-app flex items-center h-14 gap-3">
        <Link to="/" className="font-display text-lg">
          B-FIT
        </Link>
        <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Flame className="w-4 h-4 text-orange-500" /> Streak: 0
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          <Link to="/log" className={buttonClasses("primary", "sm")}>
            + Log
          </Link>
        </div>
      </div>
    </header>
  );
}
