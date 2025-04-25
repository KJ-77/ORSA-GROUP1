import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/Footer.css";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ORSA GROUP</h3>
          <p>
            Your premier source for Lebanese olive oil and authentic Lebanese
            products.
          </p>
        </div>

        <div className="footer-section">
          <h3>{t("home")}</h3>
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

        <div className="footer-section">
          <h3>{t("contact-us")}</h3>
          <p>Email: info@orsagroup.com</p>
          <p>Phone: +123-456-7890</p>
          <div className="social-links">
            {/* Social media links will go here */}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} ORSA GROUP. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
