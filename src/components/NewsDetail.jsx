// src/components/NewsDetail.jsx
import React, { useState, useEffect } from 'react'; // Necesitamos useState y useEffect
import { useParams, useNavigate, Link } from "react-router-dom";
import newsService from '../services/news.service'; // Importa el servicio de noticias
// import newsData from "../data/newsData.js"; // ¡Ya no se usa!

const NewsDetail = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();

  const [newsItem, setNewsItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]); // Para noticias relacionadas

  useEffect(() => {
    const fetchNewsAndRelated = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 1. Obtener la noticia principal por ID desde el backend
        // Tu newsService.getNewsByIdOrSlug ya maneja IDs numéricos
        const mainNewsData = await newsService.getNewsByIdOrSlug(id);
        setNewsItem(mainNewsData);

        // 2. Obtener todas las noticias para filtrar las relacionadas
        const allNews = await newsService.getAllNews();
        const activeAndPublishedNews = allNews.filter(n =>
          n.is_active && n.is_published && String(n.id) !== String(mainNewsData.id) // Excluir la noticia actual
        );

        let fetchedRelatedNews = [];
        if (mainNewsData.categories && mainNewsData.categories.length > 0) {
          // Si la noticia actual tiene categorías, busca otras noticias con al menos una categoría en común
          fetchedRelatedNews = activeAndPublishedNews.filter(n =>
            n.categories && n.categories.some(cat1 =>
              mainNewsData.categories.some(cat2 => cat1.id === cat2.id)
            )
          );
        }

        // Si no hay categorías o no se encontraron suficientes, toma las 3 últimas activas/publicadas
        // Asegúrate de que no haya duplicados con las ya encontradas por categoría
        const latestNews = activeAndPublishedNews
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
          .filter(n => !fetchedRelatedNews.some(related => related.id === n.id));

        fetchedRelatedNews = [...fetchedRelatedNews, ...latestNews].slice(0, 3);

        setRelatedNews(fetchedRelatedNews);

      } catch (err) {
        console.error(`Error al cargar la noticia con ID ${id}:`, err);
        setError(err.response?.data?.message || "No se pudo cargar el detalle de la noticia.");
        setNewsItem(null);
        setRelatedNews([]); // Limpiar relacionadas en caso de error
      } finally {
        setIsLoading(false);
      }
    };

    if (id) { // Solo si tenemos un ID, intentamos cargar la noticia
      fetchNewsAndRelated();
    }
  }, [id]); // Dependencia del ID para re-fetch

  if (isLoading) {
    return (
      <div className="news-detail-container">
        <p>Cargando noticia...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-detail-container">
        <p className="news-detail-error-message">{error}</p>
        <button
          className="btn-back"
          onClick={() => navigate(-1)}
          aria-label="Volver a la página anterior"
        >
          ← Volver
        </button>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="news-detail-container">
        <p>Noticia no encontrada.</p>
        <button
          className="btn-back"
          onClick={() => navigate(-1)}
          aria-label="Volver a la página anterior"
        >
          ← Volver
        </button>
      </div>
    );
  }

  return (
    <div className="news-detail-container">
      <img
        src={newsItem.featuredImageUrl || 'https://placehold.co/800x450/cccccc/333333?text=Sin+Imagen'}
        alt={newsItem.featuredImageAltText || newsItem.title}
        className="news-detail-image"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x450/cccccc/333333?text=Sin+Imagen'; }}
      />
      <h1 className="news-detail-title">{newsItem.title}</h1>
      {newsItem.subtitle && <h2 className="news-detail-subtitle">{newsItem.subtitle}</h2>}
      <p className="news-detail-content">{newsItem.content}</p>

      <div className="footer-nd">
        <p className="news-detail-date">
          {newsItem.publishedAt
            ? new Date(newsItem.publishedAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            : 'Fecha Desconocida'}
        </p>
        <button
          className="btn-back"
          onClick={() => navigate(-1)}
          aria-label="Volver a la página anterior"
        >
          ← Volver
        </button>
      </div>

      {newsItem.videoUrl && (
        <div className="news-detail-video-wrapper">
          <iframe
            width="560"
            height="315"
            src={newsItem.videoUrl.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {relatedNews.length > 0 && (
        <div className="related-news-section">
          <h2 className="related-news-title">También puede interesarte</h2>
          <div className="related-news-list">
            {relatedNews.map(item => (
              <Link to={`/notices/${item.id}`} key={item.id} className="related-news-card">
                <img
                  src={item.featuredImageUrl || 'https://placehold.co/150x100/cccccc/333333?text=Sin+Imagen'}
                  alt={item.title}
                  className="related-news-image"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x100/cccccc/333333?text=Sin+Imagen'; }}
                />
                <div className="related-news-info">
                  <h3>{item.title}</h3>
                  <p className="related-news-summary">
                    {item.summary || (item.content ? item.content.slice(0, 100) + "..." : '')}
                  </p>
                  <p className="related-news-date">
                    {item.publishedAt
                      ? new Date(item.publishedAt).toLocaleDateString('es-ES')
                      : 'Fecha Desconocida'}
                  </p>
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