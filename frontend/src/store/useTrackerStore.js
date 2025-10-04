import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  formatDateKey,
  todayKey,
  uid,
  estimateDistanceKmFromSteps,
} from "../lib/utils";

function emptyLog(dateKey) {
  return {
    date: dateKey,
    foods: [],
    waterMl: 0,
    workouts: [],
    steps: 0,
    distanceKm: 0,
  };
}

export const useTrackerStore = create(
  persist(
    (set, get) => ({
      selectedDate: todayKey(),
      logs: { [todayKey()]: emptyLog(todayKey()) },
      goals: {
        calories: 2200,
        waterMl: 3000,
        protein: 130,
        carbs: 280,
        fat: 70,
        burnCalories: 400,
        stepsGoal: 8000,
        distanceKmGoal: 5,
      },
      units: { water: "ml", weight: "kg" },
      profile: {
        name: "",
        sex: "unspecified", // male|female|unspecified
        age: 25,
        heightCm: 170,
        weightKg: 70,
        activityLevel: "moderate", // sedentary|light|moderate|active|very_active
      },

      setSelectedDate: (date) => set({ selectedDate: formatDateKey(date) }),

      addWater: (ml, date) => {
        const dk = formatDateKey(date ?? new Date());
        const logs = { ...get().logs };
        const log = logs[dk] ?? emptyLog(dk);
        logs[dk] = { ...log, waterMl: Math.max(0, log.waterMl + ml) };
        set({ logs });
      },

      addFood: (item, date) => {
        const dk = formatDateKey(date ?? new Date());
        const logs = { ...get().logs };
        const log = logs[dk] ?? emptyLog(dk);
        const newItem = {
          ...item,
          id: uid("food_"),
          createdAt: new Date().toISOString(),
        };
        logs[dk] = { ...log, foods: [newItem, ...log.foods] };
        set({ logs });
      },

      removeFood: (id, date) => {
        const dk = formatDateKey(date ?? new Date());
        const logs = { ...get().logs };
        const log = logs[dk] ?? emptyLog(dk);
        logs[dk] = { ...log, foods: log.foods.filter((f) => f.id !== id) };
        set({ logs });
      },

      addWorkout: (item, date) => {
        const dk = formatDateKey(date ?? new Date());
        const logs = { ...get().logs };
        const log = logs[dk] ?? emptyLog(dk);
        const newItem = {
          ...item,
          id: uid("wrk_"),
          createdAt: new Date().toISOString(),
        };
        logs[dk] = { ...log, workouts: [newItem, ...log.workouts] };
        set({ logs });
      },

      removeWorkout: (id, date) => {
        const dk = formatDateKey(date ?? new Date());
        const logs = { ...get().logs };
        const log = logs[dk] ?? emptyLog(dk);
        logs[dk] = {
          ...log,
          workouts: log.workouts.filter((w) => w.id !== id),
        };
        set({ logs });
      },

      addSteps: (stepsToAdd, distanceKmOptional, date) => {
        const dk = formatDateKey(date ?? new Date());
        const logs = { ...get().logs };
        const log = logs[dk] ?? emptyLog(dk);
        const extraDistance =
          typeof distanceKmOptional === "number"
            ? Math.max(0, distanceKmOptional)
            : estimateDistanceKmFromSteps(stepsToAdd);
        logs[dk] = {
          ...log,
          steps: Math.max(0, (log.steps || 0) + Math.max(0, stepsToAdd || 0)),
          distanceKm: +Math.max(
            0,
            (log.distanceKm || 0) + extraDistance
          ).toFixed(2),
        };
        set({ logs });
      },
      setStepsAndDistance: (stepsVal, distanceKmVal, date) => {
        const dk = formatDateKey(date ?? new Date());
        const logs = { ...get().logs };
        logs[dk] = {
          ...(logs[dk] ?? emptyLog(dk)),
          steps: Math.max(0, Math.floor(stepsVal || 0)),
          distanceKm: +Math.max(0, distanceKmVal || 0).toFixed(2),
        };
        set({ logs });
      },

      setGoals: (g) => set({ goals: { ...get().goals, ...g } }),
      setUnits: (u) => set({ units: { ...get().units, ...u } }),
      setProfile: (p) => set({ profile: { ...get().profile, ...p } }),

      resetToday: () => {
        const dk = todayKey();
        const logs = { ...get().logs };
        logs[dk] = emptyLog(dk);
        set({ logs });
      },
    }),
    { name: "fittrack-store", storage: createJSONStorage(() => localStorage) }
  )
);
