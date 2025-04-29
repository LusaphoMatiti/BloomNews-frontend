import axios from "axios";
import Parser from "rss-parser";

const parser = new Parser();

// Helper function to parse and normalize dates
const normalizeDate = (dateString) => {
  if (!dateString) return new Date(); // Default to current date if no date is provided
  const parsedDate = new Date(dateString);
  return isNaN(parsedDate.getTime()) ? new Date() : parsedDate; // Return valid date or current date
};

// API Keys
const NEWS_API_KEY = "1ce89c4c404142139455a227022c065c";
const GNEWS_API_KEY = "4c52dd2b3385d73e3fa62a6d13c75cfc";
const CURRENTS_API_KEY = "TiOsrFXCBO15FRObDulPynIOMRr8C57O_fhcFjTIm-qoNK0C";
const GUARDIAN_API_KEY = "a2daa2bd-13a8-48e0-8498-dfc40ba1637d";

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
  const mappedCategory = CATEGORY_MAP[category];
  try {
    const response = await axios.get(`${NEWS_API_URL}/top-headlines`, {
      params: {
        category: mappedCategory,
        apiKey: NEWS_API_KEY,
        language: "en",
      },
    });
    return response.data.articles
      .filter((item) => item.urlToImage) // Only include articles with images
      .map((item) => ({
        id: item.url,
        title: item.title,
        description: item.description,
        image: item.urlToImage || "https://via.placeholder.com/600x400",
        category: category,
        source: item.source?.name || "Unknown Source",
        published: normalizeDate(item.publishedAt), // Normalize date
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
  const mappedCategory = CATEGORY_MAP[category] || "trending news";
  try {
    const response = await axios.get(`${GNEWS_API_URL}/top-headlines`, {
      params: {
        topic: mappedCategory, // GNews uses "topic" instead of "category"
        token: GNEWS_API_KEY, // GNews uses "token" instead of "apiKey"
        lang: "en", // Ensure English-only results
      },
    });
    return response.data.articles
      .filter((item) => item.image) // Only include articles with images
      .map((item) => ({
        id: item.url,
        title: item.title,
        description: item.description,
        image: item.image || "https://via.placeholder.com/600x400",
        category: category,
        source: item.source?.name || "Unknown Source",
        published: normalizeDate(item.publishedAt), // Normalize date
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
  const mappedCategory = CATEGORY_MAP[category];
  try {
    const response = await axios.get(`${CURRENTS_API_URL}/search`, {
      params: {
        topic: mappedCategory, // GNews uses "topic" instead of "category"
        apiKey: CURRENTS_API_KEY,
        language: "en", // Ensure English-only results
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
  const mappedCategory = CATEGORY_MAP[category];
  try {
    const response = await axios.get(`${GUARDIAN_API_URL}/search`, {
      params: {
        section: mappedCategory,
        "api-key": GUARDIAN_API_KEY,
        "show-fields": "thumbnail", // Request thumbnails
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
