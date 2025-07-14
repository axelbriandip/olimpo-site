import React, { useState } from "react";
import squadsData from "../data/SquadsData.js";

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
                    <img src={player.photo} alt={player.name} />
                    <p>{player.name}</p>
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
