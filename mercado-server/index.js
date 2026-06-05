require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

/* =========================
   Middleware
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   CORS Setup
   Allows any localhost port:
   - localhost:5173
   - localhost:5174
   - localhost:5175
   - localhost:5176
   - etc.
========================= */

const allowedOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS
    ? process.env.CLIENT_URLS.split(",").map((url) => url.trim())
    : []),
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow requests from Postman, curl, server-to-server, or same-origin
    if (!origin) {
      return callback(null, true);
    }

    // Allow exact URLs from .env
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow any localhost frontend port during development
    const isLocalhost =
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:");

    if (isLocalhost) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },

  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

/* =========================
   Basic Routes
========================= */

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Mercado Princess skincare server is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    server: "running",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

/* =========================
   Database Guard
   This prevents API routes from running
   if MongoDB is disconnected.
========================= */

app.use("/api", (req, res, next) => {
  // Let browser preflight requests pass
  if (req.method === "OPTIONS") {
    return next();
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      ok: false,
      message:
        "Database is not connected. Check MongoDB Atlas, DNS, Network Access, or .env MONGO_URI.",
    });
  }

  return next();
});

/* =========================
   API Routes
========================= */

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

/* =========================
   404 Handler
========================= */

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* =========================
   Error Handler
========================= */

app.use((err, req, res, next) => {
  console.error("Server error:", err.stack || err.message);

  res.status(500).json({
    ok: false,
    message: err.message || "Server Error",
  });
});

/* =========================
   Start Server
========================= */

const PORT = process.env.PORT || 5000;

connectDB().catch((error) => {
  console.error(`MongoDB connection error: ${error.message}`);
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Mercado server running on port ${PORT}`);
  });
}

module.exports = app;