import { useState, useEffect } from "react";
import NewsCard from "./NoticeCard";
import newsData from "../data/newsData.js"; // Asegúrate de que este archivo exista y tenga la estructura correcta

const categories = ["Todas", "Primera", "Juveniles", "Infantiles", "Institucional"];

const ITEMS_PER_PAGE = 9;

export default function Notices() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Volver a página 1 al cambiar de categoría
  }, [selectedCategory]);

  const filteredNews =
    selectedCategory === "Todas"
      ? newsData
      : newsData.filter((n) => n.category === selectedCategory);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="news-container">
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-button ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="news-grid">
        {paginatedNews.map((news) => (
          <NewsCard key={news.id} {...news} />
        ))}
        {paginatedNews.length === 0 && (
          <p className="no-news">No hay noticias en esta categoría.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              className={`page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
