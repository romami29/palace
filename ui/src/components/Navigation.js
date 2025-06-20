import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.svg";

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
            <img src={logo} alt="Palace Club Logo" className="logo-image" />
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
          <li>
            <Link
              to="/merch"
              className={location.pathname === "/merch" ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              Merch
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
