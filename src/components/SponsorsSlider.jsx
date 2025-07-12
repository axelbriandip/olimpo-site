import React, { useState } from "react";

import uno from "../assets/imgs/sponsors/1.png";
import dos from "../assets/imgs/sponsors/2.png";
import tres from "../assets/imgs/sponsors/3.png";
import cuatro from "../assets/imgs/sponsors/4.png";

const sponsors = [
  { src: uno, alt: "Sponsor 1", url: "https://instagram.com/clubolimpo.rg" },
  { src: dos, alt: "Sponsor 2", url: "https://instagram.com/clubolimpo.rg" },
  { src: tres, alt: "Sponsor 3", url: "https://instagram.com/clubolimpo.rg" },
  { src: cuatro, alt: "Sponsor 4", url: "https://instagram.com/clubolimpo.rg" },
  { src: uno, alt: "Sponsor 1", url: "https://instagram.com/clubolimpo.rg" },
  { src: dos, alt: "Sponsor 2", url: "https://instagram.com/clubolimpo.rg" },
  { src: tres, alt: "Sponsor 3", url: "https://instagram.com/clubolimpo.rg" },
  { src: cuatro, alt: "Sponsor 4", url: "https://instagram.com/clubolimpo.rg" },
];

const SponsorsSlider = () => {
  return (
    <section className="sponsors-section">
      <h2 className="sponsors-title">Nuestros Sponsors</h2>
      <p className="sponsors-description">
        Agradecemos el apoyo de las empresas que hacen posible el crecimiento de nuestro club.
      </p>

      <div className="slider-wrapper">
        <div className="slider-track">
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="slide"
            >
              <img src={sponsor.src} alt={sponsor.alt} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSlider;