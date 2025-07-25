// src/components/SponsorsSlider.jsx
import React, { useState, useEffect } from "react";
import sponsorService from '../services/sponsor.service';

const SponsorsSlider = () => {
  const [sponsors, setSponsors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setIsLoading(true);
        const data = await sponsorService.getAllSponsors();
        // Filtra solo los sponsors activos y los ordena por el campo 'order' si existe, luego por nombre
        const activeSponsors = data.filter(s => s.is_active).sort((a, b) => {
          if (a.order !== null && b.order !== null) {
            return a.order - b.order;
          }
          return a.name.localeCompare(b.name);
        });
        setSponsors(activeSponsors);
        setError(null);
      } catch (err) {
        console.error("Error al cargar los sponsors:", err);
        setError("No se pudieron cargar los sponsors. Intenta de nuevo más tarde.");
        setSponsors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (isLoading) {
    return (
      <section className="sponsors-section">
        <h2 className="sponsors-title">Cargando Sponsors...</h2>
        <p className="sponsors-description">Un momento por favor.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="sponsors-section">
        <h2 className="sponsors-title">Error al cargar Sponsors</h2>
        <p className="sponsors-description error-message">{error}</p>
      </section>
    );
  }

  if (sponsors.length === 0) {
    return (
      <section className="sponsors-section">
        <h2 className="sponsors-title">Nuestros Sponsors</h2>
        <p className="sponsors-description">
          Actualmente no hay sponsors activos.
        </p>
      </section>
    );
  }

  // Duplicamos los sponsors MÚLTIPLES VECES para asegurar un bucle imperceptible.
  // Si tienes 5 sponsors originales, esto creará 15 elementos en el track.
  // Esto es crucial para que no se vea el "salto" cuando el primer conjunto termina.
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="sponsors-section">
      <h2 className="sponsors-title">Nuestros Sponsors</h2>
      <p className="sponsors-description">
        Agradecemos el apoyo de las empresas que hacen posible el crecimiento de nuestro club.
      </p>

      <div className="slider-wrapper">
        <div className="slider-track">
          {duplicatedSponsors.map((sponsor, index) => (
            <a
              // Usamos una key única combinando el ID del sponsor y un índice para el duplicado
              // Esto es importante para que React maneje correctamente los elementos duplicados
              key={`${sponsor.id}-${index}`}
              href={sponsor.websiteUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="slide"
            >
              <img
                // Prioriza logoUrl, luego logoUrlBlack, y finalmente un placeholder
                src={sponsor.logoUrl || sponsor.logoUrlBlack || 'https://placehold.co/150x80/cccccc/333333?text=Logo'}
                alt={sponsor.name}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x80/cccccc/333333?text=Logo'; }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSlider;
