import React from 'react';
import matches from '../data/matchesData.js';
import shield from '../assets/imgs/shields/corg-negro.png';

const categories = [
  "Sub 7", "Sub 9", "Sub 11", "Sub 13", "Sub 15", "Sub 17", "Reserva", "Primera"
];

const UpcomingMatches = () => {
  return (
    <div className="upcoming-matches">
      {categories.map(cat => {
        const matchesByCategory = matches.filter(m => m.category === cat);
        if (matchesByCategory.length === 0) return null;

        return (
          <div key={cat} className="category-block">
            <div className="category-header">Categoría {cat}</div>
            <div className="matches-scroll">
              {matchesByCategory.map((match, index) => (
                <div key={index} className="match-card">
                  {/* Fila superior dividida en dos filas */}
                  <div className="match-top">
                    <div className="tournament-row">
                      <span className="match-tournament">{match.tournament || "(torneo a definir) "} |</span>
                      <span className="match-instance">{match.tournamentDate || "(instancia a definir)"}</span>
                    </div>
                    <div className="datetime-row">
                      <span className="match-date-time">
                        {match.dateSystem ? match.dateSystem : "(fecha a definir)"},&nbsp;
                        {match.time ? `${match.time} hs.` : "(hora a definir)"}
                      </span>
                      <span className="venue">
                        {match.venue ? `- ${match.venue}` : "- (cancha a definir)"}
                      </span>
                    </div>
                  </div>

                  {/* Equipos y Resultado/VS */}
                  <div className="match-middle">
                    <div className="team">
                      <img src={match.teamA.logo} alt={match.teamA.name} />
                      <div className="team-name">{match.teamA.name}</div>
                      {match.teamA.scorers?.length > 0 && (
                        <div className="scorers">
                          {match.teamA.scorers.map((s, i) => (
                            <div key={i}>{s}</div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="vs">
                      {match.result ? match.result : 'vs'}
                    </div>

                    <div className="team">
                      <img src={match.teamB.logo} alt={match.teamB.name} />
                      <div className="team-name">{match.teamB.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingMatches;
