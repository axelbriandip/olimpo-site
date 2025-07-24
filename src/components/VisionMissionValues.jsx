// src/components/VisionMissionValues.jsx
import React, { useState, useEffect } from 'react';
import identityService from '../services/identity.service';

const VisionMissionValues = () => {
  const [identity, setIdentity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        setIsLoading(true);
        const data = await identityService.getIdentity();
        // Si el backend devuelve un array (ej. findMany), toma el primer elemento
        setIdentity(Array.isArray(data) ? data[0] : data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar la identidad:", err);
        // Si el error es 404 (no encontrado), mostramos un mensaje específico
        if (err.response && err.response.status === 404) {
          setError("Información de identidad no encontrada. Por favor, asegúrate de que esté cargada en el panel de administración.");
        } else {
          setError("No se pudo cargar la identidad del club. Por favor, intenta de nuevo más tarde.");
        }
        setIdentity(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdentity();
  }, []);

  if (isLoading) {
    return (
      <section className="vmv-section-wrapper loading-state">
        <h2 className="vmv-title">Cargando identidad...</h2>
        <p>Un momento por favor.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="vmv-section-wrapper error-state">
        <h2 className="vmv-title">Error al cargar la identidad:</h2>
        <p>{error}</p>
        <p>Por favor, verifica la conexión con el servidor o que los datos estén cargados correctamente.</p>
      </section>
    );
  }

  // Si no hay datos de identidad después de la carga
  if (!identity) {
    return (
      <section className="vmv-section-wrapper no-data-state">
        <h2 className="vmv-title">Información de Identidad no disponible</h2>
        <p>Actualmente no hay datos de misión, visión y valores cargados para el club.</p>
        <p>Por favor, contacta al administrador.</p>
      </section>
    );
  }

  // Títulos y descripciones por defecto o estáticas ya que no están en el modelo
  const defaultMainTitle = "Nuestra Identidad";
  const defaultMainDescription = "Explora nuestra razón de ser, la visión que nos impulsa hacia el futuro y los valores que compartimos día a día.";
  const defaultMissionTitle = "Nuestra Misión";
  const defaultVisionTitle = "Nuestra Visión";
  const defaultValuesTitle = "Nuestros Valores";

  return (
    <section className="vmv-section-wrapper">
      <h2 className="vmv-title">{defaultMainTitle}</h2>
      <p className="vmv-description">{defaultMainDescription}</p>

      <div className="vmv-cards-container">
        {/* Misión Card */}
        <div className="vmv-card">
          <div
            className="vmv-bg"
            style={{ backgroundImage: `url(${identity.missionImageUrl || 'https://placehold.co/300x200/cccccc/333333?text=Mision+Imagen'})` }}
          >
            {/* No hay icono en el modelo, así que se omite o se podría añadir uno estático aquí */}
          </div>
          <div className="vmv-text-content">
            <h3>{defaultMissionTitle}</h3>
            <p>{identity.missionText || "Texto de misión no disponible."}</p>
          </div>
        </div>

        {/* Visión Card */}
        <div className="vmv-card">
          <div
            className="vmv-bg"
            style={{ backgroundImage: `url(${identity.visionImageUrl || 'https://placehold.co/300x200/cccccc/333333?text=Vision+Imagen'})` }}
          >
            {/* No hay icono en el modelo */}
          </div>
          <div className="vmv-text-content">
            <h3>{defaultVisionTitle}</h3>
            <p>{identity.visionText || "Texto de visión no disponible."}</p>
          </div>
        </div>

        {/* Valores Card */}
        <div className="vmv-card">
          <div
            className="vmv-bg"
            style={{ backgroundImage: `url(${identity.valuesImageUrl || 'https://placehold.co/300x200/cccccc/333333?text=Valores+Imagen'})` }}
          >
            {/* No hay icono en el modelo */}
          </div>
          <div className="vmv-text-content">
            <h3>{defaultValuesTitle}</h3>
            <p>{identity.valuesText || "Texto de valores no disponible."}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionValues;
