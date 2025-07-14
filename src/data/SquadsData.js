// src/data/SquadsData.js
import photo from '../assets/imgs/welcome-carousel/lisi.jpg';

const squadsData = {
  Primera: {
    Goalkeepers: [
      { id: 1, name: "Lucas", lastname: "Ramirez", position: "Arquero", photo, foot: "Right", age: 29, category: "Primera" },
      { id: 2, name: "Martín", lastname: "González", position: "Arquero", photo, foot: "Left", age: 27, category: "Primera" },
      { id: 3, name: "Diego", lastname: "Pérez", position: "Arquero", photo, foot: "Right", age: 30, category: "Primera" },
    ],
    Defenders: [
      { id: 4, name: "Facundo", lastname: "Silva", position: "Defensor", photo, foot: "Right", age: 26, category: "Primera" },
      { id: 5, name: "Sebastián", lastname: "Ramos", position: "Defensor", photo, foot: "Left", age: 28, category: "Primera" },
      { id: 6, name: "Ezequiel", lastname: "Córdoba", position: "Defensor", photo, foot: "Right", age: 27, category: "Primera" },
      { id: 7, name: "Bruno", lastname: "Molina", position: "Defensor", photo, foot: "Right", age: 25, category: "Primera" },
      { id: 8, name: "Tomás", lastname: "Ortiz", position: "Defensor", photo, foot: "Left", age: 24, category: "Primera" },
      { id: 9, name: "Diego", lastname: "Herrera", position: "Defensor", photo, foot: "Right", age: 30, category: "Primera" },
    ],
    Midfielders: [
      { id: 10, name: "Javier Alejandro", lastname: "González", position: "Mediocampista", photo, foot: "Right", age: 22, category: "Primera" },
      { id: 11, name: "Fernando", lastname: "Vera", position: "Mediocampista", photo, foot: "Right", age: 24, category: "Primera" },
      { id: 12, name: "Martín", lastname: "Silva", position: "Mediocampista", photo, foot: "Left", age: 27, category: "Primera" },
      { id: 13, name: "Sebastián", lastname: "Morales", position: "Mediocampista", photo, foot: "Right", age: 29, category: "Primera" },
      { id: 14, name: "Gonzalo", lastname: "Castro", position: "Mediocampista", photo, foot: "Right", age: 30, category: "Primera" },
      { id: 15, name: "Matías", lastname: "Ríos", position: "Mediocampista", photo, foot: "Left", age: 23, category: "Primera" },
    ],
    Forwards: [
      { id: 16, name: "Matías", lastname: "Gómez", position: "Delantero", photo, foot: "Right", age: 25, category: "Primera" },
      { id: 17, name: "Lucas", lastname: "Martínez", position: "Delantero", photo, foot: "Right", age: 27, category: "Primera" },
      { id: 18, name: "Joaquín", lastname: "López", position: "Delantero", photo, foot: "Left", age: 26, category: "Primera" },
      { id: 19, name: "Emiliano", lastname: "Ramírez", position: "Delantero", photo, foot: "Right", age: 28, category: "Primera" },
    ],
    Staff: [
      { id: 20, name: "Carlos", lastname: "Pérez", position: "Director Técnico", photo, foot: "Right", age: 45, category: "Primera" },
      { id: 21, name: "Jorge", lastname: "Suárez", position: "Entrenador", photo, foot: "Right", age: 38, category: "Primera" },
      { id: 22, name: "Ricardo", lastname: "García", position: "Preparador Físico", photo, foot: "Left", age: 42, category: "Primera" },
    ],
  },

  Sub17: {
    Goalkeepers: [
      { id: 23, name: "Tomás", lastname: "Alonso", position: "Arquero", photo, foot: "Right", age: 17, category: "Sub17" },
      { id: 24, name: "Emiliano", lastname: "Costa", position: "Arquero", photo, foot: "Left", age: 16, category: "Sub17" },
      { id: 25, name: "Matías", lastname: "Vega", position: "Arquero", photo, foot: "Right", age: 17, category: "Sub17" },
    ],
    Defenders: [
      { id: 26, name: "Lucas", lastname: "Vargas", position: "Defensor", photo, foot: "Right", age: 17, category: "Sub17" },
      { id: 27, name: "Joaquín", lastname: "Salinas", position: "Defensor", photo, foot: "Left", age: 16, category: "Sub17" },
      { id: 28, name: "Federico", lastname: "Navarro", position: "Defensor", photo, foot: "Right", age: 17, category: "Sub17" },
      { id: 29, name: "Marcos", lastname: "Sosa", position: "Defensor", photo, foot: "Right", age: 16, category: "Sub17" },
      { id: 30, name: "Gustavo", lastname: "Paredes", position: "Defensor", photo, foot: "Right", age: 17, category: "Sub17" },
    ],
    Midfielders: [
      { id: 31, name: "Adrián", lastname: "Reyes", position: "Mediocampista", photo, foot: "Left", age: 17, category: "Sub17" },
      { id: 32, name: "Javier", lastname: "González", position: "Mediocampista", photo, foot: "Right", age: 16, category: "Sub17" },
      { id: 33, name: "Fernando", lastname: "Vera", position: "Mediocampista", photo, foot: "Right", age: 17, category: "Sub17" },
      { id: 34, name: "Martín", lastname: "Silva", position: "Mediocampista", photo, foot: "Left", age: 16, category: "Sub17" },
      { id: 35, name: "Sebastián", lastname: "Morales", position: "Mediocampista", photo, foot: "Right", age: 17, category: "Sub17" },
      { id: 36, name: "Gonzalo", lastname: "Castro", position: "Mediocampista", photo, foot: "Right", age: 16, category: "Sub17" },
    ],
    Forwards: [
      { id: 37, name: "Matías", lastname: "Gómez", position: "Delantero", photo, foot: "Right", age: 17, category: "Sub17" },
      { id: 38, name: "Lucas", lastname: "Martínez", position: "Delantero", photo, foot: "Right", age: 16, category: "Sub17" },
      { id: 39, name: "Joaquín", lastname: "López", position: "Delantero", photo, foot: "Left", age: 17, category: "Sub17" },
      { id: 40, name: "Emiliano", lastname: "Ramírez", position: "Delantero", photo, foot: "Right", age: 16, category: "Sub17" },
    ],
    Staff: [
      { id: 41, name: "Sergio", lastname: "Fernández", position: "Director Técnico", photo, foot: "Right", age: 38, category: "Sub17" },
      { id: 42, name: "Diego", lastname: "Torres", position: "Entrenador", photo, foot: "Right", age: 35, category: "Sub17" },
      { id: 43, name: "Marcelo", lastname: "López", position: "Preparador Físico", photo, foot: "Left", age: 40, category: "Sub17" },
    ],
  },

  Sub15: {
    Goalkeepers: [
      { id: 44, name: "Ignacio", lastname: "Molina", position: "Arquero", photo, foot: "Right", age: 15, category: "Sub15" },
      { id: 45, name: "Mateo", lastname: "Ortiz", position: "Arquero", photo, foot: "Left", age: 14, category: "Sub15" },
    ],
    Defenders: [
      { id: 46, name: "Lucas", lastname: "Ramírez", position: "Defensor", photo, foot: "Right", age: 15, category: "Sub15" },
      { id: 47, name: "Martín", lastname: "Vega", position: "Defensor", photo, foot: "Left", age: 14, category: "Sub15" },
      { id: 48, name: "Bruno", lastname: "Silva", position: "Defensor", photo, foot: "Right", age: 15, category: "Sub15" },
      { id: 49, name: "Joaquín", lastname: "Paredes", position: "Defensor", photo, foot: "Right", age: 14, category: "Sub15" },
    ],
    Midfielders: [
      { id: 50, name: "Santiago", lastname: "Gómez", position: "Mediocampista", photo, foot: "Right", age: 15, category: "Sub15" },
      { id: 51, name: "Mateo", lastname: "Castro", position: "Mediocampista", photo, foot: "Left", age: 14, category: "Sub15" },
      { id: 52, name: "Emiliano", lastname: "Ríos", position: "Mediocampista", photo, foot: "Right", age: 15, category: "Sub15" },
      { id: 53, name: "Facundo", lastname: "Morales", position: "Mediocampista", photo, foot: "Right", age: 14, category: "Sub15" },
    ],
    Forwards: [
      { id: 54, name: "Agustín", lastname: "López", position: "Delantero", photo, foot: "Right", age: 15, category: "Sub15" },
      { id: 55, name: "Bruno", lastname: "Ramírez", position: "Delantero", photo, foot: "Left", age: 14, category: "Sub15" },
      { id: 56, name: "Javier", lastname: "Martínez", position: "Delantero", photo, foot: "Right", age: 15, category: "Sub15" },
    ],
    Staff: [
      { id: 57, name: "Martín", lastname: "Gómez", position: "Director Técnico", photo, foot: "Right", age: 35, category: "Sub15" },
      { id: 58, name: "Fernando", lastname: "Suárez", position: "Entrenador", photo, foot: "Right", age: 33, category: "Sub15" },
      { id: 59, name: "Roberto", lastname: "Ramírez", position: "Preparador Físico", photo, foot: "Left", age: 38, category: "Sub15" },
    ],
  },
  Sub13: {
    Goalkeepers: [
      { id: 60, name: "Diego", lastname: "Fernández", position: "Arquero", photo, foot: "Right", age: 13, category: "Sub13" },
      { id: 61, name: "Bruno", lastname: "Sosa", position: "Arquero", photo, foot: "Left", age: 13, category: "Sub13" },
    ],
    Defenders: [
      { id: 62, name: "Lucas", lastname: "Molina", position: "Defensor", photo, foot: "Right", age: 13, category: "Sub13" },
      { id: 63, name: "Matías", lastname: "López", position: "Defensor", photo, foot: "Left", age: 12, category: "Sub13" },
      { id: 64, name: "Santiago", lastname: "Ramírez", position: "Defensor", photo, foot: "Right", age: 13, category: "Sub13" },
      { id: 65, name: "Nicolás", lastname: "Gómez", position: "Defensor", photo, foot: "Left", age: 12, category: "Sub13" },
    ],
    Midfielders: [
      { id: 66, name: "Facundo", lastname: "Silva", position: "Mediocampista", photo, foot: "Right", age: 13, category: "Sub13" },
      { id: 67, name: "Martín", lastname: "Torres", position: "Mediocampista", photo, foot: "Left", age: 12, category: "Sub13" },
      { id: 68, name: "Agustín", lastname: "Castro", position: "Mediocampista", photo, foot: "Right", age: 13, category: "Sub13" },
      { id: 69, name: "Joaquín", lastname: "Pérez", position: "Mediocampista", photo, foot: "Left", age: 12, category: "Sub13" },
    ],
    Forwards: [
      { id: 70, name: "Bruno", lastname: "Vega", position: "Delantero", photo, foot: "Right", age: 13, category: "Sub13" },
      { id: 71, name: "Lucas", lastname: "Morales", position: "Delantero", photo, foot: "Left", age: 13, category: "Sub13" },
      { id: 72, name: "Emiliano", lastname: "García", position: "Delantero", photo, foot: "Right", age: 12, category: "Sub13" },
    ],
    Staff: [
      { id: 73, name: "Javier", lastname: "Fernández", position: "Director Técnico", photo, foot: "Right", age: 40, category: "Sub13" },
      { id: 74, name: "Ricardo", lastname: "Sánchez", position: "Entrenador", photo, foot: "Right", age: 38, category: "Sub13" },
      { id: 75, name: "Mario", lastname: "Gómez", position: "Preparador Físico", photo, foot: "Left", age: 42, category: "Sub13" },
    ],
  },

  Sub11: {
    Goalkeepers: [
      { id: 76, name: "Tomás", lastname: "Gutiérrez", position: "Arquero", photo, foot: "Right", age: 11, category: "Sub11" },
      { id: 77, name: "Ignacio", lastname: "Ortiz", position: "Arquero", photo, foot: "Left", age: 11, category: "Sub11" },
    ],
    Defenders: [
      { id: 78, name: "Mateo", lastname: "Ramírez", position: "Defensor", photo, foot: "Right", age: 11, category: "Sub11" },
      { id: 79, name: "Diego", lastname: "Vega", position: "Defensor", photo, foot: "Left", age: 10, category: "Sub11" },
      { id: 80, name: "Santiago", lastname: "Silva", position: "Defensor", photo, foot: "Right", age: 11, category: "Sub11" },
      { id: 81, name: "Bruno", lastname: "Paredes", position: "Defensor", photo, foot: "Right", age: 10, category: "Sub11" },
    ],
    Midfielders: [
      { id: 82, name: "Agustín", lastname: "Gómez", position: "Mediocampista", photo, foot: "Right", age: 11, category: "Sub11" },
      { id: 83, name: "Facundo", lastname: "Castro", position: "Mediocampista", photo, foot: "Left", age: 10, category: "Sub11" },
      { id: 84, name: "Joaquín", lastname: "Ríos", position: "Mediocampista", photo, foot: "Right", age: 11, category: "Sub11" },
      { id: 85, name: "Lucas", lastname: "Morales", position: "Mediocampista", photo, foot: "Right", age: 10, category: "Sub11" },
    ],
    Forwards: [
      { id: 86, name: "Emiliano", lastname: "López", position: "Delantero", photo, foot: "Right", age: 11, category: "Sub11" },
      { id: 87, name: "Mateo", lastname: "Ramírez", position: "Delantero", photo, foot: "Left", age: 10, category: "Sub11" },
      { id: 88, name: "Bruno", lastname: "Martínez", position: "Delantero", photo, foot: "Right", age: 11, category: "Sub11" },
    ],
    Staff: [
      { id: 89, name: "Carlos", lastname: "Gómez", position: "Director Técnico", photo, foot: "Right", age: 37, category: "Sub11" },
      { id: 90, name: "Fernando", lastname: "Sánchez", position: "Entrenador", photo, foot: "Right", age: 35, category: "Sub11" },
      { id: 91, name: "Roberto", lastname: "Torres", position: "Preparador Físico", photo, foot: "Left", age: 39, category: "Sub11" },
    ],
  },

  Sub9: {
    Goalkeepers: [
      { id: 92, name: "Lucas", lastname: "Fernández", position: "Arquero", photo, foot: "Right", age: 9, category: "Sub9" },
      { id: 93, name: "Santiago", lastname: "Sosa", position: "Arquero", photo, foot: "Left", age: 9, category: "Sub9" },
    ],
    Defenders: [
      { id: 94, name: "Mateo", lastname: "Molina", position: "Defensor", photo, foot: "Right", age: 9, category: "Sub9" },
      { id: 95, name: "Nicolás", lastname: "López", position: "Defensor", photo, foot: "Left", age: 8, category: "Sub9" },
      { id: 96, name: "Bruno", lastname: "Ramírez", position: "Defensor", photo, foot: "Right", age: 9, category: "Sub9" },
      { id: 97, name: "Facundo", lastname: "Gómez", position: "Defensor", photo, foot: "Left", age: 8, category: "Sub9" },
    ],
    Midfielders: [
      { id: 98, name: "Emiliano", lastname: "Silva", position: "Mediocampista", photo, foot: "Right", age: 9, category: "Sub9" },
      { id: 99, name: "Joaquín", lastname: "Torres", position: "Mediocampista", photo, foot: "Left", age: 8, category: "Sub9" },
      { id: 100, name: "Agustín", lastname: "Castro", position: "Mediocampista", photo, foot: "Right", age: 9, category: "Sub9" },
      { id: 101, name: "Mateo", lastname: "Pérez", position: "Mediocampista", photo, foot: "Left", age: 8, category: "Sub9" },
    ],
    Forwards: [
      { id: 102, name: "Diego", lastname: "Vega", position: "Delantero", photo, foot: "Right", age: 9, category: "Sub9" },
      { id: 103, name: "Lucas", lastname: "Morales", position: "Delantero", photo, foot: "Left", age: 9, category: "Sub9" },
      { id: 104, name: "Bruno", lastname: "García", position: "Delantero", photo, foot: "Right", age: 8, category: "Sub9" },
    ],
    Staff: [
      { id: 105, name: "Javier", lastname: "Fernández", position: "Director Técnico", photo, foot: "Right", age: 36, category: "Sub9" },
      { id: 106, name: "Ricardo", lastname: "Sánchez", position: "Entrenador", photo, foot: "Right", age: 34, category: "Sub9" },
      { id: 107, name: "Mario", lastname: "Gómez", position: "Preparador Físico", photo, foot: "Left", age: 38, category: "Sub9" },
    ],
  },
Sub7: {
  Goalkeepers: [
    { id: 108, name: "Benjamín", lastname: "García", position: "Arquero", photo, foot: "Right", age: 7, category: "Sub7" },
    { id: 109, name: "Matías", lastname: "Fernández", position: "Arquero", photo, foot: "Left", age: 7, category: "Sub7" },
  ],
  Defenders: [
    { id: 110, name: "Lucas", lastname: "Martínez", position: "Defensor", photo, foot: "Right", age: 7, category: "Sub7" },
    { id: 111, name: "Bruno", lastname: "Ríos", position: "Defensor", photo, foot: "Left", age: 7, category: "Sub7" },
    { id: 112, name: "Santiago", lastname: "López", position: "Defensor", photo, foot: "Right", age: 6, category: "Sub7" },
  ],
  Midfielders: [
    { id: 113, name: "Agustín", lastname: "Torres", position: "Mediocampista", photo, foot: "Right", age: 7, category: "Sub7" },
    { id: 114, name: "Mateo", lastname: "Pérez", position: "Mediocampista", photo, foot: "Left", age: 6, category: "Sub7" },
  ],
  Forwards: [
    { id: 115, name: "Emiliano", lastname: "Castro", position: "Delantero", photo, foot: "Right", age: 7, category: "Sub7" },
    { id: 116, name: "Diego", lastname: "Gómez", position: "Delantero", photo, foot: "Left", age: 6, category: "Sub7" },
  ],
  Staff: [
    { id: 117, name: "Carlos", lastname: "Fernández", position: "Director Técnico", photo, foot: "Right", age: 35, category: "Sub7" },
    { id: 118, name: "Fernando", lastname: "Sánchez", position: "Entrenador", photo, foot: "Right", age: 33, category: "Sub7" },
  ],
},

};

export default squadsData;
