import { useState } from 'react';
import NoticeCard from './NoticeCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';


const Notices = ({ newsData }) => {
  const allCategories = ['Todas', ...new Set(newsData.flatMap(news => news.category))];
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [currentPage, setCurrentPage] = useState(1);

  const newsPerPage = 8;
  const filteredNews = selectedCategory === 'Todas'
    ? newsData
    : newsData.filter(news => news.category.includes(selectedCategory));

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const indexOfLast = currentPage * newsPerPage;
  const indexOfFirst = indexOfLast - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirst, indexOfLast);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset page on category change
  };

  return (
    <div className="notices-container">
      <div className="filter-buttons">
        {allCategories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="notices-grid">
        {currentNews.map(notice => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>

        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>

        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
    </div>
  );
};

export default Notices;