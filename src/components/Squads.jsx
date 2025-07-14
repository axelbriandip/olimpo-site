import React, { useState } from "react";
import squadsData from "../data/SquadsData.js";
import foot_right from '../assets/imgs/icons/foot-right.png';
import foot_left from '../assets/imgs/icons/foot-left.png';
import corg from '../assets/imgs/shields/corg-siglas-blanco.png'

// Secciones de cada plantel
const sections = [
  { key: "Goalkeepers", label: "ARQUEROS" },
  { key: "Defenders", label: "DEFENSORES" },
  { key: "Midfielders", label: "MEDIOCAMPISTAS" },
  { key: "Forwards", label: "DELANTEROS" },
  { key: "Staff", label: "CUERPO TÉCNICO" },
];

// Agregamos la opción "Todas" al principio
const categories = ["Todas", ...Object.keys(squadsData)];

export default function Squads() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Si se selecciona "Todas", juntamos todos los jugadores por rol
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

  return (
    <div className="squads-container">
      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${cat === selectedCategory ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="squad-sections">
        {sections.map(({ key, label }) => {
          const players = currentSquad[key];
          if (!players || players.length === 0) return null;

          return (
            <section key={key} className="squad-section">
              <h3>{label}</h3>
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
                        <img className="foot" src={player.foot === "Right" ? foot_right : foot_left} alt={player.foot}/>
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
