import { useParams, useNavigate } from "react-router-dom";
import newsData from "../data/newsData.js"; // donde tengas tus noticias
import { Link } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();
  const newsItem = newsData.find(item => item.id === Number(id));

  if (!newsItem) return <p>Noticia no encontrada.</p>;
  const navigate = useNavigate();

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
    </div>
  );
};

export default NewsDetail;