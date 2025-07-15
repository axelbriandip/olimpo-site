import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lisi from "../assets/imgs/welcome-carousel/lisi.jpg";
import juli from "../assets/imgs/welcome-carousel/juli.jpg";

const slides = [
  {
    subtitle: "Novedades del Club",
    title: "Actualidad Auriazul",
    text: "Enterate de las últimas noticias, logros y novedades del club.",
    cta: "Ver Noticias",
    img: juli,
  },
  {
    subtitle: "Pasado que inspira",
    title: "Nuestra Historia",
    text: "Recorré los momentos más importantes que marcaron el camino de Olimpo.",
    cta: "Ver Historia",
    img: lisi,
  },
  {
    subtitle: "Calendario Deportivo",
    title: "Agenda de Partidos",
    text: "Revisá el calendario de encuentros, horarios y resultados actualizados.",
    cta: "Ver Partidos",
    img: juli,
  },
  {
    subtitle: "Categorías del Club",
    title: "Nuestros Planteles",
    text: "Conocé a los jugadores y cuerpos técnicos de cada categoría.",
    cta: "Ver Planteles",
    img: lisi,
  },
];

const infoBoxes = [
  {
    title: "Actualidad Auriazul",
    text: "Enterate de las últimas noticias, logros y novedades del club.",
    cta: "Ver Noticias",
    img: juli,
    imgLeft: true,
  },
  {
    title: "Nuestra Historia",
    text: "Recorré los momentos más importantes que marcaron el camino de Olimpo.",
    cta: "Ver Historia",
    img: lisi,
    imgLeft: false,
  },
  {
    title: "Agenda de Partidos",
    text: "Revisá el calendario de encuentros, horarios y resultados actualizados.",
    cta: "Ver Partidos",
    img: juli,
    imgLeft: true,
  },
  {
    title: "Nuestros Planteles",
    text: "Conocé a los jugadores y cuerpos técnicos de cada categoría.",
    cta: "Ver Planteles",
    img: lisi,
    imgLeft: false,
  },
];

const HeroSlider = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [infoIndex, setInfoIndex] = useState(infoBoxes.length - 1);
  const navigate = useNavigate();

  useEffect(() => {
    const heroInterval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    const infoInterval = setInterval(() => {
      setInfoIndex((prev) => (prev - 1 + infoBoxes.length) % infoBoxes.length);
    }, 5000);

    return () => {
      clearInterval(heroInterval);
      clearInterval(infoInterval);
    };
  }, []);

  const getRouteFromCta = (ctaText) => {
    switch (ctaText) {
      case "Ver Noticias":
        return "/notices";
      case "Ver Historia":
        return "/about-us";
      case "Ver Partidos":
        return "/matches";
      case "Ver Planteles":
        return "/squads";
      default:
        return "/";
    }
  };

  const { subtitle, title, text, cta, img } = slides[heroIndex];
  const currentInfo = infoBoxes[infoIndex];

  return (
    <>
      <section className="info-box white-bg">
        <div className={`info-box-inner ${currentInfo.imgLeft ? "img-left" : "img-right"}`}>
          <div className="info-img">
            <img src={currentInfo.img} alt={currentInfo.title} />
          </div>
          <div className="info-content">
            <div className="data">
              <h3>{currentInfo.title}</h3>
              <p>{currentInfo.text}</p>
            </div>
            <button onClick={() => navigate(getRouteFromCta(currentInfo.cta))}>
              {currentInfo.cta}
            </button>
          </div>
        </div>
      </section>

      <section className="hero">
        <div className="hero-box small-height">
          <div className="hero-content">
            <div className="header">
              <h4>{subtitle}</h4>
              <h1>{title}</h1>
            </div>
            <p>{text}</p>
            <button onClick={() => navigate(getRouteFromCta(cta))}>
              {cta}
            </button>
          </div>
          <div className="hero-image">
            <img src={img} alt="Slide visual" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSlider;
