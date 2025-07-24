// src/pages/NoticesPage.jsx
import React, { useState, useEffect } from 'react'; // Necesitamos useState y useEffect
import PageHeader from "../components/PageHeader";
import SponsorsSlider from '../components/SponsorsSlider';
import Notices from "../components/Notices"; // Importa el componente Notices
import newsService from '../services/news.service'; // Importa el servicio de noticias
// import newsData from "../data/newsData"; // <-- ¡Ya no se importa!

const NoticesPage = () => {
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        setIsLoading(true);
        const data = await newsService.getAllNews();
        // Filtra solo las noticias activas y publicadas
        setAllNews(data.filter(n => n.is_active && n.is_published));
        setError(null);
      } catch (err) {
        console.error("Error al cargar todas las noticias para la página de listado:", err);
        setError("No se pudieron cargar las noticias. Por favor, intenta de nuevo más tarde.");
        setAllNews([]); // Asegura que sea un array vacío en caso de error
      } finally {
        setIsLoading(false); // Finaliza el estado de carga
      }
    };
    fetchAllNews();
  }, []); // Se ejecuta una vez al montar el componente

  if (isLoading) {
    return (
      <>
        <PageHeader
          title="Cargando Noticias..."
          description="Un momento por favor."
        />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Cargando el listado completo de noticias...</p>
        </div>
        <SponsorsSlider />
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHeader
          title="Error al cargar Noticias"
          description="No se pudo cargar el listado completo de noticias."
        />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p className="error-message">{error}</p>
        </div>
        <SponsorsSlider />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Noticias del Club"
        description="Enterate de las últimas novedades y anuncios del Club Olimpo."
      />
      {/* Pasa las noticias obtenidas del backend al componente Notices */}
      <Notices newsData={allNews} />
      <SponsorsSlider />
    </>
  );
};

export default NoticesPage;
