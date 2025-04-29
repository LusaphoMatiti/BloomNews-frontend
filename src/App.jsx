import "./index.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SearchPosts from "./utils/searchPosts";
import About from "./pages/About";

// import CategoryPage from "./pages/CategoryPage";
import NewsList from "./components/NewsList";
import Philosophy from "./pages/Philosophy";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/about" element={<About />} />
        <Route path="/our_philosophy" element={<Philosophy />} />
        {/* Dynamic category routes */}
        <Route path="/category/:category" element={<NewsList />} />

        <Route path="/search/:query" element={<SearchPosts />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
