import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.svg";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

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
        <ul ref={menuRef} className={`nav-links ${isMenuOpen ? "open" : ""}`}>
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
          <li>
            <Link
              to="/login"
              className={location.pathname === "/login" ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              Connexion
            </Link>
          </li>
          <li>
            <Link
              to="/theme"
              className={location.pathname === "/theme-editor" ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              Theme
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
