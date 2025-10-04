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

/**
 * Estimate distance (km) from steps using average stride length.
 * Default stride: 0.78 m (~2.56 ft)
 */
export function estimateDistanceKmFromSteps(steps, strideMeters = 0.78) {
  if (!steps || steps <= 0) return 0;
  return +((steps * strideMeters) / 1000).toFixed(2);
}

/**
 * Approx calories for walking ≈ 0.9 kcal/kg/km
 * (Running ~1.0, walking lighter ~0.8–0.9; we use 0.9 as a reasonable default)
 */
export function caloriesFromWalking(weightKg, distanceKm) {
  if (!weightKg || !distanceKm) return 0;
  return Math.round(weightKg * 0.9 * distanceKm);
}

/**
 * Convenience: calories from steps (using stride to estimate distance)
 */
export function caloriesFromSteps(steps, weightKg, strideMeters = 0.78) {
  const km = estimateDistanceKmFromSteps(steps, strideMeters);
  return caloriesFromWalking(weightKg, km);
}
