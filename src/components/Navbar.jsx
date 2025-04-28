import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGoogleInitialized, setIsGoogleInitialized] = useState(false);
  const location = useLocation();
  const currentCategory = location.pathname.split("/").pop();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null); // Close dropdowns when mobile menu opens
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id:
            "30815073278-57g1i1k1maia89q0f8skosl8oe1hndbg.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });
        setIsGoogleInitialized(true);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Token:", response.credential);
  }

  const handleLogin = () => {
    if (isGoogleInitialized) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to manual popup if One Tap is blocked
          window.open(
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=30815073278-57g1i1k1maia89q0f8skosl8oe1hndbg.apps.googleusercontent.com&redirect_uri=${window.location.origin}&response_type=token&scope=openid%20profile%20email`,
            "_blank",
            "width=500,height=600"
          );
        }
      });
    } else {
      console.error("Google Sign-In is not initialized yet.");
    }
  };

  const categories = [
    "technology",
    "business",
    "sports",
    "entertainment",
    "science",
    "health",
    "world-news",
    "politics",
  ];

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-3 mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2">
                <img className="w-auto h-6 sm:h-7" src="/logo.png" alt="logo" />
                <h1 className="text-2xl font-semibold">BloomNews</h1>
              </a>

              {/* Desktop Search */}
              <div className="hidden mx-10 md:block">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                aria-label="toggle menu"
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Menu Links */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-2 bg-white top-24 dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:flex md:items-center transition-all duration-300 ease-in-out ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full md:opacity-100 md:translate-x-0"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
              <li className="relative list-none">
                <button
                  onClick={() => toggleDropdown("manage")}
                  className="flex items-center ml-2 px-5  w-[15vh] md:w-[12vh] py-2  text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 rounded-lg cursor-pointer"
                >
                  More
                  <svg
                    className="w-2.5 h-2.5 ms-1 sm:ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {activeDropdown === "manage" && (
                  <div className="absolute z-50 mt-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                    <div className="py-1">
                      <a
                        href="/about"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        Who We Are
                      </a>
                      <a
                        href="/our_philosophy"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        Our Philosophy
                      </a>
                    </div>
                  </div>
                )}
              </li>

              <button
                onClick={handleLogin}
                className="my-2 text-sm  w-[15vh]   py-2 leading-5 text-gray-700 transition duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 md:my-0 cursor-pointer hover:bg-gray-300 rounded-lg"
              >
                Log In
              </button>
              <button
                onClick={handleLogin}
                className="my-2 w-[15vh] rounded-lg py-2 text-sm leading-5 text-white bg-gray-700 transition duration-300 transform hover:bg-gray-600 md:my-0 cursor-pointer md:mr-5"
              >
                Sign Up
              </button>
              <a
                href="/"
                className="my-2 text-sm py-2 leading-5 text-gray-700 transition duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0"
              >
                Trending News
              </a>
            </div>

            {/* Mobile Search */}
            <div className="my-4 md:hidden">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Sub-Nav */}
        <div className="py-3 mt-3 -mx-3 overflow-x-auto whitespace-nowrap scroll-hidden">
          {categories.map((category, idx) => (
            <Link
              key={idx}
              to={`/category/${category}`}
              className={`mx-4 text-sm leading-5 transition duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline ${
                currentCategory === category ? "text-blue-600 font-bold" : ""
              }`}
            >
              {category
                .replace("_", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
