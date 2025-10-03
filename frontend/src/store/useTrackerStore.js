import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { formatDateKey, todayKey, uid } from "../lib/utils";

function emptyLog(dateKey) {
  return { date: dateKey, foods: [], waterMl: 0, workouts: [] };
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
      },
      units: { water: "ml", weight: "kg" },
      profile: { weightKg: 70 },

      setSelectedDate: (date) => set({ selectedDate: formatDateKey(date) }),

      addWater: (ml, date) => {
        const dk = formatDateKey(date ?? new Date());
        const logs = { ...get().logs };
        const log = logs[dk] ?? emptyLog(dk);
        logs[dk] = { ...log, waterMl: log.waterMl + ml };
        set({ logs });
      },

      addFood: (item, date) => {
        const dk = formatDateKey(date ?? new Date());
        const logs = { ...get().logs };
        const log = logs[dk] ?? emptyLog(dk);
        const newItem = {
          ...item, // expects: name, calories, protein, carbs, fat, fiber?, quantity?
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
          ...item, // expects: type, durationMin?, calories
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
    {
      name: "fittrack-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
