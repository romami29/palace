import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" className="logo-text">
            Palace Club
          </Link>
        </div>
        <button className="hamburger" onClick={handleMenuToggle}>
          ☰
        </button>
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/agenda"
              className={location.pathname === "/agenda" ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              Agenda
            </Link>
          </li>
          <li>
            <Link
              to="/reservation"
              className={location.pathname === "/reservation" ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              Reservation
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;