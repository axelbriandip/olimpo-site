import React from "react";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import escudo from "../assets/imgs/shields/corg-full.png"; // Asegurate de tener esta imagen

const Footer = () => {
  return (
    <footer className="footer">
      <img src={escudo} alt="Escudo Club Olimpo" />
      <div className="footer__official">Sitio Oficial del Club Olimpo</div>
      <div className="footer__socials">
        <a href="https://facebook.com/clubolimpo.rg" target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>
        <a href="https://instagram.com/clubolimpo.rg" target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Club Olimpo. Todos los derechos reservados.</p>
        <p>
          Desarrollado por Brian Dip (<a href="https://wa.me/542964569727" target="_blank" rel="noopener noreferrer">+54 2964-569727</a>)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
