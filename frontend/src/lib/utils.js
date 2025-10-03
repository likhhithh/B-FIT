export const todayKey = () => formatDateKey(new Date());

export function formatDateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function uid(prefix = "") {
  return (
    prefix +
    Math.random().toString(36).slice(2, 7) +
    Math.random().toString(36).slice(2, 7)
  );
}

export function mlToOz(ml) {
  return +(ml / 29.5735).toFixed(1);
}

export function clamp(n, min = 0, max = 1) {
  return Math.max(min, Math.min(max, n));
}
