import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          ORSA GROUP
        </Link>

        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/">{t("home")}</Link>
            </li>
            <li>
              <Link to="/oil">{t("our-oil")}</Link>
            </li>
            <li>
              <Link to="/our-items">{t("our-items")}</Link>
            </li>
            <li>
              <Link to="/our-branches">{t("our-branches")}</Link>
            </li>
            <li>
              <Link to="/our-offers">{t("our-offers")}</Link>
            </li>
          </ul>
        </div>

        <button className="language-switch" onClick={toggleLanguage}>
          {language === "en" ? "عربي" : "English"}
        </button>

        <div className="mobile-nav-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
