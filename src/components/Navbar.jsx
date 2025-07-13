// src/components/Navbar.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/Navbar.css'; // Asegúrate de tener un archivo CSS para estilos
import logo from '../assets/imgs/shields/corg-full.png'; // Usá tu logo o escudo aquí

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Club Olimpo" />
        <span>Club Olimpo</span>
      </div>

      <nav className={`navbar__links ${isOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={() => setIsOpen(false)}>Inicio</NavLink>
        <NavLink to="/notices" onClick={() => setIsOpen(false)}>Noticias</NavLink>
        <NavLink to="/matches" onClick={() => setIsOpen(false)}>Partidos</NavLink>
        <NavLink to="/squads" onClick={() => setIsOpen(false)}>Planteles</NavLink>
        <NavLink to="/about-us" onClick={() => setIsOpen(false)}>Historia</NavLink>
      </nav>

      <div className="navbar__toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
    </header>
  );
}

export default Navbar;