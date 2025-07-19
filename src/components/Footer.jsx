import React from "react";
import { Link } from 'react-router-dom';
import escudo from "../assets/imgs/shields/corg-full.png"; // Asumo que esta es la ruta correcta de tu escudo
import { FaFacebookF, FaInstagram } from 'react-icons/fa'; // Solo Facebook e Instagram según la última imagen

const Footer = () => {
  return (
    <footer className="footer">
      {/* Sección superior del footer (logo y nombre del club) */}
      <div className="footer__top-section">
        <img src={escudo} alt="Escudo Club Olimpo" />
        <div className="footer__official">Sitio Oficial del Club Olimpo</div>
      </div>

      {/* Nueva sección para la parte superior del footer inferior (Enlaces, Powered by, Redes) */}
      <div className="footer__bottom-top-row">
        <div className="footer__bottom-links">
          {/* Enlaces de políticas */}
          <p>&copy; {new Date().getFullYear()} Club Olimpo. Todos los derechos reservados.</p>
        </div>

        <div className="footer__powered-by">
          Desarrollado por <span className="footer__powered-by-text">Axel Brian Dip</span> {/* Texto "Desarrollado por Axel Brian Dip" */}
        </div>

        <div className="footer__social-icons">
          {/* Iconos de redes sociales */}
          <span className="footer__social-text">Redes sociales:</span> {/* Texto "Redes sociales:" */}
          <a href="https://facebook.com/clubolimpo.rg" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://instagram.com/clubolimpo.rg" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>

      {/* Nueva sección para la parte inferior del footer inferior (Copyright y Desarrollador) */}
      <div className="footer__bottom-copyright">
        <Link to="/admin">Acceso Admin</Link>
        {/* Orden de los párrafos invertido */}
      </div>
    </footer>
  );
};

export default Footer;