import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    setIsMenuOpen(false);
    setShowLogoutDialog(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md bg-white/90 shadow-xl border-b border-white/20`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          {/* Enhanced Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 group flex-shrink-0"
          >
            <div className="relative">
              {/* Logo with 3D effects */}
              <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-yellow-600/30 shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 bg-yellow-600/10">
                <img
                  src="/new-orsa-logo.jpg"
                  alt="ORSA Logo"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                />
              </div>
              {/* Floating ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-yellow-600/50 animate-pulse"></div>
              <div className="absolute -inset-2 rounded-full border border-yellow-500/30 animate-ping"></div>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-black tracking-wider transition-colors duration-300 text-yellow-700 group-hover:text-yellow-600`}
              >
                ORSA
              </span>
              <span
                className={`text-xs font-semibold transition-colors duration-300 text-gray-600`}
              >
                Premium Olive Oil
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
            <Link
              to="/"
              className={`px-3 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm ${
                isActive("/")
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
              }`}
              onClick={closeMenu}
            >
              {t("home")}
            </Link>
            <Link
              to="/oil"
              className={`px-3 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm ${
                isActive("/oil")
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
              }`}
              onClick={closeMenu}
            >
              {t("our-products")}
            </Link>
            <Link
              to="/our-branches"
              className={`px-3 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm ${
                isActive("/our-branches")
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
              }`}
              onClick={closeMenu}
            >
              {t("our-branches")}
            </Link>
          </div>

          {/* Contact Information - Compact */}
          <div className="hidden xl:flex items-center space-x-3 flex-shrink-0">
            <div className={`text-xs font-medium text-gray-600`}>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="whitespace-nowrap">+32 466 31 69 14</span>
              </div>
            </div>
            <div className={`text-xs font-medium text-gray-600`}>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="whitespace-nowrap">Orsa.t@hotmail.com</span>
              </div>
            </div>
          </div>

          {/* Language Switcher - Compact */}
          <div className="hidden lg:flex items-center space-x-1 flex-shrink-0">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                language === "en"
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ar")}
              className={`px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                language === "ar"
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
              }`}
            >
              AR
            </button>
            <button
              onClick={() => setLanguage("fr")}
              className={`px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                language === "fr"
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLanguage("nl")}
              className={`px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                language === "nl"
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
              }`}
            >
              NL
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {user ? (
              <>
                <Link
                  to="/cart"
                  className={`px-3 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm ${
                    isActive("/cart")
                      ? "bg-yellow-500 text-white shadow-lg"
                      : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                  }`}
                  onClick={closeMenu}
                >
                  {t("cart")}
                </Link>
                <button
                  onClick={handleLogout}
                  className={`px-3 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm ${
                    isScrolled
                      ? "text-gray-700 hover:text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg text-sm whitespace-nowrap"
                onClick={closeMenu}
              >
                {t("login")}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg transition-colors duration-300 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 backdrop-blur-md bg-white/95 border-b border-white/20 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isActive("/")
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
                onClick={closeMenu}
              >
                {t("home")}
              </Link>
              <Link
                to="/oil"
                className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isActive("/oil")
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
                onClick={closeMenu}
              >
                {t("our-products")}
              </Link>
              <Link
                to="/our-branches"
                className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isActive("/our-branches")
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
                onClick={closeMenu}
              >
                {t("our-branches")}
              </Link>

              {/* Mobile Contact Info */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="text-sm text-gray-600 flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+32 466 31 69 14</span>
                </div>
                <div className="text-sm text-gray-600 flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+32 478 69 25 86</span>
                </div>
                <div className="text-sm text-gray-600 flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Orsa.t@hotmail.com</span>
                </div>
              </div>

              {/* Mobile Language Switcher */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      language === "en"
                        ? "bg-yellow-500 text-white shadow-lg"
                        : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage("ar")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      language === "ar"
                        ? "bg-yellow-500 text-white shadow-lg"
                        : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                    }`}
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => setLanguage("fr")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      language === "fr"
                        ? "bg-yellow-500 text-white shadow-lg"
                        : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                    }`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => setLanguage("nl")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      language === "nl"
                        ? "bg-yellow-500 text-white shadow-lg"
                        : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                    }`}
                  >
                    Nederlands
                  </button>
                </div>
              </div>

              {/* Mobile User Menu */}
              <div className="border-t border-gray-200 pt-4">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/cart"
                      className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        isActive("/cart")
                          ? "bg-emerald-500 text-white shadow-lg"
                          : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                      }`}
                      onClick={closeMenu}
                    >
                      {t("cart")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 rounded-lg font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                    >
                      {t("logout")}
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="block px-4 py-3 rounded-lg font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-300 text-center"
                    onClick={closeMenu}
                  >
                    {t("login")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              {t("confirm-logout") || "Confirm Logout"}
            </DialogTitle>
            <DialogDescription>
              {t("logout-message") ||
                "Are you sure you want to logout? You will need to sign in again to access your account."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => setShowLogoutDialog(false)}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              {t("cancel") || "Cancel"}
            </button>
            <button
              onClick={confirmLogout}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
            >
              {t("logout") || "Logout"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
