// server.js
import express from "express";
import cors from "cors";
import newsRouter from "./routes/news.js";

const app = express();

// Middleware
app.use(cors()); // Allow all CORS requests
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/news", newsRouter);

// Basic health check route
app.get("/", (req, res) => {
  res.json({ message: "News API is running" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
