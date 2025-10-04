import { create } from "zustand";
import { api } from "../lib/api";
import { formatDateKey } from "../lib/utils";

function errMsg(e) {
  return e?.response?.data?.message || e?.message || "Something went wrong";
}

function dayDiff(a, b) {
  const A = new Date(a + "T00:00:00");
  const B = new Date(b + "T00:00:00");
  return Math.round((B - A) / (1000 * 60 * 60 * 24));
}

export const useAuth = create((set, get) => ({
  user: null,
  initialized: false,
  loading: false,
  error: null,
  info: null,
  // streak
  streakCount: Number(localStorage.getItem("bfit-streak-count") || 0),
  lastLoginDate: localStorage.getItem("bfit-streak-last") || null,

  _updateStreak() {
    const today = formatDateKey(new Date());
    const last = get().lastLoginDate;
    let count = get().streakCount || 0;

    if (!last) {
      count = 1;
    } else {
      const diff = dayDiff(last, today);
      if (diff === 0) {
        // same day, keep
      } else if (diff === 1) {
        count = count + 1;
      } else if (diff > 1) {
        count = 1; // broke streak
      }
    }
    localStorage.setItem("bfit-streak-count", String(count));
    localStorage.setItem("bfit-streak-last", today);
    set({ streakCount: count, lastLoginDate: today });
  },

  async fetchMe() {
    set({ loading: true, error: null, info: null });
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data.user });
      get()._updateStreak();
    } catch (_) {
      set({ user: null });
    } finally {
      set({ initialized: true, loading: false });
    }
  },

  async login(email, password) {
    set({ loading: true, error: null, info: null });
    try {
      const { data } = await api.post("/auth/login", { email, password });
      set({ user: data.user });
      get()._updateStreak();
      return true;
    } catch (e) {
      set({ error: errMsg(e) });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  async register(name, email, password) {
    set({ loading: true, error: null, info: null });
    try {
      await api.post("/auth/register", { name, email, password });
      set({ info: "Registered successfully. Please log in." });
      return true;
    } catch (e) {
      set({ error: errMsg(e) });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (_) {}
    set({ user: null });
  },
}));
