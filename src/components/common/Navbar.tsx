import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, t, setLanguage } = useLanguage();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsLangMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLangMenu = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 shadow-md z-[1000] transition-all duration-300">
      <div className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-2xl font-bold text-[#333] no-underline transition-colors duration-300 hover:text-[#4a8e3b]"
        >
          ORSA GROUP
        </Link>

        <div
          className={`md:flex items-center ${
            isOpen
              ? "fixed top-[70px] right-0 bg-white/98 w-full h-[calc(100vh-70px)] flex-col transition-all duration-300 shadow-lg"
              : "fixed top-[70px] -right-full bg-white/98 w-full h-[calc(100vh-70px)] flex-col transition-all duration-300 shadow-lg md:relative md:top-0 md:right-0 md:bg-transparent md:w-auto md:h-auto md:flex md:flex-row md:shadow-none"
          }`}
        >
          <ul
            className={`${
              isOpen
                ? "flex flex-col items-center w-full py-8"
                : "hidden md:flex"
            } list-none m-0 p-0`}
          >
            {" "}
            <li className="mx-4 my-0 md:my-0 md:mx-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-[#333] no-underline font-medium transition-colors duration-300 hover:text-[#4a8e3b] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-[5px] after:left-0 after:bg-[#4a8e3b] after:transition-all after:duration-300 hover:after:w-full"
              >
                {t("home")}
              </Link>
            </li>
            <li className="mx-4 my-6 md:my-0 md:mx-4">
              <Link
                to="/oil"
                onClick={() => setIsOpen(false)}
                className="text-[#333] no-underline font-medium transition-colors duration-300 hover:text-[#4a8e3b] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-[5px] after:left-0 after:bg-[#4a8e3b] after:transition-all after:duration-300 hover:after:w-full"
              >
                {t("our-oil")}
              </Link>
            </li>
            {/* <li className="mx-4 my-6 md:my-0 md:mx-4">
              <Link
                to="/our-items"
                className="text-[#333] no-underline font-medium transition-colors duration-300 hover:text-[#4a8e3b] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-[5px] after:left-0 after:bg-[#4a8e3b] after:transition-all after:duration-300 hover:after:w-full"
              >
                {t("our-items")}
              </Link>
            </li> */}{" "}
            <li className="mx-4 my-6 md:my-0 md:mx-4">
              <Link
                to="/our-branches"
                onClick={() => setIsOpen(false)}
                className="text-[#333] no-underline font-medium transition-colors duration-300 hover:text-[#4a8e3b] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-[5px] after:left-0 after:bg-[#4a8e3b] after:transition-all after:duration-300 hover:after:w-full"
              >
                {t("our-branches")}
              </Link>
            </li>
            <li className="mx-4 my-6 md:my-0 md:mx-4">
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="text-[#333] no-underline font-medium transition-colors duration-300 hover:text-[#4a8e3b] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-[5px] after:left-0 after:bg-[#4a8e3b] after:transition-all after:duration-300 hover:after:w-full"
              >
                Cart
              </Link>
            </li>
            {/* <li className="mx-4 my-6 md:my-0 md:mx-4">
              <Link
                to="/our-offers"
                className="text-[#333] no-underline font-medium transition-colors duration-300 hover:text-[#4a8e3b] relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-[5px] after:left-0 after:bg-[#4a8e3b] after:transition-all after:duration-300 hover:after:w-full"
              >
                {t("our-offers")}
              </Link>
            </li> */}
          </ul>
        </div>

        <div className="flex items-center">
          <div className="relative mr-4">
            <button
              className="border border-[#4a8e3b] bg-transparent text-[#4a8e3b] py-2 px-4 rounded cursor-pointer transition-all duration-300 hover:bg-[#4a8e3b] hover:text-white flex items-center"
              onClick={toggleLangMenu}
            >
              {t("toggle-language")}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isLangMenuOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                    language === "en" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setLanguage("en");
                    setIsLangMenuOpen(false);
                  }}
                >
                  {t("english")}
                </button>
                <button
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                    language === "ar" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setLanguage("ar");
                    setIsLangMenuOpen(false);
                  }}
                >
                  {t("arabic")}
                </button>{" "}
                <button
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                    language === "nl" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setLanguage("nl");
                    setIsLangMenuOpen(false);
                  }}
                >
                  {t("dutch")}
                </button>
                <button
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                    language === "fr" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setLanguage("fr");
                    setIsLangMenuOpen(false);
                  }}
                >
                  {t("french")}
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            <div className="flex flex-col justify-between w-[30px] h-[21px]">
              <span
                className={`block h-[3px] w-full bg-[#333] transition-all duration-300 ${
                  isOpen ? "transform translate-y-[9px] rotate-45" : ""
                }`}
              ></span>
              <span
                className={`block h-[3px] w-full bg-[#333] transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-[3px] w-full bg-[#333] transition-all duration-300 ${
                  isOpen ? "transform -translate-y-[9px] -rotate-45" : ""
                }`}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
