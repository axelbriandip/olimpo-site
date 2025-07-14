import { useParams, useNavigate, Link } from "react-router-dom";
import newsData from "../data/newsData.js";

const NewsDetail = () => {
  const { id } = useParams();
  const newsItem = newsData.find(item => item.id === Number(id));
  const navigate = useNavigate();

  if (!newsItem) return <p>Noticia no encontrada.</p>;

  // Filtrar noticias similares por categoría (sin incluir la actual)
  const relatedNews = newsData
    .filter(item =>
      item.id !== newsItem.id &&
      item.category.some(cat => newsItem.category.includes(cat))
    )
    .slice(0, 3); // Limita a 3 noticias

  return (
    <div className="news-detail-container">
      <img src={newsItem.image} alt={newsItem.title} className="news-detail-image" />
      <h1 className="news-detail-title">{newsItem.title}</h1>
      <p className="news-detail-content">{newsItem.content}</p>

      <div className="footer-nd">
        <p className="news-detail-date">{newsItem.date}</p>
        <button
          className="btn-back"
          onClick={() => navigate(-1)}
          aria-label="Volver a la página anterior">← Volver
        </button>
      </div>
      {relatedNews.length > 0 && (
        <div className="related-news-section">
          <h2 className="related-news-title">También puede interesarte</h2>
          <div className="related-news-list">
            {relatedNews.map(item => (
              <Link to={`/notices/${item.id}`} key={item.id} className="related-news-card">
                <img src={item.image} alt={item.title} className="related-news-image" />
                <div className="related-news-info">
                  <h3>{item.title}</h3>
                  <p className="related-news-summary">
                    {item.summary || item.content.slice(0, 100) + "..."}
                  </p>
                  <p className="related-news-date">{item.date}</p>
                </div>
              </Link>

            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
