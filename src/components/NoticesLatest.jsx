import clasicoImg from "../assets/imgs/welcome-carousel/juli.jpg";
import indumentariaImg from "../assets/imgs/welcome-carousel/lisi.jpg";
import juvenilesImg from "../assets/imgs/welcome-carousel/rafa.jpg";

const notices = [
  {
    id: 1,
    title: "Victoria en el clásico",
    summary:
      "El Club Olimpo ganó 2-1 en un emocionante partido frente a su clásico rival, demostrando garra y pasión en cada jugada.",
    description:
      "En una tarde inolvidable para los hinchas, el Club Olimpo se impuso 2-1 ante su eterno rival en el estadio local. El partido comenzó con mucha intensidad y ambos equipos tuvieron oportunidades claras de gol. Olimpo abrió el marcador a los 25 minutos con un remate de media distancia, pero el rival empató antes del descanso. En el segundo tiempo, el equipo mostró carácter y, tras una jugada colectiva, logró el gol de la victoria a falta de diez minutos para el final. La hinchada celebró con euforia y el plantel agradeció el apoyo incondicional. Este triunfo no solo suma tres puntos, sino que fortalece el espíritu del grupo de cara a los próximos desafíos.",
    date: "12/07/2025",
    image: clasicoImg,
  },
  {
    id: 2,
    title: "Nueva indumentaria oficial",
    summary:
      "Presentamos la nueva camiseta para la temporada 2025/26, con un diseño moderno y los colores tradicionales del club.",
    description:
      "El Club Olimpo lanzó oficialmente la indumentaria que vestirá a sus equipos durante la temporada 2025/26. El diseño, a cargo de una reconocida marca deportiva, respeta los colores históricos del club e incorpora detalles modernos que simbolizan la unión entre tradición y futuro. La camiseta principal es de un vibrante amarillo con detalles en negro, mientras que la alternativa invierte los colores para ofrecer una opción elegante y distintiva. Los jugadores y el cuerpo técnico participaron del evento de presentación, que contó con la presencia de socios y prensa local. Las nuevas camisetas ya están disponibles en la tienda oficial y se espera que sean un éxito entre los hinchas.",
    date: "10/07/2025",
    image: indumentariaImg,
  },
  {
    id: 3,
    title: "Convocatoria a juveniles",
    summary:
      "Se abren las inscripciones para las pruebas de juveniles. Buscamos nuevos talentos para formar parte de nuestras divisiones inferiores.",
    description:
      "El Club Olimpo anuncia la apertura de inscripciones para las pruebas de jugadores juveniles, dirigidas a chicos y chicas de entre 10 y 18 años. El objetivo es detectar y formar nuevos talentos que puedan sumarse a las divisiones inferiores del club. Las pruebas se realizarán durante el mes de agosto en el predio deportivo, bajo la supervisión de entrenadores y preparadores físicos del club. Los interesados deben completar el formulario online y presentar la documentación requerida el día de la prueba. Olimpo apuesta al desarrollo integral de sus jóvenes, brindando no solo formación deportiva sino también acompañamiento académico y social.",
    date: "08/07/2025",
    image: juvenilesImg,
  },
];

const NoticesLatest = () => (
  <section className="notices-latest">
    <h2>Noticias Recientes</h2>
    <ul>
      {notices.map((notice) => (
        <li key={notice.id}>
          <img
            src={notice.image}
            alt={notice.title}
            className="notices-latest__image"
            width={110}
            height={75}
          />
          <div className="notices-latest__info">
            <h3>{notice.title}</h3>
            <p>{notice.summary}</p>
            <div className="notices-latest__bottom-row">
              <small>{notice.date}</small>
              <button className="notices-latest__button">Ver más</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default NoticesLatest;