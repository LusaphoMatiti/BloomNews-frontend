import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchNewsAPI,
  fetchGNews,
  fetchCurrents,
  fetchGuardian,
} from "../api/apiService";
import NewsCard from "./NewsCard";

const NewsList = () => {
  const { category: rawCategory } = useParams();
  const category = rawCategory || "trending";
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsApiData, gnewsData, currentsData, guardianData] =
          await Promise.all([
            fetchNewsAPI(category),
            fetchGNews(category),
            fetchCurrents(category),
            fetchGuardian(category),
          ]);

        const combinedData = [
          ...newsApiData,
          ...gnewsData,
          ...currentsData,
          ...guardianData,
        ];

        const uniqueData = Array.from(
          new Map(combinedData.map((item) => [item.url, item])).values()
        );

        setNews(uniqueData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto py-10 md:pl-5">
      <h1 className="text-3xl text-gray-900 font-bold mb-6 capitalize">
        {category.replace("_", " ")} News
      </h1>

      <div className="lg:flex lg:gap-8">
        {/* Left scrollable column */}
        <div className="lg:w-2/3">
          {news.length > 0 ? (
            <>
              {/* Featured article */}
              <NewsCard post={news[0]} isFeatured />

              {/* Divider */}
              <hr className="my-6" />

              {/* Remaining articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.slice(1).map((post) => (
                  <NewsCard key={post.url} post={post} />
                ))}
                <div className="bg-gray-500 w-full h-[1px] block md:hidden sm:mb-5"></div>
              </div>
            </>
          ) : (
            <p>No news available for this category.</p>
          )}
        </div>

        {/* Right fixed column (desktop only) */}
        <div className="hidden lg:block w-[290px]">
          <div className="sticky top-24 space-y-6">
            <h2 className="text-xl font-semibold mb-2">Top Picks</h2>
            {news.slice(1, 5).map((post) => (
              <NewsCard key={post.url} post={post} isCompact />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
