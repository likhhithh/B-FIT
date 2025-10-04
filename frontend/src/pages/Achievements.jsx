import React, { useMemo } from "react";
import Card from "../components/ui/Card.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";
import { useTrackerStore } from "../store/useTrackerStore";
import { useAuth } from "../store/authStore";
import { computeDailyAchievements, getBadge } from "../lib/achievements";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Achievements() {
  const { logs, selectedDate, goals } = useTrackerStore();
  const { streakCount } = useAuth();
  const today = logs[selectedDate] || {};

  const daily = useMemo(
    () => computeDailyAchievements({ log: today, goals }),
    [today, goals]
  );
  const badge = getBadge(streakCount || 0);
  const next = badge.nextAt;

  return (
    <>
      <PageHeader
        title="Achievements"
        subtitle="Daily wins and lifetime badges."
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="font-medium mb-2">Today’s achievements</div>
          <div className="grid gap-2">
            {daily.map((a) => (
              <div
                key={a.key}
                className="flex items-center justify-between rounded-lg px-3 py-2 bg-slate-50 dark:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  {a.done ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-slate-400" />
                  )}
                  <span>{a.label}</span>
                </div>
                <span
                  className={`text-xs ${
                    a.done ? "text-green-600" : "text-slate-500"
                  }`}
                >
                  {a.done ? "Done" : "Not yet"}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="font-medium">Badges</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Streak: <span className="tabular-nums">{streakCount}</span>
            </div>
          </div>

          <div className="mt-2 rounded-xl border border-slate-200/60 dark:border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{badge.emoji}</div>
              <div>
                <div className="font-medium">{badge.name}</div>
                {next && (
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Next up at {next} days
                  </div>
                )}
              </div>
            </div>
            {next && (
              <div className="w-40">
                <div className="h-2 bg-slate-200/70 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${
                        Math.min(
                          1,
                          (streakCount % next) /
                            (next -
                              (streakCount -
                                (streakCount >= 100
                                  ? 100
                                  : streakCount >= 75
                                  ? 75
                                  : streakCount >= 50
                                  ? 50
                                  : streakCount >= 25
                                  ? 25
                                  : streakCount >= 10
                                  ? 10
                                  : 0)))
                        ) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Tiers: 10d 🥈 • 25d 🥈 • 50d 🥇 • 75d 💎 • 100d 🏆 • 100+d 👑
          </div>
        </Card>
      </div>
    </>
  );
}
