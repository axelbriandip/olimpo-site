import React, { useState } from "react";
import squadsData from "../data/SquadsData.js";
// import foot_right from '../assets/imgs/icons/foot-right.png';
// import foot_left from '../assets/imgs/icons/foot-left.png';
import corg from '../assets/imgs/shields/corg-siglas-blanco.png';

// Nuevos íconos SVG personalizados
import rightFootIcon from '../assets/imgs/icons/foot-right2.svg';
import leftFootIcon from '../assets/imgs/icons/foot-letf2.svg';
import staffIcon from '../assets/imgs/icons/silbato.svg';

const sections = [
  { key: "Goalkeepers", label: "ARQUEROS" },
  { key: "Defenders", label: "DEFENSORES" },
  { key: "Midfielders", label: "MEDIOCAMPISTAS" },
  { key: "Forwards", label: "DELANTEROS" },
  { key: "Staff", label: "CUERPO TÉCNICO" },
];

const categories = ["Todas", ...Object.keys(squadsData)];

export default function Squads() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const currentSquad =
    selectedCategory === "Todas"
      ? sections.reduce((acc, { key }) => {
        acc[key] = [];
        Object.entries(squadsData).forEach(([_, catData]) => {
          if (catData[key]) {
            acc[key].push(...catData[key]);
          }
        });
        return acc;
      }, {})
      : squadsData[selectedCategory];

  // Función para contar jugadores (sin Staff)
  const countPlayers = (category) => {
    if (category === "Todas") {
      let total = 0;
      Object.values(squadsData).forEach((catData) => {
        Object.entries(catData).forEach(([section, players]) => {
          if (section !== "Staff") total += players.length;
        });
      });
      return total;
    } else {
      const catData = squadsData[category];
      if (!catData) return 0;
      return Object.entries(catData).reduce((acc, [section, players]) => {
        return section === "Staff" ? acc : acc + players.length;
      }, 0);
    }
  };

  return (
    <div className="squads-container">
      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${cat === selectedCategory ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat} ({countPlayers(cat)})
          </button>
        ))}
      </div>

      <div className="squad-sections">
        {sections.map(({ key, label }) => {
          const players = currentSquad[key];
          if (!players || players.length === 0) return null;

          return (
            <section key={key} className="squad-section">
              <h3>
                {label}
                {key !== "Staff" && ` (${players.length})`}
              </h3>
              <div className="cards-container">
                {players.map((player) => (
                  <div key={player.id} className="player-card">
                    <div className="container-photo">
                      <img src={player.photo} alt={player.name} />
                      <img className="corg" src={corg} alt="Escudo Olimpo" />
                    </div>
                    <span className="position">{player.position}</span>
                    <span className="lastname">{player.lastname}</span>
                    <span className="name">{player.name}</span>
                    <div className="data">
                      <span className="category">{player.category}</span>
                      <div className="age-foot">
                        <img
                          className="foot"
                          src={
                            key === "Staff"
                              ? staffIcon
                              : player.foot === "Right"
                                ? rightFootIcon
                                : leftFootIcon
                          }
                          alt={
                            key === "Staff" ? "Staff" : player.foot === "Right" ? "Derecho" : "Izquierdo"
                          }
                          title={
                            key === "Staff" ? "Cuerpo Técnico" : player.foot === "Right" ? "Diestro" : "Zurdo"
                          }
                        />
                        <div className="age">{player.age} años</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
