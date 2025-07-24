// src/components/NoticeCard.jsx
import { Link } from "react-router-dom";

const NoticeCard = ({ notice }) => {
  // Desestructuramos los campos del backend
  const { id, title, summary, content, featuredImageUrl, publishedAt, categories } = notice;

  // Asegurarse de que el summary exista, si no, tomar un extracto del contenido
  const displaySummary = summary || (content ? content.slice(0, 150) + "..." : '');

  // Formatear la fecha
  const displayDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    : 'Fecha Desconocida';

  return (
    <div className="notice-card">
      <Link to={`/notices/${id}`}> {/* Enlaza a la página de detalle por ID */}
        <img
          src={featuredImageUrl || 'https://placehold.co/300x200/cccccc/333333?text=Sin+Imagen'}
          alt={title}
          className="notice-image"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x200/cccccc/333333?text=Sin+Imagen'; }}
        />
      </Link>
      <div className="notice-content">
        <h3 className="notice-title">{title}</h3>
        <p className="notice-summary">{displaySummary}</p>
        <p className="notice-date">{displayDate}</p>
        <div className="notice-categories">
          {/* Mapea los nombres de las categorías del array de objetos */}
          {categories && categories.map((cat) => (
            <span key={cat.id} className="notice-category">{cat.name}</span>
          ))}
        </div>
        <Link to={`/notices/${id}`}>
          <button className="notice-button">Ver más</button>
        </Link>
      </div>
    </div>
  );
};

export default NoticeCard;
