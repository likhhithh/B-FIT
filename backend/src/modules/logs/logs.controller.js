import Log from "./log.model.js";

async function getOrCreateLog(userId, date) {
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

export async function getLog(req, res, next) {
  try {
    const { date } = req.params;
    const log = await getOrCreateLog(req.user.id, date);
    res.json({ success: true, log });
  } catch (err) {
    next(err);
  }
}

export async function addWater(req, res, next) {
  try {
    const { date } = req.params;
    const { amount } = req.body;
    const log = await getOrCreateLog(req.user.id, date);
    log.waterMl += amount;
    await log.save();
    res.json({ success: true, waterMl: log.waterMl });
  } catch (err) {
    next(err);
  }
}

export async function addFood(req, res, next) {
  try {
    const { date } = req.params;
    const log = await getOrCreateLog(req.user.id, date);
    log.foods.unshift(req.body);
    await log.save();
    res.status(201).json({ success: true, entry: log.foods[0] });
  } catch (err) {
    next(err);
  }
}

export async function removeFood(req, res, next) {
  try {
    const { date, entryId } = req.params;
    const log = await getOrCreateLog(req.user.id, date);
    log.foods.id(entryId)?.remove();
    await log.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function addWorkout(req, res, next) {
  try {
    const { date } = req.params;
    const log = await getOrCreateLog(req.user.id, date);
    log.workouts.unshift(req.body);
    await log.save();
    res.status(201).json({ success: true, entry: log.workouts[0] });
  } catch (err) {
    next(err);
  }
}

export async function removeWorkout(req, res, next) {
  try {
    const { date, entryId } = req.params;
    const log = await getOrCreateLog(req.user.id, date);
    log.workouts.id(entryId)?.remove();
    await log.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
