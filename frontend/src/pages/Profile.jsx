import React from "react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";
import { useTrackerStore } from "../store/useTrackerStore";

export default function Goals() {
  const { goals, setGoals } = useTrackerStore();
  return (
    <>
      <PageHeader title="Goals" subtitle="Tune your daily targets." />
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="font-medium mb-3">Daily Goals</div>

          <GoalRow
            label="Calories"
            value={goals.calories}
            min={1200}
            max={5000}
            step={50}
            onChange={(v) => setGoals({ calories: v })}
          />
          <GoalRow
            label="Water (ml)"
            value={goals.waterMl}
            min={1000}
            max={8000}
            step={100}
            onChange={(v) => setGoals({ waterMl: v })}
          />

          <div className="grid grid-cols-3 gap-3 mt-4">
            <MacroGoal
              label="Protein (g)"
              value={goals.protein}
              onChange={(v) => setGoals({ protein: v })}
            />
            <MacroGoal
              label="Carbs (g)"
              value={goals.carbs}
              onChange={(v) => setGoals({ carbs: v })}
            />
            <MacroGoal
              label="Fat (g)"
              value={goals.fat}
              onChange={(v) => setGoals({ fat: v })}
            />
          </div>

          <div className="mt-4">
            <GoalRow
              label="Workout burn (kcal)"
              value={goals.burnCalories}
              min={0}
              max={2000}
              step={10}
              onChange={(v) => setGoals({ burnCalories: v })}
            />
            <GoalRow
              label="Steps (per day)"
              value={goals.stepsGoal}
              min={1000}
              max={20000}
              step={500}
              onChange={(v) => setGoals({ stepsGoal: v })}
            />
            <GoalRow
              label="Distance (km/day)"
              value={goals.distanceKmGoal}
              min={1}
              max={20}
              step={0.5}
              onChange={(v) => setGoals({ distanceKmGoal: v })}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <Preset
              name="Fat loss"
              onClick={() =>
                setGoals({
                  calories: 1800,
                  protein: 140,
                  carbs: 200,
                  fat: 60,
                  burnCalories: 400,
                  stepsGoal: 9000,
                  distanceKmGoal: 6,
                })
              }
            />
            <Preset
              name="Maintain"
              onClick={() =>
                setGoals({
                  calories: 2200,
                  protein: 130,
                  carbs: 260,
                  fat: 70,
                  burnCalories: 350,
                  stepsGoal: 8000,
                  distanceKmGoal: 5,
                })
              }
            />
            <Preset
              name="Muscle gain"
              onClick={() =>
                setGoals({
                  calories: 2600,
                  protein: 160,
                  carbs: 320,
                  fat: 80,
                  burnCalories: 450,
                  stepsGoal: 8000,
                  distanceKmGoal: 5,
                })
              }
            />
          </div>
        </Card>

        <Card>
          <div className="font-medium mb-2">Tips</div>
          <ul className="text-sm list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li>Hit protein first — it helps recovery and satiety.</li>
            <li>Hydration compounds: small adds often beat big chugs.</li>
            <li>Walking adds up — pair it with calls or breaks.</li>
          </ul>
        </Card>
      </div>
    </>
  );
}

function GoalRow({ label, value, min, max, step, onChange }) {
  return (
    <div className="grid grid-cols-5 items-center gap-3 py-2">
      <div className="col-span-2 text-sm">{label}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="col-span-2"
      />
      <div className="text-right tabular-nums">{value}</div>
    </div>
  );
}
function MacroGoal({ label, value, onChange }) {
  return (
    <label className="text-sm">
      <div className="text-slate-600 dark:text-slate-300 mb-1">{label}</div>
      <input
        type="number"
        className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
function Preset({ name, onClick }) {
  return (
    <Button variant="outline" onClick={onClick}>
      {name}
    </Button>
  );
}
