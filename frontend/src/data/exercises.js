// kind: 'cardio' or 'strength'; MET used for calorie calc
export const EXERCISES = [
  // Walking/Running
  { id: "walk-3", name: "Walking (3 mph)", kind: "cardio", MET: 3.3 },
  { id: "walk-4", name: "Walking (4 mph)", kind: "cardio", MET: 5.0 },
  { id: "run-5", name: "Running (5 mph)", kind: "cardio", MET: 8.3 },
  { id: "run-6", name: "Running (6 mph)", kind: "cardio", MET: 9.8 },
  { id: "run-7", name: "Running (7 mph)", kind: "cardio", MET: 11.0 },
  // Cycling/Row/Swim
  { id: "cycle-10-12", name: "Cycling (10–12 mph)", kind: "cardio", MET: 6.0 },
  { id: "cycle-12-14", name: "Cycling (12–14 mph)", kind: "cardio", MET: 8.0 },
  { id: "row-moderate", name: "Rowing (moderate)", kind: "cardio", MET: 7.0 },
  {
    id: "swim-moderate",
    name: "Swimming (moderate)",
    kind: "cardio",
    MET: 6.0,
  },
  { id: "jump-rope", name: "Jump rope", kind: "cardio", MET: 12.3 },
  // Classes
  { id: "yoga", name: "Yoga", kind: "cardio", MET: 3.0 },
  { id: "hiit", name: "HIIT (circuit)", kind: "cardio", MET: 8.0 },
  // Strength (gym) — sets/reps support
  {
    id: "strength-moderate",
    name: "Strength training (moderate)",
    kind: "strength",
    MET: 3.5,
  },
  {
    id: "strength-vigorous",
    name: "Strength training (vigorous)",
    kind: "strength",
    MET: 6.0,
  },
  { id: "bench-press", name: "Bench Press", kind: "strength", MET: 3.5 },
  { id: "squat", name: "Back Squat", kind: "strength", MET: 5.0 },
  { id: "deadlift", name: "Deadlift", kind: "strength", MET: 5.5 },
  { id: "ohp", name: "Overhead Press", kind: "strength", MET: 4.0 },
  { id: "lat-pulldown", name: "Lat Pulldown", kind: "strength", MET: 3.5 },
  { id: "row-db", name: "Dumbbell Row", kind: "strength", MET: 3.5 },
  { id: "curl-db", name: "Dumbbell Curl", kind: "strength", MET: 3.0 },
  { id: "leg-press", name: "Leg Press", kind: "strength", MET: 4.5 },
];
