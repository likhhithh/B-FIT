import { create } from "zustand";

let idSeq = 0;

export const useToast = create((set, get) => ({
  toasts: [],
  show: ({ type = "info", title, message, duration = 2500 }) => {
    const id = ++idSeq;
    const toast = { id, type, title, message, duration };
    set({ toasts: [...get().toasts, toast] });
    return id;
  },
  dismiss: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));
