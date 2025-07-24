// src/components/NoticesLatest.jsx
import React, { useState, useEffect } from 'react'; // Importa useState y useEffect
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import newsService from '../services/news.service'; // Importa el servicio de noticias

// Ya no necesitamos importar imágenes locales ni la constante 'notices' hardcodeada
// import clasicoImg from "../assets/imgs/welcome-carousel/juli.jpg";
// import indumentariaImg from "../assets/imgs/welcome-carousel/lisi.jpg";
// import juvenilesImg from "../assets/imgs/welcome-carousel/rafa.jpg";
// const notices = [...]; // Esta constante será eliminada

const NoticesLatest = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setIsLoading(true);
        const data = await newsService.getAllNews(); // Obtiene todas las noticias desde el backend

        // Filtra solo las noticias activas y publicadas
        const activeAndPublishedNotices = data.filter(notice => notice.is_active && notice.is_published);

        // Ordena las noticias por fecha de publicación de forma descendente (más recientes primero)
        // Se asume que 'publishedAt' es una cadena de fecha que Date.parse puede entender (ej. ISO 8601 o YYYY-MM-DD)
        const sortedNotices = activeAndPublishedNotices.sort((a, b) => {
          const dateA = new Date(a.publishedAt);
          const dateB = new Date(b.publishedAt);

          // Manejar fechas inválidas para evitar errores de comparación
          if (isNaN(dateA.getTime())) return 1; // Si dateA es inválida, b va primero
          if (isNaN(dateB.getTime())) return -1; // Si dateB es inválida, a va primero

          return dateB - dateA; // Orden descendente
        });

        // Toma las últimas 3 noticias de la lista ordenada
        setNotices(sortedNotices.slice(0, 3));
        setError(null); // Limpia cualquier error previo
      } catch (err) {
        console.error("Error al cargar las noticias recientes:", err);
        setError(err.response?.data?.message || "No se pudieron cargar las noticias recientes. Intenta de nuevo más tarde.");
        setNotices([]); // Asegura que el estado sea un array vacío en caso de error
      } finally {
        setIsLoading(false); // Finaliza el estado de carga
      }
    };

    fetchNotices();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  if (isLoading) {
    return (
      <section className="notices-latest">
        <h2>Cargando Noticias Recientes...</h2>
        <p className="subtitle">Un momento por favor.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="notices-latest">
        <h2>Error al cargar Noticias</h2>
        <p className="subtitle error-message">{error}</p>
      </section>
    );
  }

  if (notices.length === 0) {
    return (
      <section className="notices-latest">
        <h2>Noticias Recientes</h2>
        <p className="subtitle">Actualmente no hay noticias recientes disponibles.</p>
      </section>
    );
  }

  return (
    <section className="notices-latest">
      <h2>Noticias Recientes</h2>
      <p className="subtitle">Sigue las novedades del Club Olimpo: partidos, eventos y mucho más aquí.</p>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id}>
            <img
              // Usa featuredImageUrl del backend. Proporciona un fallback si la URL es nula o inválida.
              src={notice.featuredImageUrl || 'https://placehold.co/110x75/cccccc/333333?text=Sin+Imagen'}
              alt={notice.title}
              className="notices-latest__image"
              width={110}
              height={75}
              // Manejo de error para la imagen: si la URL de la imagen falla, muestra un placeholder
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/110x75/cccccc/333333?text=Sin+Imagen'; }}
            />
            <div className="notices-latest__info">
              <h3>{notice.title}</h3>
              <p>{notice.summary}</p>
              <div className="notices-latest__bottom-row">
                <small>
                  {/* Formatea la fecha 'publishedAt' a un formato legible en español */}
                  {notice.publishedAt
                    ? new Date(notice.publishedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                    : 'Fecha Desconocida'}
                </small>
                {/* El botón "Ver más" usa Link para navegar a la ruta de detalle por ID */}
                <Link to={`/notices/${notice.id}`} className="notices-latest__button">
                  Ver más
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NoticesLatest;
