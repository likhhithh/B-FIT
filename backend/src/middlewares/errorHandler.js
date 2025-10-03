import { ZodError } from "zod";
import { logger } from "../core/logger.js";

export function errorHandler(err, req, res, _next) {
  const isDev = process.env.NODE_ENV !== "production";

  let status = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let details = err.details;

  if (err instanceof ZodError) {
    status = 400;
    message = "Validation error";
    details = err.flatten();
  }

  // Mongoose duplicate key
  if (err?.code === 11000) {
    status = 409;
    message = "Duplicate key";
    details = err.keyValue;
  }

  logger.error({ err, url: req.originalUrl }, "Request error");
  res.status(status).json({
    success: false,
    message,
    details,
    ...(isDev ? { stack: err.stack } : {}),
  });
}
