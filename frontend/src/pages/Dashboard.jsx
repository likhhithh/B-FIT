import React, { useMemo } from "react";
import Card from "../components/ui/Card";
import ProgressRing from "../components/ui/ProgressRing";
import MacroBar from "../components/ui/MacroBar";
import WaterBottleMeter from "../components/ui/WaterBottleMeter";
import Button from "../components/ui/Button";
import { useTrackerStore } from "../store/useTrackerStore";
import { Droplet, Dumbbell, Utensils } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logs, selectedDate, goals, units, addWater } = useTrackerStore();
  const log = logs[selectedDate] ?? { foods: [], waterMl: 0, workouts: [] };

  const consumed = useMemo(
    () => log.foods.reduce((sum, f) => sum + f.calories, 0),
    [log.foods]
  );
  const burned = useMemo(
    () => log.workouts.reduce((sum, w) => sum + w.calories, 0),
    [log.workouts]
  );
  const net = consumed - burned;

  const macros = useMemo(
    () =>
      log.foods.reduce(
        (acc, f) => {
          acc.protein += f.protein || 0;
          acc.carbs += f.carbs || 0;
          acc.fat += f.fat || 0;
          acc.fiber += f.fiber || 0;
          return acc;
        },
        { protein: 0, carbs: 0, fat: 0, fiber: 0 }
      ),
    [log.foods]
  );

  const waterP = Math.min(1, goals.waterMl ? log.waterMl / goals.waterMl : 0);
  const netP = Math.min(1, goals.calories ? net / goals.calories : 0);
  const burnP = Math.min(
    1,
    goals.burnCalories ? burned / goals.burnCalories : 0
  );
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="md:col-span-2 p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Today
            </div>
            <div className="text-2xl font-display">
              Hi! Let’s crush your goals 💪
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <Button onClick={() => addWater(250)}>+ 250ml Water</Button>
            <Link
              to="/log"
              className="h-10 px-4 inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:bg-slate-50/60 dark:hover:bg-white/5 text-sm"
            >
              + Add Food/Workout
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 flex items-center justify-center">
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
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-500" />
                Water
              </div>
              <Button size="sm" onClick={() => addWater(250)}>
                +250ml
              </Button>
            </div>
            <WaterBottleMeter
              waterMl={log.waterMl}
              goalMl={goals.waterMl}
              unit={units.water}
            />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium flex items-center gap-2">
                <Utensils className="w-4 h-4 text-green-600" />
                Calories
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <Stat label="Consumed" value={`${consumed} kcal`} />
              <Stat label="Burned" value={`${burned} kcal`} />
              <Stat label="Net" value={`${net} kcal`} />
            </div>
          </Card>
        </div>
      </Card>

      <Card className="p-4">
        <MacroBar
          protein={macros.protein}
          carbs={macros.carbs}
          fat={macros.fat}
          fiber={macros.fiber}
          goalProtein={goals.protein}
          goalCarbs={goals.carbs}
          goalFat={goals.fat}
          goalFiber={goals.fiber}
        />
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="font-medium flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-orange-500" />
            Today’s Entries
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/log")}>
            Manage
          </Button>
        </div>
        <div className="mt-3 grid gap-2">
          {log.foods.slice(0, 5).map((f) => (
            <div
              key={f.id}
              className="flex items-center justify-between text-sm"
            >
              <span>{f.name}</span>
              <span className="tabular-nums">{f.calories} kcal</span>
            </div>
          ))}
          {log.foods.length === 0 && (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              No foods yet. Add your first entry!
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/5">
      <div className="text-xs text-slate-600 dark:text-slate-300">{label}</div>
      <div className="font-semibold tabular-nums">{value}</div>
    </div>
  );
}
