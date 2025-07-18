// src/components/VisionMissionValues.jsx
import React, { useState, useEffect } from 'react';
import identityService from '../services/identity.service'; // Asegúrate que la ruta sea correcta

const VisionMissionValues = () => {
  const [identity, setIdentity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        setIsLoading(true);
        const data = await identityService.getIdentity();
        setIdentity(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar la identidad:", err);
        setError("No se pudo cargar la identidad del club. Por favor, intenta de nuevo más tarde.");
        setIdentity(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdentity();
  }, []);

  if (isLoading) {
    return (
      <section className="vmv-section-wrapper loading-state"> {/* Nuevo wrapper para el loading */}
        <h2 className="vmv-title">Cargando identidad...</h2>
        <p>Un momento por favor.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="vmv-section-wrapper error-state"> {/* Nuevo wrapper para el error */}
        <h2 className="vmv-title">Error al cargar la identidad:</h2>
        <p>{error}</p>
        <p>Por favor, verifica la conexión con el servidor o que los datos estén cargados correctamente.</p>
      </section>
    );
  }

  if (!identity) {
    return (
      <section className="vmv-section-wrapper no-data-state"> {/* Nuevo wrapper para sin datos */}
        <h2 className="vmv-title">Información de Identidad no disponible</h2>
        <p>Actualmente no hay datos de misión, visión y valores cargados para el club.</p>
        <p>Por favor, contacta al administrador.</p>
      </section>
    );
  }

  return (
    // Estructura adaptada a tu imagen deseada
    <section className="vmv-section-wrapper"> {/* Contenedor principal para centrado y padding */}
      <h2 className="vmv-title">{identity.mainTitle || "Nuestra Identidad"}</h2> {/* Usa mainTitle del backend */}
      <p className="vmv-description">{identity.mainDescription || "Explora nuestra razón de ser, la visión que nos impulsa hacia el futuro y los valores que compartimos día a día."}</p> {/* Usa mainDescription */}

      <div className="vmv-cards-container"> {/* Contenedor para las 3 tarjetas, probablemente con flexbox/grid */}
        {/* Misión Card */}
        <div className="vmv-card">
          <div className="vmv-bg mission-bg"> {/* Clase específica para imagen de fondo de misión */}
            <div className="vmv-icon">{identity.missionIcon}</div> {/* Icono */}
          </div>
          <div className="vmv-text-content"> {/* Nuevo div para el texto */}
            <h3>{identity.missionTitle}</h3>
            <p>{identity.missionText}</p>
          </div>
        </div>

        {/* Visión Card */}
        <div className="vmv-card">
          <div className="vmv-bg vision-bg"> {/* Clase específica para imagen de fondo de visión */}
            <div className="vmv-icon">{identity.visionIcon}</div> {/* Icono */}
          </div>
          <div className="vmv-text-content"> {/* Nuevo div para el texto */}
            <h3>{identity.visionTitle}</h3>
            <p>{identity.visionText}</p>
          </div>
        </div>

        {/* Valores Card */}
        <div className="vmv-card">
          <div className="vmv-bg values-bg"> {/* Clase específica para imagen de fondo de valores */}
            <div className="vmv-icon">{identity.valuesIcon}</div> {/* Icono */}
          </div>
          <div className="vmv-text-content"> {/* Nuevo div para el texto */}
            <h3>{identity.valuesTitle}</h3>
            <p>{identity.valuesText}</p>
          </div>
        </div>
      </div> {/* Cierre de vmv-cards-container */}
    </section>
  );
};

export default VisionMissionValues;