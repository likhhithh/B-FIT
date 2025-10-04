import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../hooks/useToast";
import { CheckCircle2, XCircle, Info } from "lucide-react";

export default function Toaster() {
  const { toasts, dismiss } = useToast();

  useEffect(() => {
    // Auto-dismiss
    const timers = toasts.map((t) =>
      setTimeout(() => dismiss(t.id), t.duration ?? 2500)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, dismiss]);

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="flex items-start gap-2 rounded-lg border border-slate-200/70 dark:border-white/10 bg-white/90 dark:bg-[#0F172A]/90 px-3 py-2 shadow-md backdrop-blur"
          >
            <div className="mt-0.5">
              {t.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : t.type === "error" ? (
                <XCircle className="w-5 h-5 text-red-600" />
              ) : (
                <Info className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div className="text-sm">
              {t.title && <div className="font-medium">{t.title}</div>}
              {t.message && (
                <div className="text-slate-600 dark:text-slate-300">
                  {t.message}
                </div>
              )}
            </div>
            <button
              className="ml-2 text-slate-500 hover:text-slate-700"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
