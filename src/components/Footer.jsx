// src/components/Footer.jsx
import "../styles/components/Footer.css";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <hr />
      <div className="footer__content">
        <div className="footer__left">
          <span>© 2025 Club Olimpo</span>
        </div>
        <div className="footer__right">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;