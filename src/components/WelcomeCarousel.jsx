import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import slide1 from "../assets/imgs/welcome-carousel/juli.jpg";
import slide2 from "../assets/imgs/welcome-carousel/lisi.jpg";
import slide3 from "../assets/imgs/welcome-carousel/rafa.jpg";

const slides = [
  { image: slide1, caption: "¡Bienvenidos al Club Olimpo!" },
  { image: slide2, caption: "Pasión, esfuerzo y comunidad" },
  { image: slide3, caption: "Viví el fútbol con nosotros" },
];

const WelcomeCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <div className="welcome-carousel keen-slider" ref={sliderRef}>
      {slides.map((slide, idx) => (
        <div className="keen-slider__slide" key={idx}>
          <img src={slide.image} alt={slide.caption} className="welcome-carousel__img" />
          <div className="welcome-carousel__caption">{slide.caption}</div>
        </div>
      ))}
      <button
        className="carousel-arrow carousel-arrow--left"
        onClick={() => instanceRef.current?.prev()}
        aria-label="Anterior"
      >
        &#8592;
      </button>
      <button
        className="carousel-arrow carousel-arrow--right"
        onClick={() => instanceRef.current?.next()}
        aria-label="Siguiente"
      >
        &#8594;
      </button>
      <div className="carousel-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot${currentSlide === idx ? " active" : ""}`}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomeCarousel;