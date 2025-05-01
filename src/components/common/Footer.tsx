import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#333] text-white pt-12 pb-4 mt-8">
      <div className="flex flex-wrap justify-between max-w-7xl mx-auto px-8">
        <div className="flex-1 min-w-[250px] mb-8">
          <h3 className="text-[#4a8e3b] mb-4 text-xl">ORSA GROUP</h3>
          <p className="mb-2 leading-relaxed">
            Your premier source for Lebanese olive oil and authentic Lebanese
            products.
          </p>
        </div>

        <div className="flex-1 min-w-[250px] mb-8">
          <h3 className="text-[#4a8e3b] mb-4 text-xl">{t("home")}</h3>
          <ul className="list-none p-0">
            <li className="mb-2">
              <Link
                to="/"
                className="text-[#ddd] no-underline transition-colors duration-300 hover:text-[#4a8e3b]"
              >
                {t("home")}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/oil"
                className="text-[#ddd] no-underline transition-colors duration-300 hover:text-[#4a8e3b]"
              >
                {t("our-oil")}
              </Link>
            </li>
            {/* <li className="mb-2">
              <Link
                to="/our-items"
                className="text-[#ddd] no-underline transition-colors duration-300 hover:text-[#4a8e3b]"
              >
                {t("our-items")}
              </Link>
            </li> */}
            <li className="mb-2">
              <Link
                to="/our-branches"
                className="text-[#ddd] no-underline transition-colors duration-300 hover:text-[#4a8e3b]"
              >
                {t("our-branches")}
              </Link>
            </li>
            {/* <li className="mb-2">
              <Link
                to="/our-offers"
                className="text-[#ddd] no-underline transition-colors duration-300 hover:text-[#4a8e3b]"
              >
                {t("our-offers")}
              </Link>
            </li> */}
          </ul>
        </div>

        <div className="flex-1 min-w-[250px] mb-8">
          <h3 className="text-[#4a8e3b] mb-4 text-xl">{t("contact-us")}</h3>
          <p className="mb-2">Email: info@orsagroup.com</p>
          <p className="mb-2">Phone: +123-456-7890</p>
          <div className="flex gap-4 mt-4">
            {/* Social media links will go here */}
          </div>
        </div>
      </div>

      <div className="text-center pt-8 mt-4 border-t border-white/10">
        <p>
          &copy; {new Date().getFullYear()} ORSA GROUP. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
