const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // HTTP request logger

// ── API Documentation ─────────────────────────────────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth", require("./routes/auth"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/books", require("./routes/books"));
app.use("/api/students", require("./routes/students"));
app.use("/api/attendants", require("./routes/attendants"));

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "School Library API is running 📚" });
});

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// ── Centralized Error Handler ──────────────────────────────────
app.use(errorHandler);

module.exports = app;
