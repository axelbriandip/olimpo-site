import photo from "../assets/imgs/welcome-carousel/lisi.jpg";

const newsData = [
  {
    id: 1,
    title: "Victoria de la Primera",
    date: "2025-07-01",
    category: ["Fútbol", "Primera"],
    summary: "Gran triunfo como visitante frente a San Martín por 2 a 0.",
    content: "El equipo de Primera División logró una importante victoria ante San Martín, imponiéndose por 2 a 0 en condición de visitante. Con este resultado, se mantiene en lo más alto de la tabla. Los goles fueron anotados por Juan Pérez y Lautaro Díaz.",
    image: photo
  },
  {
    id: 2,
    title: "Se viene la fecha 6",
    date: "2025-07-02",
    category: ["Fútbol", "Fixture"],
    summary: "Este fin de semana se disputará una nueva jornada de Liga Independiente.",
    content: "La sexta fecha del torneo de la Liga Independiente se jugará este fin de semana. Todos los equipos del club estarán en acción y se espera una jornada cargada de emociones. La programación y horarios ya están disponibles en nuestra sección de fixture.",
    image: photo
  },
  {
    id: 3,
    title: "Entrenamiento especial para arqueros",
    date: "2025-06-30",
    category: ["Formación", "Juveniles"],
    summary: "El club realizó una jornada exclusiva para mejorar el rendimiento de los arqueros.",
    content: "Con la presencia de entrenadores especializados, los arqueros de las divisiones juveniles participaron de un entrenamiento técnico intensivo. Se trabajaron aspectos como los reflejos, la ubicación, el juego con los pies y la toma de decisiones.",
    image: photo
  },
  {
    id: 4,
    title: "Capacitación para entrenadores",
    date: "2025-06-28",
    category: ["Institucional", "Formación"],
    summary: "Técnicos del club participaron de una clínica dictada por el Municipio.",
    content: "La capacitación incluyó contenidos sobre planificación, liderazgo y metodologías de entrenamiento. Fue dictada por profesionales del área deportiva municipal y apuntó a reforzar los conocimientos y habilidades del cuerpo técnico del club.",
    image: photo
  },
  {
    id: 5,
    title: "Sub 13 gana en casa",
    date: "2025-06-25",
    category: ["Fútbol", "Juveniles"],
    summary: "Los más chicos dieron una gran muestra de carácter en el clásico.",
    content: "En una nueva edición del clásico barrial, la categoría Sub 13 se impuso con autoridad en nuestra cancha. Fue un partido intenso, donde el equipo mostró solidez defensiva y contundencia en ataque. La victoria fue muy celebrada por los chicos y sus familias.",
    image: photo
  },
  {
    id: 6,
    title: "Fiesta del Día del Niño",
    date: "2025-06-22",
    category: ["Social", "Eventos"],
    summary: "El club celebró con juegos, sorteos y merienda para toda la familia.",
    content: "Con la participación de más de 200 chicos y chicas del barrio, la jornada fue una verdadera fiesta. Hubo estaciones de juegos, animación, sorteos y una merienda compartida. Agradecemos a todas las personas que colaboraron en la organización.",
    image: photo
  },
  {
    id: 7,
    title: "Nueva indumentaria oficial",
    date: "2025-06-20",
    category: ["Prensa", "Institucional"],
    summary: "Se presentó la nueva camiseta que usará el club esta temporada.",
    content: "La nueva camiseta del club fue presentada en un acto institucional con la presencia de jugadores, cuerpo técnico y autoridades. El diseño mantiene los colores tradicionales con algunos detalles modernos y contará con el nuevo sponsor Talca.",
    image: photo
  },
  {
    id: 8,
    title: "Visita de ex jugadores",
    date: "2025-06-18",
    category: ["Historia", "Social"],
    summary: "Glorias del club compartieron una tarde con las categorías menores.",
    content: "En una emotiva jornada, ex jugadores del club compartieron sus experiencias con los chicos de las categorías formativas. Hubo anécdotas, entrenamientos recreativos y una merienda en la sede social. Una experiencia inolvidable para todos.",
    image: photo
  },
  {
    id: 9,
    title: "Reunión de delegados",
    date: "2025-06-16",
    category: ["Institucional"],
    summary: "Se definieron aspectos reglamentarios y de organización para lo que resta del torneo.",
    content: "La comisión directiva convocó a los delegados de cada categoría para organizar la segunda mitad de la temporada. Se repasaron normas, fechas clave y protocolos. También se escucharon propuestas para seguir mejorando la competencia.",
    image: photo
  },
  {
    id: 10,
    title: "Victoria en la Copa HPM",
    date: "2025-06-15",
    category: ["Fútbol", "Copa"],
    summary: "La Primera ganó en penales y sigue avanzando en el torneo paralelo.",
    content: "Tras empatar 1 a 1 en el tiempo reglamentario, el equipo de Primera se impuso en los penales y avanzó de ronda en la Copa HPM. El arquero atajó dos disparos clave. El próximo partido será la semana que viene contra El Porvenir.",
    image: photo
  },
  {
    id: 11,
    title: "Reconocimiento a voluntarios",
    date: "2025-06-14",
    category: ["Institucional", "Social"],
    summary: "El club agradeció a quienes colaboran cada semana con tareas logísticas.",
    content: "Durante el entretiempo del partido de la Primera, se hizo entrega de diplomas simbólicos a las personas que trabajan detrás de escena: utileros, encargados del buffet, administrativos y quienes limpian el predio. ¡Gracias por tanto compromiso!",
    image: photo
  },
  {
    id: 12,
    title: "Escuelita vs Los Amigos",
    date: "2025-06-12",
    category: ["Fútbol", "Infantiles"],
    summary: "Lindo encuentro amistoso con otro club de barrio y tercer tiempo compartido.",
    content: "La Escuelita disputó una serie de partidos amistosos contra Los Amigos en nuestra cancha. Luego, compartieron una merienda donde se reforzaron valores como la amistad y el respeto. Felicitamos a ambos clubes por la jornada.",
    image: photo
  },
  {
    id: 13,
    title: "Comienzan obras en la cancha",
    date: "2025-06-10",
    category: ["Obras", "Institucional"],
    summary: "Se están nivelando los terrenos donde se construirá la nueva cancha.",
    content: "Ya comenzaron los trabajos de movimiento de suelo en el predio adquirido. El objetivo es contar con una cancha de fútbol 11 con riego y cerco perimetral. Esta obra representa un sueño largamente esperado por toda la comunidad del club.",
    image: photo
  },
  {
    id: 14,
    title: "Charla sobre nutrición deportiva",
    date: "2025-06-08",
    category: ["Formación", "Salud"],
    summary: "Una profesional compartió herramientas para mejorar la alimentación de los jugadores.",
    content: "Se realizó una charla abierta en el SUM del club con una licenciada en nutrición deportiva. Asistieron jugadores, familias y entrenadores. Se habló sobre hidratación, alimentación previa a los partidos y suplementación adecuada.",
    image: photo
  },
  {
    id: 15,
    title: "Sub 17: empate agónico",
    date: "2025-06-06",
    category: ["Fútbol", "Juveniles"],
    summary: "El equipo rescató un punto en la última jugada frente a Unión.",
    content: "En un partido muy disputado, el equipo Sub 17 logró empatar en el minuto final con un cabezazo de Franco Gómez. El resultado fue justo y permite mantener la ilusión en el campeonato. La próxima fecha se enfrentan a Deportivo Norte.",
    image: photo
  },
  {
    id: 16,
    title: "Se suma nuevo sponsor",
    date: "2025-06-04",
    category: ["Prensa", "Institucional"],
    summary: "La empresa Talca se incorpora como apoyo económico para el club.",
    content: "El club firmó un convenio con la empresa Talca, que se suma como sponsor oficial para lo que resta del año. Esto permitirá cubrir gastos de viajes, compra de materiales y desarrollo de obras. Su logo ya aparece en la camiseta oficial.",
    image: photo
  },
  {
    id: 17,
    title: "Campaña de donaciones",
    date: "2025-06-02",
    category: ["Social", "Eventos"],
    summary: "El club junta ropa de abrigo y alimentos para las familias del barrio.",
    content: "Lanzamos una campaña solidaria para acompañar a las familias más necesitadas durante el invierno. Podés acercar tus donaciones al club de lunes a viernes de 17 a 20 hs. Se necesitan frazadas, ropa, calzado y alimentos no perecederos.",
    image: photo
  },
  {
    id: 18,
    title: "Jornada recreativa Sub 9",
    date: "2025-05-30",
    category: ["Infantiles", "Fútbol"],
    summary: "Los chicos disfrutaron de juegos, música y una merienda compartida.",
    content: "En el marco de una jornada especial, la categoría Sub 9 participó de distintas actividades recreativas organizadas por el cuerpo técnico y padres. Hubo partidos informales, desafíos y música. Luego compartieron una merienda todos juntos.",
    image: photo
  },
  {
    id: 19,
    title: "Nuevo profesor de arquero",
    date: "2025-05-28",
    category: ["Formación", "Fútbol"],
    summary: "Se incorpora al cuerpo técnico un ex jugador con experiencia internacional.",
    content: "Se suma al club el profesor Gastón López, quien será el encargado de entrenar a los arqueros de todas las categorías. Con trayectoria en el fútbol profesional, aportará conocimientos técnicos y tácticos fundamentales para su desarrollo.",
    image: photo
  },
  {
    id: 20,
    title: "Carnet para socios",
    date: "2025-05-26",
    category: ["Institucional", "Prensa"],
    summary: "Ya está disponible el nuevo carnet con diseño renovado y QR digital.",
    content: "Desde esta semana los socios podrán retirar el nuevo carnet en la secretaría del club. Incluye un código QR que permitirá agilizar el ingreso a eventos, obtener descuentos y registrar la asistencia. ¡Sumate como socio activo!",
    image: photo
  },
  {
    id: 21,
    title: "El club en los medios",
    date: "2025-05-24",
    category: ["Prensa"],
    summary: "Importantes portales locales cubrieron nuestras últimas actividades deportivas.",
    content: "Los medios locales destacaron el crecimiento del club en todos sus aspectos: deportivos, sociales e institucionales. Agradecemos a Canal 10, Radio Impacto y Diario Zona Norte por difundir nuestro trabajo y compromiso comunitario.",
    image: photo
  }
];

export default newsData;
