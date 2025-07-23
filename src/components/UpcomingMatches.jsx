// src/components/UpcomingMatches.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../redux/slices/matchSlice';
import defaultShield from '../assets/imgs/shields/corg-negro.png';

const UpcomingMatches = () => {
  const dispatch = useDispatch();
  const { matches, loading, error } = useSelector((state) => state.matches);

  // Definimos las categorías que esperamos, en el orden deseado.
  // Ahora solo incluye las categorías por edad/nivel y "Otros Partidos".
  const expectedCategories = [
    "Primera", "Reserva", "Sub 17", "Sub 15", "Sub 13", "Sub 11", "Sub 9", "Sub 7", "Otros Partidos"
  ];

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const formatMatchDateTime = (dateTimeString) => {
    // Si dateTimeString es null o undefined, retornamos los mensajes "a definir"
    if (!dateTimeString) {
      return { date: '(Día a definir)', time: '(Hora a definir)' };
    }

    const date = new Date(dateTimeString);
    // Aunque dateTimeString no sea null, si la fecha no es válida, también retornamos "a definir"
    if (isNaN(date.getTime())) {
      return { date: '(Día a definir)', time: '(Hora a definir)' };
    }

    const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('es-ES', optionsDate);

    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedTime = date.toLocaleTimeString('es-ES', optionsTime);

    return { date: formattedDate, time: formattedTime };
  };

  // Función para obtener la categoría deseada del partido
  // Ahora solo clasifica por categorías de edad/nivel, el resto va a "Otros Partidos".
  const getMatchCategory = (match) => {
    const roundLower = match.round?.toLowerCase() || '';
    // matchTypeLower ya no se usa para determinar la categoría principal de agrupación.

    if (match.category == "Primera") return 'Primera';
    if (match.category == "Reserva") return 'Reserva';
    if (match.category == "Sub17") return 'Sub 17';
    if (match.category == "Sub15") return 'Sub 15';
    if (match.category == "Sub13") return 'Sub 13';
    if (match.category == "Sub11") return 'Sub 11';
    if (match.category == "Sub9") return 'Sub 9';
    if (match.category == "Sub7") return 'Sub 7';

    // Si no coincide con ninguna de las categorías de ronda/edad, se agrupa en "Otros Partidos"
    return 'Otros Partidos';
  };

  const filteredMatches = matches;

  const groupedMatches = filteredMatches.reduce((acc, match) => {
    const category = getMatchCategory(match);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(match);
    return acc;
  }, {});

  // Ordena las claves de categoría para la visualización, asegurando que las esperadas estén primero
  const sortedCategoryKeys = expectedCategories.filter(cat => groupedMatches[cat]?.length > 0);
  // Añadir cualquier otra categoría que haya surgido pero no esté en expectedCategories (ej. si getMatchCategory retorna algo inesperado)
  Object.keys(groupedMatches).forEach(key => {
    if (!sortedCategoryKeys.includes(key)) {
      sortedCategoryKeys.push(key);
    }
  });


  // Ordenar los partidos dentro de cada grupo
  Object.keys(groupedMatches).forEach(key => {
    groupedMatches[key].sort((a, b) => {
      const dateA = a.dateTime ? new Date(a.dateTime).getTime() : -Infinity;
      const dateB = b.dateTime ? new Date(b.dateTime).getTime() : -Infinity;

      if (dateA === -Infinity && dateB === -Infinity) return 0;
      if (dateA === -Infinity) return 1;
      if (dateB === -Infinity) return -1;

      return dateB - dateA;
    });
  });

  if (loading === 'pending') {
    return (
      <div className="upcoming-matches" style={{ textAlign: 'center', padding: '50px' }}>
        Cargando partidos...
      </div>
    );
  }

  if (loading === 'failed') {
    return (
      <div className="upcoming-matches" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        Error al cargar partidos: {error}.
      </div>
    );
  }

  if (matches.length === 0 && loading === 'succeeded') {
    return (
      <div className="upcoming-matches" style={{ textAlign: 'center', padding: '50px' }}>
        No hay partidos cargados en el sistema.
      </div>
    );
  }

  return (
    <div className="upcoming-matches">
      {Object.keys(groupedMatches).length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          No hay partidos disponibles.
        </div>
      )}

      {sortedCategoryKeys.map(categoryKey => {
        const matchesInGroup = groupedMatches[categoryKey];
        if (!matchesInGroup || matchesInGroup.length === 0) return null;

        return (
          <div key={categoryKey} className="category-block">
            <div className="category-header">Categoría {categoryKey}</div>
            <div className="matches-scroll">
              {matchesInGroup.map((match) => {
                const { date: formattedDate, time: formattedTime } = formatMatchDateTime(match.dateTime);
                const isFinished = match.status === 'Finalizado';

                return (
                  <div key={match.id} className="match-card">
                    <div className="match-top">
                      <div className="tournament-row">
                        <span className="match-tournament">{match.matchType || "(torneo a definir)"} |</span>
                        <span className="match-instance">{match.round || "(instancia a definir)"}</span>
                      </div>
                      <div className="datetime-row">
                        <span className="match-date-time">
                          {formattedDate},&nbsp;{formattedTime !== '(Hora a definir)' ? `${formattedTime} hs.` : "(hora a definir)"}
                        </span>
                        <span className="venue">
                          {match.location ? `- ${match.location}` : "- (cancha a definir)"}
                        </span>
                      </div>
                    </div>

                    <div className="match-middle">
                      <div className="team">
                        <img src={match.homeTeam?.originalLogoUrl || defaultShield} alt={match.homeTeam?.name || 'Equipo Local'} />
                        <div className="team-name">{match.homeTeam?.name || 'Equipo Local'}</div>
                      </div>

                      <div className="vs">
                        {isFinished ? `${match.homeTeamScore || 0}-${match.awayTeamScore || 0}` : 'vs'}
                      </div>

                      <div className="team">
                        <img src={match.awayTeam?.originalLogoUrl || defaultShield} alt={match.awayTeam?.name || 'Equipo Visitante'} />
                        <div className="team-name">{match.awayTeam?.name || 'Equipo Visitante'}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingMatches;