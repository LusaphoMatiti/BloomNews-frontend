import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchPosts = () => {
  const { query } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const NEWS_API_KEY = "1ce89c4c404142139455a227022c065c";
  const GNEWS_API_KEY = "4c52dd2b3385d73e3fa62a6d13c75cfc";
  const CURRENTS_API_KEY = "TiOsrFXCBO15FRObDulPynIOMRr8C57O_fhcFjTIm-qoNK0C";

  const NEWS_API_URL = "https://newsapi.org/v2";
  const GNEWS_API_URL = "https://gnews.io/api/v4";
  const CURRENTS_API_URL = "https://api.currentsapi.services/v1";

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const [newsApiResponse, gnewsApiResponse, currentsApiResponse] =
          await Promise.all([
            axios.get(
              `${NEWS_API_URL}/everything?q=${query}&apiKey=${NEWS_API_KEY}`
            ),
            axios.get(
              `${GNEWS_API_URL}/search?q=${query}&token=${GNEWS_API_KEY}`
            ),
            axios.get(
              `${CURRENTS_API_URL}/search?keywords=${query}&apiKey=${CURRENTS_API_KEY}`
            ),
          ]);

        const newsApiArticles = newsApiResponse.data.articles || [];
        const gnewsApiArticles = gnewsApiResponse.data.articles || [];
        const currentsApiArticles = currentsApiResponse.data.news || [];

        const formattedNewsApiArticles = newsApiArticles.map((article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          source: article.source?.name || "NewsAPI",
        }));

        const formattedGnewsArticles = gnewsApiArticles.map((article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.image,
          source: article.source?.name || "GNews",
        }));

        const formattedCurrentsArticles = currentsApiArticles.map(
          (article) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.image,
            source: article.source || "CurrentsAPI",
          })
        );

        const allArticles = [
          ...formattedNewsApiArticles,
          ...formattedGnewsArticles,
          ...formattedCurrentsArticles,
        ];

        setArticles(allArticles);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPosts;
