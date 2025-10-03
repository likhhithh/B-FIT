import { env } from "./core/config/env.js";
import { connectDB } from "./core/config/db.js";
import { logger } from "./core/logger.js";
import app from "./app.js";

const port = Number(env.PORT || 5000);

async function start() {
  await connectDB();
  app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}`);
  });
}

start().catch((err) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});
