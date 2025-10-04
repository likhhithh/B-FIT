// src/pages/Dashboard.jsx
import React, { useMemo } from "react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import ProgressRing from "../components/ui/ProgressRing.jsx";
import MacroBar from "../components/ui/MacroBar.jsx";
import WaterBottleMeter from "../components/ui/WaterBottleMeter.jsx";
import StatCard from "../components/ui/StatCard.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";
import EndOfDaySummary from "../components/summary/EndOfDaySummary.jsx";

import { useTrackerStore } from "../store/useTrackerStore.js";
import { useAuth } from "../store/authStore.js";
import { Droplet, Utensils, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { addDays, format } from "date-fns";
import {
  formatDateKey,
  estimateDistanceKmFromSteps,
  caloriesFromWalking,
} from "../lib/utils.js";

export default function Dashboard() {
  const { user } = useAuth();
  const { logs, selectedDate, goals, units, addWater, profile } =
    useTrackerStore();

  const log = logs[selectedDate] ?? {
    foods: [],
    waterMl: 0,
    workouts: [],
    steps: 0,
    distanceKm: 0,
  };

  // Profile and movement
  const weightKg = Math.max(1, Number(profile?.weightKg || 70));
  const steps = log.steps || 0;
  const distanceKm =
    log.distanceKm && log.distanceKm > 0
      ? log.distanceKm
      : estimateDistanceKmFromSteps(steps);

  // Aggregates
  const consumed = useMemo(
    () => (log.foods || []).reduce((sum, f) => sum + (f.calories || 0), 0),
    [log.foods]
  );
  const burnedWorkouts = useMemo(
    () => (log.workouts || []).reduce((sum, w) => sum + (w.calories || 0), 0),
    [log.workouts]
  );
  const burnedSteps = useMemo(
    () => caloriesFromWalking(weightKg, distanceKm),
    [weightKg, distanceKm]
  );
  const burned = burnedWorkouts + burnedSteps;
  const net = consumed - burned;

  const macros = useMemo(
    () =>
      (log.foods || []).reduce(
        (acc, f) => {
          acc.protein += f.protein || 0;
          acc.carbs += f.carbs || 0;
          acc.fat += f.fat || 0;
          return acc;
        },
        { protein: 0, carbs: 0, fat: 0 }
      ),
    [log.foods]
  );

  // Progress
  const waterP = Math.min(1, goals?.waterMl ? log.waterMl / goals.waterMl : 0);
  const netP = Math.min(1, goals?.calories ? net / goals.calories : 0);
  const burnP = Math.min(
    1,
    goals?.burnCalories ? burned / goals.burnCalories : 0
  );

  // Mini sparkline (last 7 days net calories)
  const last7 = useMemo(() => {
    const out = [];
    const start = new Date();
    start.setDate(start.getDate() - 6);
    for (let i = 0; i < 7; i++) {
      const d = addDays(start, i);
      const key = formatDateKey(d);
      const lg = logs[key] || {};
      const cons = (lg.foods || []).reduce((s, f) => s + (f.calories || 0), 0);
      const burnW = (lg.workouts || []).reduce(
        (s, w) => s + (w.calories || 0),
        0
      );
      const dist =
        lg.distanceKm && lg.distanceKm > 0
          ? lg.distanceKm
          : estimateDistanceKmFromSteps(lg.steps || 0);
      const burnS = caloriesFromWalking(weightKg, dist);
      out.push({ d: format(d, "MM/dd"), net: cons - (burnW + burnS) });
    }
    return out;
  }, [logs, weightKg]);

  const todayLabel = format(new Date(), "EEE, MMM d");

  return (
    <>
      <PageHeader
        title={`Hi ${user?.name || user?.email || "there"}!`}
        subtitle={`${todayLabel} • Keep the streak going.`}
        actions={
          <div className="flex gap-2">
            <Button onClick={() => addWater(250)}>+ 250ml Water</Button>
            <Link
              to="/log"
              className="h-10 px-4 inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:bg-slate-50/60 dark:hover:bg-white/5 text-sm"
            >
              + Add Food/Workout
            </Link>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
        <StatCard
          label="Consumed"
          value={`${consumed} kcal`}
          hint="Today"
          tone="info"
        />
        <StatCard
          label="Burned"
          value={`${burned} kcal`}
          hint={`Workouts ${burnedWorkouts} + Steps ${burnedSteps}`}
          tone="warning"
        />
        <StatCard
          label="Net"
          value={`${net} kcal`}
          hint={`Goal ${goals.calories}`}
          tone="success"
        />
        <StatCard
          label="Hydration"
          value={`${log.waterMl}${units.water === "ml" ? " ml" : ""}`}
          hint={`${Math.round(waterP * 100)}% of ${goals.waterMl} ml`}
        />
        <StatCard label="Steps" value={steps.toLocaleString()} hint="Today" />
        <StatCard
          label="Distance"
          value={`${distanceKm.toFixed(2)} km`}
          hint="Today"
        />
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Progress ring + sparkline */}
        <Card className="lg:col-span-1 card-hover">
          <div className="flex items-center justify-center">
            <ProgressRing
              rings={[
                { color: "#2E90FA", progress: waterP, label: "Water" },
                { color: "#16A34A", progress: netP, label: "Net" },
                { color: "#F97316", progress: burnP, label: "Activity" },
              ]}
              centerLabel={
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Net Calories
                  </div>
                  <div className="text-2xl font-semibold tabular-nums">
                    {net}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Goal {goals.calories}
                  </div>
                </div>
              }
            />
          </div>

          <div className="mt-4 h-20">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last7}>
                <defs>
                  <linearGradient id="netFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="d"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="net"
                  stroke="#3b82f6"
                  fill="url(#netFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Macros */}
        <Card className="lg:col-span-1 card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium flex items-center gap-2">
              <Utensils className="w-4 h-4 text-green-600" />
              Macros
            </div>
          </div>
          <MacroBar
            protein={macros.protein}
            carbs={macros.carbs}
            fat={macros.fat}
            goalProtein={goals.protein}
            goalCarbs={goals.carbs}
            goalFat={goals.fat}
          />
        </Card>

        {/* Hydration with improved quick add */}
        <Card className="lg:col-span-1 card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium flex items-center gap-2">
              <Droplet className="w-4 h-4 text-blue-500" />
              Hydration
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <Button size="sm" variant="outline" onClick={() => addWater(250)}>
              +250
            </Button>
            <Button size="sm" variant="outline" onClick={() => addWater(500)}>
              +500
            </Button>
            <Button size="sm" variant="outline" onClick={() => addWater(-250)}>
              -250
            </Button>
            <div className="col-span-3 flex gap-2">
              <input
                type="number"
                placeholder="Custom ml"
                className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const v = Number(e.currentTarget.value);
                    if (!isNaN(v) && v !== 0) addWater(v);
                    e.currentTarget.value = "";
                  }
                }}
              />
              <Button
                size="sm"
                onClick={(e) => {
                  const input = e.currentTarget.previousSibling;
                  const v = Number(input.value);
                  if (!isNaN(v) && v !== 0) addWater(v);
                  input.value = "";
                }}
              >
                Add
              </Button>
            </div>
          </div>

          <WaterBottleMeter
            waterMl={log.waterMl}
            goalMl={goals.waterMl}
            unit={units.water}
          />
        </Card>
      </div>

      {/* Today’s sections */}
      <div className="mt-4 grid lg:grid-cols-2 gap-4">
        <Card className="card-hover">
          <div className="flex items-center justify-between">
            <div className="font-medium flex items-center gap-2">
              <Utensils className="w-4 h-4 text-green-600" />
              Today’s Foods
            </div>
            <Link to="/log" className="text-sm text-blue-600 hover:underline">
              Manage
            </Link>
          </div>
          <div className="mt-3 grid gap-2">
            {(log.foods || []).slice(0, 8).map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="truncate">{f.name}</span>
                <span className="tabular-nums">{f.calories} kcal</span>
              </div>
            ))}
            {(log.foods || []).length === 0 && (
              <div className="text-sm text-slate-500 dark:text-slate-400">
                No foods yet. Add your first entry!
              </div>
            )}
          </div>
        </Card>

        <Card className="card-hover">
          <div className="flex items-center justify-between">
            <div className="font-medium flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-orange-500" />
              Today’s Workouts
            </div>
            <Link to="/log" className="text-sm text-blue-600 hover:underline">
              Manage
            </Link>
          </div>
          <div className="mt-3 grid gap-2">
            {(log.workouts || []).slice(0, 6).map((w) => (
              <div
                key={w.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="truncate">
                  {w.type}
                  {w.durationMin ? ` • ${w.durationMin} min` : ""}
                  {w.sets
                    ? ` • ${w.sets} sets${w.reps ? ` x ${w.reps} reps` : ""}`
                    : ""}
                </span>
                <span className="tabular-nums">-{w.calories} kcal</span>
              </div>
            ))}
            {(log.workouts || []).length === 0 && (
              <div className="text-sm text-slate-500 dark:text-slate-400">
                No workouts yet. Add one!
              </div>
            )}
            {/* Steps summary */}
            <div className="pt-2 mt-2 border-t border-slate-200/60 dark:border-white/10 text-sm flex items-center justify-between">
              <span>Steps & distance</span>
              <span className="tabular-nums">
                {steps.toLocaleString()} • {distanceKm.toFixed(2)} km
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* End of Day Summary */}
      <div className="mt-4">
        <EndOfDaySummary
          dateLabel="Today"
          goals={goals}
          consumed={consumed}
          burned={burned}
          waterMl={log.waterMl}
          steps={steps}
          distanceKm={distanceKm}
          protein={macros.protein}
          carbs={macros.carbs}
          fat={macros.fat}
        />
      </div>
    </>
  );
}
