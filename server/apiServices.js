import axios from "axios";

// Helper function to parse and normalize dates
const normalizeDate = (dateString) => {
  if (!dateString) return new Date();
  const parsedDate = new Date(dateString);
  return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};

// Base URLs
const NEWS_API_URL = "https://newsapi.org/v2";
const GNEWS_API_URL = "https://gnews.io/api/v4";
const CURRENTS_API_URL = "https://api.currentsapi.services/v1";
const GUARDIAN_API_URL = "https://content.guardianapis.com";

// Map categories to API-specific categories
const CATEGORY_MAP = {
  technology: "technology",
  business: "business",
  sports: "sports",
  entertainment: "entertainment",
  science: "science",
  health: "health",
  "world-news": "world",
  politics: "politics",
};

/**
 * Fetch data from News API
 */
export const fetchNewsAPI = async (category) => {
  const apiKey = process.env.NEWS_API_KEY;
  const mappedCategory = CATEGORY_MAP[category] || "trending news";

  if (!apiKey) {
    console.error("NEWS_API_KEY is not defined");
    return [];
  }

  try {
    const response = await axios.get(`${NEWS_API_URL}/top-headlines`, {
      params: {
        category: mappedCategory,
        language: "en",
        apiKey: apiKey,
      },
    });

    return response.data.articles
      .filter((item) => item.urlToImage)
      .map((item) => ({
        id: item.url,
        title: item.title,
        description: item.description,
        image: item.urlToImage || "https://via.placeholder.com/600x400",
        category: category,
        source: item.source?.name || "Unknown Source",
        published: normalizeDate(item.publishedAt),
        url: item.url,
      }));
  } catch (error) {
    console.error(
      "Error fetching data from News API:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Fetch data from GNews API
 */
export const fetchGNews = async (category) => {
  const apiKey = process.env.GNEWS_API_KEY;
  const mappedCategory = CATEGORY_MAP[category] || "trending news";

  if (!apiKey) {
    console.error("GNEWS_API_KEY is not defined");
    return [];
  }

  try {
    const response = await axios.get(`${GNEWS_API_URL}/top-headlines`, {
      params: {
        category: mappedCategory,
        apiKey: apiKey,
        lang: "en",
      },
    });
    return response.data.articles
      .filter((item) => item.image)
      .map((item) => ({
        id: item.url,
        title: item.title,
        description: item.description,
        image: item.image || "https://via.placeholder.com/600x400",
        category: category,
        source: item.source?.name || "Unknown Source",
        published: normalizeDate(item.publishedAt),
        url: item.url,
      }));
  } catch (error) {
    console.error(
      "Error fetching data from GNews API:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Fetch data from Currents API
 */
export const fetchCurrents = async (category) => {
  const apiKey = process.env.CURRENTS_API_KEY;
  const mappedCategory = CATEGORY_MAP[category];

  if (!apiKey) {
    console.error("CURRENTS_API_KEY is not defined");
    return [];
  }

  try {
    const response = await axios.get(`${CURRENTS_API_URL}/search`, {
      params: {
        category: mappedCategory,
        apiKey: apiKey,
        language: "en",
      },
    });
    return response.data.news
      .filter((item) => item.image) // Only include articles with images
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image || "https://via.placeholder.com/600x400",
        category: category,
        source: item.provider?.name || "Unknown Source",
        published: normalizeDate(item.published_date), // Normalize date
        url: item.url,
      }));
  } catch (error) {
    console.error(
      "Error fetching data from Currents API:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * Fetch data from The Guardian API
 */
export const fetchGuardian = async (category) => {
  const apiKey = process.env.GUARDIAN_API_KEY;
  const mappedCategory = CATEGORY_MAP[category];

  if (!apiKey) {
    console.error("GUARDIAN_API_KEY is not defined");
    return [];
  }

  try {
    const response = await axios.get(`${GUARDIAN_API_URL}/search`, {
      params: {
        category: mappedCategory,
        apiKey: apiKey,
        language: "en",
      },
    });
    return response.data.response.results
      .filter((item) => item.fields?.thumbnail) // Only include articles with images
      .map((item) => ({
        id: item.id,
        title: item.webTitle,
        description: item.fields?.trailText || "",
        image: item.fields?.thumbnail || "https://via.placeholder.com/600x400",
        category: category,
        source: "The Guardian",
        published: normalizeDate(item.webPublicationDate), // Normalize date
        url: item.webUrl,
      }));
  } catch (error) {
    console.error(
      "Error fetching data from The Guardian API:",
      error.response?.data || error.message
    );
    return [];
  }
};
