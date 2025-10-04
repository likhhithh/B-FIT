import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import routes from "./routes/index.js";
import { env } from "./core/config/env.js";

const app = express();

app.use(helmet());

// Build CORS allowlist from env (comma-separated)
const allowlist = (env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow Postman/curl (no origin) and any origin in allowlist
    if (!origin || allowlist.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

// Apply CORS globally (handles preflight too). DO NOT use app.options('*', ...) on Express 5.
app.use(cors(corsOptions));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use("/api", apiLimiter, routes);
app.use(notFound);
app.use(errorHandler);

export default app;
