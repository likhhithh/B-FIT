import React from "react";
import { Link } from "react-router-dom";
import Button, { buttonClasses } from "../ui/Button.jsx";
import { useTheme } from "../../hooks/useTheme";
import { Moon, Sun, Flame, LogOut, Award } from "lucide-react";
import { useAuth } from "../../store/authStore.js";
import Logo from "../ui/Logo.jsx";
import { getBadge } from "../../lib/achievements.js";

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);
  const { user, logout, streakCount } = useAuth();
  const badge = getBadge(streakCount || 0);

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-[#0B1220]/70 border-b border-slate-200/70 dark:border-white/10">
      <div className="container-app flex items-center h-14 gap-3">
        {user ? (
          <Link to="/" className="flex items-center gap-2 font-display text-lg">
            <Logo className="h-6" withText />
          </Link>
        ) : (
          <div className="flex items-center gap-2 font-display text-lg">
            <Logo className="h-6" withText />
          </div>
        )}

        <span className="hidden sm:flex text-sm text-slate-600 dark:text-slate-400 items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          Streak: <span className="tabular-nums">{streakCount || 0}</span>
          <span className="inline-flex items-center gap-1">
            <span className="text-base">{badge.emoji}</span>
            <span className="hidden md:inline">{badge.name}</span>
          </span>
          <Link
            to="/achievements"
            className="inline-flex items-center gap-1 text-blue-600 hover:underline"
          >
            <Award className="w-4 h-4" /> Achievements
          </Link>
        </span>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-slate-600 dark:text-slate-300">
                Hi, {user.name || user.email}
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
              <Link to="/log" className={buttonClasses("primary", "sm")}>
                + Log
              </Link>
            </>
          ) : (
            <Link to="/login" className={buttonClasses("outline", "sm")}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
