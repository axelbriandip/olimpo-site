import clasicoImg from "../assets/imgs/welcome-carousel/juli.jpg";
import indumentariaImg from "../assets/imgs/welcome-carousel/lisi.jpg";
import juvenilesImg from "../assets/imgs/welcome-carousel/rafa.jpg";

const CardPlayerOfMonth = () => {
  const players = [
    {
      name: "Lucas Díaz",
      category: "Primera",
      reason: "Gran rendimiento en defensa y liderazgo.",
      medal: "🥇",
      image: clasicoImg // reemplazá con tu ruta real
    },
    {
      name: "Agustina Herrera",
      category: "Femenino",
      reason: "Goleadora y referente del equipo.",
      medal: "🥈",
      image: indumentariaImg
    },
    {
      name: "Tomás Pérez",
      category: "Infantiles Sub-12",
      reason: "Ejemplo de compromiso y compañerismo.",
      medal: "🥉",
      image: juvenilesImg
    }
  ];
  return (
    <section className="featured-players">
      <h2>Jugadores del Mes (Agosto 2025)</h2>
      <div className="players-grid">
        {players.map((player, index) => (
          <div className="player-card" key={index}>
            <div className="medal">{player.medal}</div>
            <img src={player.image} alt={player.name} className="player-img" />
            <h3>{player.name}</h3>
            <p className="category">{player.category}</p>
            <p className="reason">“{player.reason}”</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardPlayerOfMonth;
