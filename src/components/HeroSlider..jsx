import { useEffect, useState } from "react";
import lisi from "../assets/imgs/welcome-carousel/lisi.jpg";
import juli from "../assets/imgs/welcome-carousel/juli.jpg";

const slides = [
  {
    subtitle: "Orgullo Auriazul",
    title: "Formación y Comunidad",
    text: "Enseñamos con compromiso, respeto y trabajo en equipo.",
    cta: "Ver misión",
    img: juli,
  },
  {
    subtitle: "Pasión y Tradición",
    title: "Nuestra Historia",
    text: "Más de 50 años formando jugadores y valores.",
    cta: "Conocer historia",
    img: lisi,
  },
];

const infoBoxes = [
  {
    title: "Torneo Local",
    text: "Participamos en la Liga Independiente con todas las categorías. ",
    cta: "Ver Fixture",
    img: lisi,
    imgLeft: true,
  },
  {
    title: "Equipo Juvenil",
    text: "Potenciamos jóvenes talentos con entrenadores especializados.",
    cta: "Ver Plantel",
    img: juli,
    imgLeft: false,
  },
];

const HeroSlider = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [infoIndex, setInfoIndex] = useState(infoBoxes.length - 1);

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
            <button>{currentInfo.cta}</button>
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
            <button>{cta}</button>
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
