import Log from "./log.model.js";

export async function getOrCreateLog(userId, date) {
  let log = await Log.findOne({ user: userId, date });
  if (!log) {
    log = await Log.create({
      user: userId,
      date,
      waterMl: 0,
      foods: [],
      workouts: [],
    });
  }
  return log;
}

export async function addWaterToLog(userId, date, amount) {
  const log = await getOrCreateLog(userId, date);
  log.waterMl += amount;
  await log.save();
  return log;
}
