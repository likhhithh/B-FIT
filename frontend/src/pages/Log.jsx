import React, { useMemo, useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useTrackerStore } from "../store/useTrackerStore";
import { useForm } from "react-hook-form";
import { Utensils, Dumbbell, Droplet, Trash2, Footprints } from "lucide-react";
import { FOODS } from "../data/foods";
import { EXERCISES } from "../data/exercises";
import { api } from "../lib/api";
import { estimateDistanceKmFromSteps, caloriesFromWalking } from "../lib/utils";

export default function Log() {
  const [tab, setTab] = useState("food");
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-4">
        <Tabs tab={tab} setTab={setTab} />
        {tab === "food" && <FoodForm />}
        {tab === "water" && <WaterForm />}
        {tab === "workout" && <WorkoutForm />}
        {tab === "steps" && <StepsForm />}
      </Card>
      <Card className="p-4">
        <Entries />
      </Card>
    </div>
  );
}

function Tabs({ tab, setTab }) {
  const base =
    "flex-1 py-2 rounded-lg text-sm border border-slate-200/70 dark:border-white/10";
  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      <button
        className={`${base} ${
          tab === "food"
            ? "bg-primary text-white"
            : "bg-white dark:bg-transparent"
        }`}
        onClick={() => setTab("food")}
      >
        Food
      </button>
      <button
        className={`${base} ${
          tab === "water"
            ? "bg-primary text-white"
            : "bg-white dark:bg-transparent"
        }`}
        onClick={() => setTab("water")}
      >
        Water
      </button>
      <button
        className={`${base} ${
          tab === "workout"
            ? "bg-primary text-white"
            : "bg-white dark:bg-transparent"
        }`}
        onClick={() => setTab("workout")}
      >
        Workout
      </button>
      <button
        className={`${base} ${
          tab === "steps"
            ? "bg-primary text-white"
            : "bg-white dark:bg-transparent"
        }`}
        onClick={() => setTab("steps")}
      >
        Steps
      </button>
    </div>
  );
}

// FOOD
function FoodForm() {
  const { addFood } = useTrackerStore();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [grams, setGrams] = useState(100);
  const [servingLabel, setServingLabel] = useState("100 g");
  const [results, setResults] = useState([]);

  useEffect(() => {
    let cancel = false;
    const q = query.trim();
    if (!open) return;
    api
      .get("/foods", { params: { q } })
      .then((res) => {
        if (!cancel) setResults(res.data.items || []);
      })
      .catch(() => {
        const local = (
          q
            ? FOODS.filter((f) =>
                f.name.toLowerCase().includes(q.toLowerCase())
              )
            : FOODS
        ).slice(0, 20);
        if (!cancel) setResults(local);
      });
    return () => {
      cancel = true;
    };
  }, [query, open]);

  const calc = useMemo(() => {
    if (!selected) return null;
    const factor = grams / 100;
    const n = selected.nutrientsPer100g;
    return {
      calories: Math.round(n.calories * factor),
      protein: +(n.protein * factor).toFixed(1),
      carbs: +(n.carbs * factor).toFixed(1),
      fat: +(n.fat * factor).toFixed(1),
      fiber: +(n.fiber * factor).toFixed(1),
    };
  }, [selected, grams]);

  function pickFood(food) {
    setSelected(food);
    const first = food.servings?.[0] || { label: "100 g", grams: 100 };
    setServingLabel(first.label);
    setGrams(first.grams);
    setOpen(false);
    setQuery(food.name);
  }

  return (
    <div className="grid gap-3">
      <div className="relative">
        <label className="text-sm block mb-1 text-slate-600 dark:text-slate-300">
          Food
        </label>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search e.g., oats, roti, chicken..."
          className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
        />
        {open && (
          <div className="absolute z-20 mt-1 w-full bg-white dark:bg-[#0F172A] border border-slate-200/70 dark:border-white/10 rounded-lg shadow-lg max-h-64 overflow-auto">
            {results.length === 0 && (
              <div className="px-3 py-2 text-sm text-slate-500">No results</div>
            )}
            {results.map((f) => (
              <button
                key={f.id}
                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-white/5"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pickFood(f)}
              >
                {f.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <>
          <div className="grid sm:grid-cols-3 gap-2">
            <label className="text-sm col-span-2">
              <div className="text-slate-600 dark:text-slate-300 mb-1">
                Serving
              </div>
              <select
                className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
                value={servingLabel}
                onChange={(e) => {
                  const s = selected.servings.find(
                    (x) => x.label === e.target.value
                  );
                  if (s) {
                    setServingLabel(s.label);
                    setGrams(s.grams);
                  }
                }}
              >
                {selected.servings.map((s) => (
                  <option key={s.label} value={s.label}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <div className="text-slate-600 dark:text-slate-300 mb-1">
                Grams
              </div>
              <input
                type="number"
                min={1}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
                value={grams}
                onChange={(e) => setGrams(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="grid grid-cols-5 gap-2 text-xs mt-1">
            <Macro label="Kcal" value={calc?.calories ?? 0} />
            <Macro label="Protein" value={`${calc?.protein ?? 0} g`} />
            <Macro label="Carbs" value={`${calc?.carbs ?? 0} g`} />
            <Macro label="Fat" value={`${calc?.fat ?? 0} g`} />
            <Macro label="Fiber" value={`${calc?.fiber ?? 0} g`} />
          </div>

          <Button
            onClick={() => {
              if (!selected || !calc) return;
              addFood({
                name: selected.name,
                calories: calc.calories,
                protein: calc.protein,
                carbs: calc.carbs,
                fat: calc.fat,
                fiber: calc.fiber,
                quantity: servingLabel || `${grams} g`,
              });
              setSelected(null);
              setQuery("");
              setOpen(false);
            }}
            className="mt-2"
          >
            <Utensils className="w-4 h-4 mr-2" /> Add Food
          </Button>
        </>
      )}
    </div>
  );
}

// WATER
function WaterForm() {
  const { addWater } = useTrackerStore();
  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const val = Number(e.target.amount.value || 250);
        addWater(val);
        e.target.reset();
      }}
    >
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          className="py-2 rounded-lg bg-slate-100 dark:bg-white/10"
          onClick={() => addWater(250)}
        >
          +250 ml
        </button>
        <button
          type="button"
          className="py-2 rounded-lg bg-slate-100 dark:bg-white/10"
          onClick={() => addWater(500)}
        >
          +500 ml
        </button>
        <div className="col-span-3 grid grid-cols-3 gap-2">
          <label className="text-sm">
            <div className="text-slate-600 dark:text-slate-300 mb-1">
              Custom (ml)
            </div>
            <input
              name="amount"
              type="number"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
              defaultValue={250}
            />
          </label>
          <Button type="submit" className="col-span-2">
            <Droplet className="w-4 h-4 mr-2" /> Add Water
          </Button>
        </div>
      </div>
    </form>
  );
}

// WORKOUT
function WorkoutForm() {
  const { addWorkout, profile } = useTrackerStore();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [minutes, setMinutes] = useState(30);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const weightKg = Math.max(1, Number(profile?.weightKg || 70));

  const [results, setResults] = useState([]);

  useEffect(() => {
    let cancel = false;
    const q = query.trim();
    if (!open) return;
    api
      .get("/exercises", { params: { q } })
      .then((res) => {
        if (!cancel) setResults(res.data.items || []);
      })
      .catch(() => {
        const local = (
          q
            ? EXERCISES.filter((e) =>
                e.name.toLowerCase().includes(q.toLowerCase())
              )
            : EXERCISES
        ).slice(0, 20);
        if (!cancel) setResults(local);
      });
    return () => {
      cancel = true;
    };
  }, [query, open]);

  const calories = useMemo(() => {
    if (!selected || minutes <= 0) return 0;
    return Math.round(((selected.MET * 3.5 * weightKg) / 200) * minutes);
  }, [selected, minutes, weightKg]);

  return (
    <div className="grid gap-3">
      <div className="relative">
        <label className="text-sm block mb-1 text-slate-600 dark:text-slate-300">
          Exercise
        </label>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search e.g., Running, Cycling, Yoga..."
          className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
        />
        {open && (
          <div className="absolute z-20 mt-1 w-full bg-white dark:bg-[#0F172A] border border-slate-200/70 dark:border-white/10 rounded-lg shadow-lg max-h-64 overflow-auto">
            {results.map((ex) => (
              <button
                key={ex.id || ex.name}
                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-white/5"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setSelected(ex);
                  setQuery(ex.name);
                  setOpen(false);
                }}
              >
                {ex.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <label className="text-sm">
          <div className="text-slate-600 dark:text-slate-300 mb-1">
            Duration (min)
          </div>
          <input
            type="number"
            min={1}
            className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
        </label>
        <label className="text-sm">
          <div className="text-slate-600 dark:text-slate-300 mb-1">
            Sets (optional)
          </div>
          <input
            type="number"
            min={0}
            className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
        </label>
        <label className="text-sm">
          <div className="text-slate-600 dark:text-slate-300 mb-1">
            Reps (optional)
          </div>
          <input
            type="number"
            min={0}
            className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </label>
      </div>

      <div className="text-sm text-slate-700 dark:text-slate-200">
        Estimated calories burned:{" "}
        <span className="font-semibold tabular-nums">{calories} kcal</span>
      </div>

      <Button
        onClick={() => {
          if (!selected || !minutes) return;
          addWorkout({
            type: selected.name,
            durationMin: minutes,
            calories,
            ...(sets ? { sets: Number(sets) } : {}),
            ...(reps ? { reps: Number(reps) } : {}),
          });
          setSelected(null);
          setQuery("");
          setMinutes(30);
          setOpen(false);
          setSets("");
          setReps("");
        }}
      >
        <Dumbbell className="w-4 h-4 mr-2" /> Add Workout
      </Button>
    </div>
  );
}

// STEPS
function StepsForm() {
  const { logs, selectedDate, profile, addSteps } = useTrackerStore();
  const log = logs[selectedDate] ?? {};
  const weightKg = Math.max(1, Number(profile?.weightKg || 70));

  const [stepsInput, setStepsInput] = useState(1000);
  const [distanceInput, setDistanceInput] = useState("");

  const computedDistance = useMemo(() => {
    if (distanceInput !== "") return Number(distanceInput) || 0;
    return estimateDistanceKmFromSteps(stepsInput || 0);
  }, [stepsInput, distanceInput]);

  const estimatedCalories = useMemo(() => {
    return caloriesFromWalking(weightKg, computedDistance);
  }, [weightKg, computedDistance]);

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => addSteps(1000)}
          className="py-2 rounded-lg bg-slate-100 dark:bg-white/10"
        >
          +1,000 steps
        </button>
        <button
          type="button"
          onClick={() => addSteps(2000)}
          className="py-2 rounded-lg bg-slate-100 dark:bg-white/10"
        >
          +2,000 steps
        </button>
        <button
          type="button"
          onClick={() => addSteps(5000)}
          className="py-2 rounded-lg bg-slate-100 dark:bg-white/10"
        >
          +5,000 steps
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label className="text-sm">
          <div className="text-slate-600 dark:text-slate-300 mb-1">Steps</div>
          <input
            type="number"
            min={0}
            className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
            value={stepsInput}
            onChange={(e) => setStepsInput(Number(e.target.value))}
          />
        </label>
        <label className="text-sm">
          <div className="text-slate-600 dark:text-slate-300 mb-1">
            Distance (km, optional)
          </div>
          <input
            type="number"
            step="0.01"
            min={0}
            placeholder={estimateDistanceKmFromSteps(stepsInput).toString()}
            className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
            value={distanceInput}
            onChange={(e) => setDistanceInput(e.target.value)}
          />
        </label>
      </div>

      <div className="text-sm text-slate-700 dark:text-slate-200">
        Estimated calories from steps:{" "}
        <span className="font-semibold tabular-nums">
          {estimatedCalories} kcal
        </span>
        <span className="ml-2 text-xs text-slate-500">
          ({computedDistance.toFixed(2)} km, {weightKg} kg)
        </span>
      </div>

      <Button
        onClick={() => {
          const dist = distanceInput !== "" ? Number(distanceInput) : undefined;
          addSteps(Number(stepsInput || 0), dist);
          setStepsInput(1000);
          setDistanceInput("");
        }}
      >
        <Footprints className="w-4 h-4 mr-2" /> Add Steps
      </Button>

      {/* Current totals */}
      <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
        Today: {Number(log.steps || 0).toLocaleString()} steps •{" "}
        {Number(log.distanceKm || 0).toFixed(2)} km
      </div>
    </div>
  );
}

function Entries() {
  const { logs, selectedDate, removeFood, removeWorkout } = useTrackerStore();
  const log = logs[selectedDate];
  const totalItems = (log?.foods?.length ?? 0) + (log?.workouts?.length ?? 0);

  return (
    <div>
      <div className="font-medium mb-2">Today’s Entries</div>
      {/* Steps summary */}
      <div className="mb-3 text-sm rounded-lg px-3 py-2 bg-slate-50 dark:bg-white/5 flex items-center justify-between">
        <div>Steps</div>
        <div className="tabular-nums">
          {(log?.steps || 0).toLocaleString()} •{" "}
          {(log?.distanceKm || 0).toFixed(2)} km
        </div>
      </div>

      <div className="space-y-2">
        {log?.foods.map((f) => (
          <div
            key={f.id}
            className="flex items-center justify-between text-sm bg-slate-50 dark:bg-white/5 rounded-lg px-3 py-2"
          >
            <div>
              <div className="font-medium">{f.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {Math.round(f.protein)}P {Math.round(f.carbs)}C{" "}
                {Math.round(f.fat)}F{" "}
                {typeof f.fiber === "number"
                  ? `• ${Math.round(f.fiber)}Fb`
                  : ""}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="tabular-nums">{f.calories} kcal</span>
              <button
                title="Delete"
                onClick={() => removeFood(f.id)}
                className="text-slate-500 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {log?.workouts.map((w) => (
          <div
            key={w.id}
            className="flex items-center justify-between text-sm bg-slate-50 dark:bg-white/5 rounded-lg px-3 py-2"
          >
            <div>
              <div className="font-medium">{w.type}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {w.durationMin ? `${w.durationMin} min` : ""}
                {w.sets ? ` • ${w.sets} sets` : ""}
                {w.reps ? ` x ${w.reps} reps` : ""}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="tabular-nums">-{w.calories} kcal</span>
              <button
                title="Delete"
                onClick={() => removeWorkout(w.id)}
                className="text-slate-500 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {totalItems === 0 && (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Nothing logged yet. Add your first entry!
          </div>
        )}
      </div>
    </div>
  );
}

function Macro({ label, value }) {
  return (
    <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 flex flex-col items-center">
      <span className="text-[11px] text-slate-600 dark:text-slate-400">
        {label}
      </span>
      <span className="tabular-nums font-medium">{value}</span>
    </div>
  );
}
