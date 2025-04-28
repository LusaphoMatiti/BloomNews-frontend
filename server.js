// server.js
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/news", async (req, res) => {
  try {
    const { category } = req.query;
    const response = await axios.get(
      "https://api.currentsapi.services/v1/search",
      {
        params: {
          apiKey: process.env.CURRENTS_API_KEY,
          language: "en",
          category: category || "",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
