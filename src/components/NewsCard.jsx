const NewsCard = ({ post, isFeatured, isCompact }) => {
  const formattedDate = new Date(post.published).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`bg-gray-100 ${
        isFeatured
          ? "lg:grid lg:grid-cols-2 lg:gap-6 items-center   "
          : "sm:mb-5"
      } overflow-hidden rounded-lg shadow-lg `}
    >
      <div>
        <img
          className={`object-cover object-center w-full rounded-lg ${
            isFeatured ? "h-100  w-full " : isCompact ? "h-40" : "h-64 lg:h-80"
          }w-full h-64`}
          src={post.image || "https://via.placeholder.com/600x400"}
          alt={post.title}
        />
      </div>

      <div className={`${isFeatured ? "mt-0" : "mt-2"} px-6 pb-6`}>
        <span className="text-blue-500 text-sm">{post.category}</span>
        <h1
          className={`mt-4 font-semibold text-gray-800 dark:text-white ${
            isFeatured ? "text-3xl" : isCompact ? "text-lg" : "text-xl"
          }`}
        >
          {post.title}
        </h1>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate}
          </p>
          <a
            href={post.url}
            className="inline-block text-blue-500 hover:underline hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
