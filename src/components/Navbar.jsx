import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/Navbar.css';
import logo from '../assets/imgs/shields/corg-full.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__logo" onClick={() => setIsOpen(false)}>
        <img src={logo} alt="Club Olimpo" />
        <span>Club Olimpo</span>
      </NavLink>

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
