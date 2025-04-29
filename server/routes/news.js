// server/routes/news.js

import express from "express";
import {
  fetchNewsAPI,
  fetchGNews,
  fetchCurrents,
  fetchGuardian,
} from "../apiServices.js";

const router = express.Router();

// GET /api/news?category=technology
router.get("/", async (req, res) => {
  const validCategories = [
    "technology",
    "business",
    "sports",
    "entertainment",
    "science",
    "health",
    "world-news",
    "politics",
  ];
  const category = validCategories.includes(req.query.category)
    ? req.query.category
    : "technology";

  try {
    // Fetch from all services in parallel
    const [newsApiData, gnewsData, currentsData, guardianData] =
      await Promise.all([
        fetchNewsAPI(category),
        fetchGNews(category),
        fetchCurrents(category),
        fetchGuardian(category),
      ]);

    // Combine results
    const allNews = [
      ...newsApiData,
      ...gnewsData,
      ...currentsData,
      ...guardianData,
    ];

    // Send response
    res.json({ category, total: allNews.length, news: allNews });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

export default router;
