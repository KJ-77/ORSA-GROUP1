import React, { createContext, useState, useContext, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations: { [key: string]: { [key: string]: string } } = {
  en: {
    home: "Home",
    "our-products": "Our Products",
    "our-branches": "Our Branches",
    "about-us": "About Us",
    "about-desc-1":
      "ORSA is a family-owned business with a rich heritage in producing premium Lebanese olive oil. For over 50 years, we have been dedicated to cultivating the finest olives and crafting exceptional olive oil using traditional methods passed down through generations.",
    "about-desc-2":
      "Our commitment to quality, sustainability, and authenticity is at the heart of everything we do. We believe in preserving the natural goodness of the olive and delivering a product that embodies the true taste of Lebanon.",
    "hero-title": "Experience the Taste of Lebanon",
    "hero-subtitle":
      "Discover our exquisite collection of premium Lebanese olive oils, crafted with passion and tradition.",
    cart: "Cart",
    login: "Login",
    logout: "Logout",
    "confirm-logout": "Confirm Logout",
    "logout-message": "Are you sure you want to logout? You will need to sign in again to access your account.",
    cancel: "Cancel",
    "product-details": "Product Details",
  },
  ar: {
    home: "الرئيسية",
    "our-products": "منتجاتنا",
    "our-branches": "فروعنا",
    "about-us": "من نحن",
    "about-desc-1":
      "أورسا هي شركة عائلية ذات تراث غني في إنتاج زيت الزيتون اللبناني الفاخر. لأكثر من 50 عامًا، كرسنا جهودنا لزراعة أجود أنواع الزيتون وصناعة زيت زيتون استثنائي باستخدام الأساليب التقليدية المتوارثة عبر الأجيال.",
    "about-desc-2":
      "التزامنا بالجودة والاستدامة والأصالة هو جوهر كل ما نقوم به. نحن نؤمن بالحفاظ على الخير الطبيعي للزيتون وتقديم منتج يجسد الطعم الحقيقي للبنان.",
    "hero-title": "اختبر طعم لبنان",
    "hero-subtitle":
      "اكتشف مجموعتنا الرائعة من زيوت الزيتون اللبنانية الفاخرة، المصنوعة بشغف وتقاليد عريقة.",
    cart: "السلة",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    "confirm-logout": "تأكيد تسجيل الخروج",
    "logout-message": "هل أنت متأكد من رغبتك في تسجيل الخروج؟ ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى حسابك.",
    cancel: "إلغاء",
    "product-details": "تفاصيل المنتج",
  },
  fr: {
    home: "Accueil",
    "our-products": "Nos Produits",
    "our-branches": "Nos Succursales",
    "about-us": "À Propos de Nous",
    "about-desc-1":
      "ORSA est une entreprise familiale avec un riche héritage dans la production d'huile d'olive libanaise de première qualité. Depuis plus de 50 ans, nous nous engageons à cultiver les meilleures olives et à fabriquer une huile d'olive exceptionnelle en utilisant des méthodes traditionnelles transmises de génération en génération.",
    "about-desc-2":
      "Notre engagement envers la qualité, la durabilité et l'authenticité est au cœur de tout ce que nous faisons. Nous croyons en la préservation de la bonté naturelle de l'olive et en la livraison d'un produit qui incarne le vrai goût du Liban.",
    "hero-title": "Découvrez le Goût du Liban",
    "hero-subtitle":
      "Découvrez notre collection exquise d'huiles d'olive libanaises de première qualité, élaborées avec passion et tradition.",
    cart: "Panier",
    login: "Connexion",
    logout: "Déconnexion",
    "confirm-logout": "Confirmer la Déconnexion",
    "logout-message": "Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre compte.",
    cancel: "Annuler",
    "product-details": "Détails du Produit",
  },
  nl: {
    home: "Thuis",
    "our-products": "Onze Producten",
    "our-branches": "Onze Filialen",
    "about-us": "Over Ons",
    "about-desc-1":
      "ORSA is een familiebedrijf met een rijke geschiedenis in het produceren van premium Libanese olijfolie. Al meer dan 50 jaar zetten we ons in voor het telen van de beste olijven en het maken van uitzonderlijke olijfolie met behulp van traditionele methoden die van generatie op generatie zijn doorgegeven.",
    "about-desc-2":
      "Onze toewijding aan kwaliteit, duurzaamheid en authenticiteit staat centraal in alles wat we doen. Wij geloven in het behoud van de natuurlijke goedheid van de olijf en het leveren van een product dat de ware smaak van Libanon belichaamt.",
    "hero-title": "Ervaar de Smaak van Libanon",
    "hero-subtitle":
      "Ontdek onze voortreffelijke collectie premium Libanese olijfoliën, met passie en traditie vervaardigd.",
    cart: "Winkelwagen",
    login: "Inloggen",
    logout: "Uitloggen",
    "confirm-logout": "Uitloggen Bevestigen",
    "logout-message": "Weet je zeker dat je wilt uitloggen? Je moet opnieuw inloggen om toegang te krijgen tot je account.",
    cancel: "Annuleren",
    "product-details": "Productdetails",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("en"); // Default to English

  const t = (key: string): string => {
    return translations[language][key] || key; // Fallback to key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
