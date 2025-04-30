# BloomNews Website - (FullStack Project)

A fullstack, News Website that fetches live news across multiple APIs in real-time.
A full-stack news aggregation website

## Built with:

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js + Axios + External APIs

## Live Demo

- Frontend :

[🔗 View Site Here](https://bloom-news-frontend.vercel.app/)

- Backend API :

Backend API: [https://bloomnews-api.onrender.com/api/news?category=technology] (https://bloomnews-api.onrender.com/api/news?category=technology)

## 🧾 About

This project pulls headlines from 4 news sources:

1. NewsAPI.org
2. GNews.io
3. CurrentsAPI
4. The Guardian

And displays them in a clean UI using dynamic routing for categories like `/technology`, `/sports`, etc.

All API keys are used only in the backend → secure and CORS-free when deployed.

## Folder Structure

# BloomNews - Full-Stack News Aggregator

A full-stack news aggregation website built with:

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js + Axios + External APIs

Live on: [https://bloomnews-fe.vercel.app](https://bloomnews-fe.vercel.app)  
Backend API: [https://bloomnews-api.onrender.com/api/news?category=technology](https://bloomnews-api.onrender.com/api/news?category=technology)

---

## 🧾 About

This project pulls headlines from 4 news sources:

1. NewsAPI.org
2. GNews.io
3. CurrentsAPI
4. The Guardian

And displays them in a clean UI using dynamic routing for categories like `/technology`, `/sports`, etc.

All API keys are used only in the backend → secure and CORS-free when deployed.

---

## 📁 Folder Structure

BloomNews/
│
├── client/ # 👉 Frontend (React/Vite)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── utils/
│ │ └── App.jsx
│ ├── index.html
│ ├── vite.config.js
│ ├── package.json
│ └── .env # VITE_API_URL only
│
├── server/ # 👉 Backend (Express API proxy)
│ ├── routes/
│ ├── apiServices.js
│ ├── server.js
│ └── package.json
│
├── .gitignore
└── README.md # You're here!

## 🚀 Technologies Used

| Part      | Technology                                                |
| --------- | --------------------------------------------------------- |
| Frontend  | Vite + React + Tailwind CSS                               |
| Backend   | Express + Axios + Node.js                                 |
| Hosting   | Vercel (frontend), Render (backend API)                   |
| APIs Used | NewsAPI.org, GNews.io, CurrentsAPI.services, The Guardian |

## Why This Project Matters

This isn't a basic frontend project — it's a fullstack application that:

- Fetches real-time news from multiple trusted APIs (NewsAPI, GNews).

- Manages dynamic API integration securely using environment variables.

- Implements responsive design with a mobile-first approach.

- Features a custom-built, professional dropdown navigation for easy access to different categories.

- Handles API fallback gracefully, ensuring no broken layouts when data is missing.

- Blends UI/UX best practices with functional fullstack development.

## Future Improvements

- Use DB to cache results
- Create admin panel to manage categories
