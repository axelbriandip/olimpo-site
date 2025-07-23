import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../redux/slices/playerSlice";
import corg from '../assets/imgs/shields/corg-siglas-blanco.png';

import rightFootIcon from '../assets/imgs/icons/foot-right2.svg';
import leftFootIcon from '../assets/imgs/icons/foot-letf2.svg';
import staffIcon from '../assets/imgs/icons/silbato.svg';

const sections = [
  { key: "Arquero", label: "ARQUEROS" },
  { key: "Defensor", label: "DEFENSORES" },
  { key: "Mediocampista", label: "MEDIOCAMPISTAS" },
  { key: "Delantero", label: "DELANTEROS" },
  { key: "Entrenador", label: "CUERPO TÉCNICO" },
];

// Define the desired order of categories
const orderedCategories = ["Primera", "Sub17", "Sub15", "Sub13", "Sub11", "Sub9", "Sub7"];

export default function Squads() {
  const dispatch = useDispatch();
  const { items: players, loading, error } = useSelector((state) => state.players);

  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  // Generate categories from the predefined order, including "Todas"
  const categories = ["Todas", ...orderedCategories];

  const filteredPlayers =
    selectedCategory === "Todas"
      ? players.filter(p => orderedCategories.includes(getCategoryFromBirthYear(p.dateOfBirth))) // Filter out players not in desired categories for "Todas"
      : players.filter(p => getCategoryFromBirthYear(p.dateOfBirth) === selectedCategory);

  const currentSquad = sections.reduce((acc, { key }) => {
    acc[key] = filteredPlayers.filter(player => player.position === key);
    return acc;
  }, {});

  const countPlayers = (category) => {
    return players.filter(p => {
      if (p.position === "Entrenador") return false;
      const cat = getCategoryFromBirthYear(p.dateOfBirth);
      // Only count players in the specified orderedCategories
      return orderedCategories.includes(cat) && (category === "Todas" || cat === category);
    }).length;
  };

  if (loading) return <div>Cargando jugadores...</div>;
  if (error) return <div>Error cargando jugadores: {error}</div>;
  if (players.length === 0) return <div>No hay jugadores cargados.</div>;

  return (
    <div className="squads-container">
      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${cat === selectedCategory ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat} ({countPlayers(cat)})
          </button>
        ))}
      </div>

      <div className="squad-sections">
        {sections.map(({ key, label }) => {
          const playersInSection = currentSquad[key];
          if (!playersInSection || playersInSection.length === 0) return null;

          return (
            <section key={key} className="squad-section">
              <h3>
                {label}
                {key !== "Entrenador" && ` (${playersInSection.length})`}
              </h3>
              <div className="cards-container">
                {playersInSection.map((player) => (
                  <div key={player.id} className="player-card">
                    <div className="container-photo">
                      <img
                        src={player.photoUrl}
                        alt={`Foto de ${player.firstName} ${player.lastName}`}
                      />
                      <img className="corg" src={corg} alt="Escudo Olimpo" />
                    </div>
                    <span className="position">{player.position}</span>
                    <span className="lastname">{player.lastName}</span>
                    <span className="name">{player.firstName}</span>
                    <div className="data">
                      <span className="category">
                        {getCategoryFromBirthYear(player.dateOfBirth)}
                      </span>
                      <div className="age-foot">
                        <img
                          className="foot"
                          src={
                            player.position === "Entrenador"
                              ? staffIcon
                              : player.preferredFoot === "Derecho"
                                ? rightFootIcon
                                : leftFootIcon
                          }
                          alt={
                            player.position === "Entrenador"
                              ? "Staff"
                              : player.preferredFoot === "Derecho"
                                ? "Diestro"
                                : "Zurdo"
                          }
                          title={
                            player.position === "Entrenador"
                              ? "Cuerpo Técnico"
                              : player.preferredFoot === "Derecho"
                                ? "Diestro"
                                : "Zurdo"
                          }
                        />
                        <div className="age">{getAge(player.dateOfBirth)} años</div>
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

// Calcular edad desde fecha de nacimiento
function getAge(dateString) {
  if (!dateString) return "-";
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Asignar categoría en base al año
function getCategoryFromBirthYear(dateString) {
  if (!dateString) return "Unknown"; // Return a default that will be filtered out
  const year = new Date(dateString).getFullYear();
  if (year <= 2007) return "Primera";
  if (year <= 2009) return "Sub17";
  if (year <= 2011) return "Sub15";
  if (year <= 2013) return "Sub13";
  if (year <= 2015) return "Sub11";
  if (year <= 2017) return "Sub9";
  if (year <= 2019) return "Sub7";
  return "Unknown"; // Players outside the desired categories will be "Unknown"
}