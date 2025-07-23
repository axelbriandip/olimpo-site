import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoryEvents } from '../redux/slices/historySlice'; // Asegúrate de que la ruta sea correcta

import PageHeader from "../components/PageHeader";
import HistoryTimeline from "../components/HistoryTimeline";
import SponsorsSlider from '../components/SponsorsSlider';
// import HistoryEvents from '../data/HistoryEvents.js'; // ¡Ya no se necesita importar datos estáticos!

const AboutUsPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((s) => s.history); // Accede al slice 'history'

  useEffect(() => {
    // Despachar la acción para cargar los eventos cuando el componente se monta
    dispatch(fetchHistoryEvents());
  }, [dispatch]);

  // Función para formatear la fecha
  const formatDate = (year, month, day) => {
    if (day && month) {
      // Formato 'DD de Mes de YYYY'
      const date = new Date(year, month - 1, day); // month - 1 porque los meses en Date son de 0 a 11
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
    } else if (month) {
      // Formato 'Mes de YYYY'
      const date = new Date(year, month - 1);
      const options = { month: 'long', year: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
    } else {
      // Formato 'YYYY'
      return String(year);
    }
  };

  // Muestra mensajes de carga y error mientras se obtienen los datos
  if (loading === 'pending') {
    return (
      <>
        <PageHeader
          title="Sobre nosotros"
          description="Nuestra historia, valores y el camino recorrido por el Club Olimpo."
        />
        <div className="loading-message" style={{ textAlign: 'center', padding: '50px' }}>
          Cargando la historia del club...
        </div>
        <SponsorsSlider />
      </>
    );
  }

  if (loading === 'failed') {
    return (
      <>
        <PageHeader
          title="Sobre nosotros"
          description="Nuestra historia, valores y el camino recorrido por el Club Olimpo."
        />
        <div className="error-message" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          Error al cargar la historia: {error}
        </div>
        <SponsorsSlider />
      </>
    );
  }

  // Mapear los datos del backend al formato que espera HistoryTimeline
  // Esto es necesario para que `event.date` y las subsecciones (`img`, `text`) coincidan
  const formattedEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    date: formatDate(event.year, event.month, event.day), // Formatear la fecha aquí
    description: event.description,
    // Asegurarse de que `subsections` existe y mapear sus campos al formato esperado
    subsections: event.subsections?.map(sub => ({
      id: sub.id, // Asegúrate de pasar el ID de la subsección para la clave
      img: sub.imageUrl, // Asume que `imageUrl` del backend es `img` en el frontend
      title: sub.title,
      text: sub.content, // Asume que `content` del backend es `text` en el frontend
    })) || [], // Asegúrate de que siempre sea un array, incluso si está vacío
  }));

  return (
    <>
      <PageHeader
        title="Sobre nosotros"
        description="Nuestra historia, valores y el camino recorrido por el Club Olimpo."
      />
      {formattedEvents.length > 0 ? (
        <HistoryTimeline events={formattedEvents} />
      ) : (
        <div className="no-events-message" style={{ textAlign: 'center', padding: '50px' }}>
          No hay eventos históricos para mostrar.
        </div>
      )}
      <SponsorsSlider />
    </>
  );
};

export default AboutUsPage;