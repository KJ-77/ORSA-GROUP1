import { createContext, useState, useContext, ReactNode } from "react";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: "Home",
    "our-oil": "Our Oil",
    "our-items": "Our Items",
    "our-branches": "Our Branches",
    "our-offers": "Our Offers",
    "contact-us": "Contact Us",
    "about-us": "About Us",
    // Add more translations as needed
  },
  ar: {
    home: "الرئيسية",
    "our-oil": "زيتنا",
    "our-items": "منتجاتنا",
    "our-branches": "فروعنا",
    "our-offers": "عروضنا",
    "contact-us": "اتصل بنا",
    "about-us": "من نحن",
    // Add more translations as needed
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const direction = language === "ar" ? "rtl" : "ltr";

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
  };

  const t = (key: string) => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, direction, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
