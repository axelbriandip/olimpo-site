import photo from '../assets/imgs/welcome-carousel/juli.jpg'

const historyEvents = [
  {
    title: "Fundación del Club Olimpo",
    date: "15 de Marzo de 1925",
    description:
      "El Club Olimpo fue fundado por un grupo de jóvenes apasionados por el fútbol, estableciendo las bases para un legado deportivo que perdura hasta hoy.",
    subsections: [
      {
        title: "Primer Estadio",
        text: "El primer estadio estaba ubicado en el barrio central, con una capacidad limitada pero con mucha pasión.",
        img: photo,
      },
      {
        title: "Equipo Fundador",
        text: "Los primeros jugadores que dieron vida al club y marcaron el comienzo de una gran historia.",
        img: photo,
      },
    ],
  },
  {
    title: "Década de Oro",
    date: "1940 - 1950",
    description:
      "Durante esta década el club alcanzó sus primeros campeonatos importantes y se posicionó como uno de los referentes de la región.",
    subsections: [
      {
        title: "Campeonato 1945",
        text: "El primer título oficial, ganado tras una emocionante final.",
        img: photo,
      },
    ],
  },
  // más eventos...
];
export default historyEvents;