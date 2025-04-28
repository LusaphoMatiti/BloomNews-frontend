import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [isGoogleInitialized, setIsGoogleInitialized] = useState(false);
  const currentCategory = location.pathname.split("/").pop();

  const navigate = useNavigate();

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

  return (
    <footer className="bg-gray-200">
      <div className="container px-6 py-12 mx-auto">
        <div className="md:flex md:-mx-3 md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">
            Subscribe to our newsletter to get updates.
          </h1>
          <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
            <button
              onClick={handleLogin}
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm text-white duration-300 bg-gray-800 rounded-lg gap-x-3 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 cursor-pointer"
            >
              <span> Sign Up Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr className="my-6 border-gray-200 md:my-10 dark:border-700" />
        <div className="grid grid-cols-1 gap-6 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <p className="font-semibold text-gray-600 dark:text-white">
              Quick Link
            </p>
            <div className="flex flex-col text-gray-600 items-start mt-5 space-y-2">
              <a href="/">Home</a>
              <a href="/about">Who We Are</a>
              <a href="/our_philosophy">Our Philosophy</a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Industries</p>

            <div className="flex flex-col text-gray-600 mt-5 dark:text-white space-y-2">
              <a href="/">World-News</a>
              <a href="/category/technology">Technology</a>
              <a href="/category/business">Business</a>
              <a href="/category/sports">Sports</a>
              <a href="/category/entertainment">Entertainment</a>
              <a href="/category/science">Science</a>
              <a href="/category/health">Health</a>
              <a href="/category/politics">Politics</a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Follow us on
            </p>
            <div className="flex  items-start mt-5 space-x-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.876v-6.987h-2.54v-2.889h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.465h-1.26c-1.243 0-1.63.772-1.63 1.562v1.879h2.773l-.443 2.889h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.1a9.86 9.86 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.944 13.944 0 0 1 1.671 3.15 4.915 4.915 0 0 0 3.18 9.723a4.902 4.902 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.902 4.902 0 0 1-2.224.085 4.918 4.918 0 0 0 4.588 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.213c9.058 0 14.01-7.506 14.01-14.01 0-.213-.005-.426-.014-.637A10.012 10.012 0 0 0 24 4.557z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM12 7.25a4.75 4.75 0 1 1 0 9.5a4.75 4.75 0 0 1 0-9.5zM18.5 6.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0zM12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <p className="font-bold text-gray-600 dark:text-white">
              Contact Us
            </p>
            <div className="flex flex-col mt-5 text-gray-600 space-y-2">
              <p>+27 77768 473 4978</p>
              <a href="mailto:lusaphomatiti07@gmail.com">
                info@bloomnews.co.za
              </a>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-400 md:my-10 dark:border-gray-700" />
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <a href="/" className="flex">
            <img className="w-auto h-6 sm:h-7" src="/logo.png" alt="logo" />
            <h1 className="text-xl font-semibold">BloomNews</h1>
          </a>
          <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">
            Developed by <a href="https://www.lmdevpro.co.za/">LMDevPro</a>©
            Copyright 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
