import uno from '../assets/imgs/welcome-carousel/lisi.jpg';

const best_players = [
  {
    name: "Martina López",
    role: "Cat. Sub 11 (2014/15)",
    comment: "Su liderazgo y desempeño en cada partido la destacaron como la mejor jugadora Sub11 del mes.",
    medal: "🥇",
    image: uno,
  },
  {
    name: "Carlos Gómez",
    role: "Cat. Sub 9 (2016/17)",
    comment: "Clave en la formación y el rendimiento del equipo Sub9, su dedicación es ejemplar.",
    medal: "🥈",
    image: uno,
},
{
    name: "Lucía Fernández",
    role: "Cat. Sub 17 (2008/09)",
    comment: "Con una actuación sobresaliente, Lucía fue fundamental en los logros de nuestro equipo Sub17 este mes.",
    medal: "🥉",
    image: uno,
}
];

const BestPlayers = () => {
  return (
    <section className="best_players-section">
      <h2 className="best_players-title">Jugadores del Mes (Agosto 2025)</h2>
      <p className="best_players-description">
        Reconocemos el esfuerzo y la dedicación de las figuras más sobresalientes del momento
      </p>
      <div className="best_players-container">
        {best_players.map((t, index) => (
          <div className="player-card" key={index}>
            <div className="medal">{t.medal}</div>
            <img src={t.image} alt={t.name} className="player-img" />
            <h3>{t.name}</h3>
            <p className="player-role">{t.role}</p>
            <p className="player-comment">“{t.comment}”</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestPlayers;