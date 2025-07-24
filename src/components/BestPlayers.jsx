// src/components/BestPlayers.jsx
import React, { useState, useEffect } from 'react';
import monthlyPlayerService from '../services/monthlyPlayer.service';

// Array de nombres de meses en español
const MONTH_NAMES_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const BestPlayers = () => {
  const [monthlyPlayers, setMonthlyPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para calcular la categoría basada en el año de nacimiento
  const calculateCategory = (birthYear) => {
    if (!birthYear) return 'Categoría Desconocida';

    // Definición de categorías basada en tu modelo
    if (birthYear >= 2018 && birthYear <= 2019) return 'Cat. Sub 7';
    if (birthYear >= 2016 && birthYear <= 2017) return 'Cat. Sub 9';
    if (birthYear >= 2014 && birthYear <= 2015) return 'Cat. Sub 11';
    if (birthYear >= 2012 && birthYear <= 2013) return 'Cat. Sub 13';
    if (birthYear >= 2010 && birthYear <= 2011) return 'Cat. Sub 15';
    if (birthYear >= 2008 && birthYear <= 2009) return 'Cat. Sub 17';
    if (birthYear <= 2007) return 'Primera'; // 2007 y anteriores

    return 'Categoría N/A'; // Para años fuera de los rangos definidos
  };

  useEffect(() => {
    const fetchMonthlyPlayers = async () => {
      try {
        const data = await monthlyPlayerService.getAllMonthlyPlayers();
        const activePlayers = data.filter(player => player.is_active);

        // Tomamos solo los 3 primeros para mostrar
        setMonthlyPlayers(activePlayers.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los Jugadores del Mes:", err);
        setError("No se pudieron cargar los jugadores del mes. Intenta de nuevo más tarde.");
        setLoading(false);
      }
    };

    fetchMonthlyPlayers();
  }, []);

  if (loading) {
    return (
      <section className="best_players-section">
        <h2 className="best_players-title">Cargando Jugadores del Mes...</h2>
        <p>Cargando la información de los jugadores más destacados.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="best_players-section">
        <h2 className="best_players-title">Error al cargar Jugadores del Mes</h2>
        <p className="error-message">{error}</p>
      </section>
    );
  }

  if (monthlyPlayers.length === 0) {
    return (
      <section className="best_players-section">
        <h2 className="best_players-title">Jugadores del Mes</h2>
        <p className="best_players-description">
          Actualmente no hay jugadores del mes destacados.
        </p>
      </section>
    );
  }

  // Mapeo de medallas para los 3 primeros (siempre que haya al menos 3)
  const medals = ["🥇", "🥈", "🥉"];

  // Obtener el nombre del mes
  const displayMonth = monthlyPlayers[0]?.month
    ? MONTH_NAMES_ES[monthlyPlayers[0].month - 1] // Restamos 1 porque los arrays son base 0
    : 'Mes Actual';
  const displayYear = monthlyPlayers[0]?.year || 'Actual';


  return (
    <section className="best_players-section">
      {/* Título dinámico con el nombre del mes */}
      <h2 className="best_players-title">Jugadores del Mes ({displayMonth} {displayYear})</h2>
      <p className="best_players-description">
        Reconocemos el esfuerzo y la dedicación de las figuras más sobresalientes del momento
      </p>
      <div className="best_players-container">
        {monthlyPlayers.map((playerData, index) => {
          const birthYear = playerData.player?.dateOfBirth ? new Date(playerData.player.dateOfBirth).getFullYear() : null;
          const category = calculateCategory(birthYear);

          return (
            <div className="player-card" key={playerData.id}>
              {index < 3 && <div className="medal">{medals[index]}</div>}
              <img
                src={playerData.imageUrl || 'https://placehold.co/150x150/cccccc/333333?text=Sin+Imagen'}
                alt={`${playerData.player?.firstName} ${playerData.player?.lastName}`}
                className="player-img"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/cccccc/333333?text=Sin+Imagen'; }}
              />
              <h3>{playerData.player?.firstName} {playerData.player?.lastName || 'N/A'}</h3>
              <p className="player-role">{category}</p>
              <p className="player-comment">“{playerData.reason}”</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestPlayers;