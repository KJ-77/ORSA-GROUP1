import { createContext, useState, useContext, ReactNode } from "react";

type Language = "en" | "ar" | "nl";
type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void; // Add new function to set language directly
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation & Common
    home: "Home",
    "our-oil": "Our Oil",
    "our-items": "Our Items",
    "our-branches": "Our Branches",
    "our-offers": "Our Offers",
    "contact-us": "Contact Us",
    "about-us": "About Us",

    // Home Page
    "hero-title": "ORSA GROUP",
    "hero-subtitle": "Premium Lebanese Olive Oil and Authentic Products",
    "featured-products": "Featured Products",
    "extra-virgin": "Extra Virgin Olive Oil",
    "extra-virgin-desc": "Premium quality Lebanese olive oil from our estates.",
    "organic-oil": "Organic Olive Oil",
    "organic-oil-desc":
      "100% organic olive oil from traditional Lebanese orchards.",
    "infused-oil": "Infused Olive Oil",
    "infused-oil-desc":
      "Olive oil infused with local Lebanese herbs and spices.",
    "learn-more": "Learn More",
    "about-desc-1":
      "ORSA GROUP is dedicated to bringing the finest Lebanese olive oil and authentic products to consumers worldwide. Our mission is to share Lebanon's rich culinary heritage through high-quality, sustainably sourced products.",
    "about-desc-2":
      "Founded with a passion for Lebanese traditions, ORSA GROUP ensures that every product meets the highest standards of quality and authenticity.",

    // Oil Page
    "oil-page-title": "Our Oil",
    "oil-page-subtitle":
      "Discover our selection of premium Lebanese olive oils",
    "quality-desc-1":
      "At ORSA GROUP, we're committed to delivering the highest quality olive oil. Our olives are hand-picked at the optimal time and cold-pressed within hours to ensure maximum freshness and nutritional value.",
    "quality-desc-2":
      "We maintain strict quality control throughout our production process, from cultivation to bottling, ensuring that every bottle meets our exacting standards.",

    // Product Descriptions
    "product-1-name": "Extra Virgin Olive Oil",
    "product-1-desc":
      "Our premium extra virgin olive oil is cold-pressed from handpicked Lebanese olives, delivering an authentic taste of Lebanon's rich olive heritage.",
    "product-1-details": "Available in 500ml and 750ml bottles",

    "product-2-name": "Organic Olive Oil",
    "product-2-desc":
      "Certified organic olive oil from our sustainable orchards in Lebanon, perfect for health-conscious consumers looking for pure, natural products.",
    "product-2-details": "Available in 500ml bottles",

    "product-3-name": "Infused Olive Oil - Garlic",
    "product-3-desc":
      "Our classic olive oil infused with fresh garlic, adding a delicious flavor to your favorite dishes.",
    "product-3-details": "Available in 250ml bottles",

    "product-4-name": "Infused Olive Oil - Rosemary",
    "product-4-desc":
      "Extra virgin olive oil infused with fresh rosemary for a fragrant and herbaceous flavor profile.",
    "product-4-details": "Available in 250ml bottles",

    "product-5-name": "Premium Blend Olive Oil",
    "product-5-desc":
      "A carefully crafted blend of olive varieties, offering a balanced flavor profile perfect for everyday cooking.",
    "product-5-details": "Available in 1L bottles",

    "product-6-name": "Early Harvest Olive Oil",
    "product-6-desc":
      "Harvested from young green olives for a more intense flavor with peppery notes and higher antioxidant content.",
    "product-6-details": "Available in 500ml bottles, limited production",

    // Branches Page
    "branches-page-title": "Our Branches",
    "branches-page-subtitle": "Visit us at one of our locations across Lebanon",
    "get-in-touch": "Get in Touch",
    "cannot-find":
      "Can't find a branch near you? Contact our customer service team for information about our products, wholesale inquiries, or to place an order for delivery.",
    "general-inquiries": "General Inquiries",
    "customer-service": "Customer Service",
    hours: "Hours",
    "view-on-map": "View on Map",
    phone: "Phone",
    email: "Email",

    // Branch Names
    "branch-1-name": "Beirut Flagship Store",
    "branch-2-name": "Tripoli Branch",
    "branch-3-name": "Byblos Outlet",
    "branch-4-name": "Baalbek Shop",
    "lebanon-branch": "Lebanon Branch",
    "belgium-branch": "Belgium Branch",
    "get-directions": "Get Directions",

    // Team Section
    "our-team": "Our Team",
    "team-subtitle": "Meet the dedicated professionals behind ORSA GROUP",
    "founder-ceo": "Founder & CEO",
    "operations-manager": "Operations Manager",
    "lebanon-branch-manager": "Lebanon Branch Manager",
    "customer-relations": "Customer Relations",
    "john-doe-desc":
      "With over 15 years of experience in importing Lebanese products, John founded ORSA GROUP to share authentic Lebanese flavors with Europe.",
    "sarah-smith-desc":
      "Sarah oversees all operations between our Belgium and Lebanon branches, ensuring smooth logistics and product quality.",
    "ali-hassan-desc":
      "Ali works directly with Lebanese farmers and producers to source the highest quality products for our customers.",
    "marie-dubois-desc":
      "Marie ensures all our customers receive exceptional service and helps with product selection and recommendations.",

    // Footer
    "footer-description":
      "Your premier source for Lebanese olive oil and authentic Lebanese products.",
    "rights-reserved": "All rights reserved.",

    // Miscellaneous
    "toggle-language": "Language",
    "select-language": "Select Language",
    english: "English",
    arabic: "العربية",
    dutch: "Nederlands",
  },
  ar: {
    // Navigation & Common
    home: "الرئيسية",
    "our-oil": "زيتنا",
    "our-items": "منتجاتنا",
    "our-branches": "فروعنا",
    "our-offers": "عروضنا",
    "contact-us": "اتصل بنا",
    "about-us": "من نحن",

    // Home Page
    "hero-title": "مجموعة أورسا",
    "hero-subtitle": "زيت زيتون لبناني فاخر ومنتجات لبنانية أصيلة",
    "featured-products": "منتجات مميزة",
    "extra-virgin": "زيت زيتون بكر ممتاز",
    "extra-virgin-desc": "زيت زيتون لبناني عالي الجودة من مزارعنا.",
    "organic-oil": "زيت زيتون عضوي",
    "organic-oil-desc":
      "زيت زيتون عضوي 100% من بساتين الزيتون اللبنانية التقليدية.",
    "infused-oil": "زيت زيتون منكّه",
    "infused-oil-desc": "زيت زيتون منكّه بالأعشاب والتوابل اللبنانية المحلية.",
    "learn-more": "اقرأ المزيد",
    "about-desc-1":
      "تكرس مجموعة أورسا جهودها لتقديم أفضل زيت الزيتون اللبناني والمنتجات الأصيلة للمستهلكين في جميع أنحاء العالم. مهمتنا هي مشاركة تراث لبنان الغني من خلال منتجات عالية الجودة ومستدامة.",
    "about-desc-2":
      "تأسست بشغف للتقاليد اللبنانية، وتضمن مجموعة أورسا أن كل منتج يلبي أعلى معايير الجودة والأصالة.",

    // Oil Page
    "oil-page-title": "زيتنا",
    "oil-page-subtitle": "اكتشف مجموعتنا من زيوت الزيتون اللبنانية الفاخرة",
    "quality-commitment": "التزامنا بالجودة",
    "quality-desc-1":
      "في مجموعة أورسا، نحن ملتزمون بتقديم زيت زيتون عالي الجودة. يتم قطف الزيتون يدويًا في الوقت الأمثل وعصره على البارد في غضون ساعات لضمان أقصى قدر من النضارة والقيمة الغذائية.",
    "quality-desc-2":
      "نحافظ على رقابة صارمة على الجودة طوال عملية الإنتاج، من الزراعة إلى التعبئة، مما يضمن أن كل زجاجة تلبي معاييرنا الدقيقة.",

    // Product Descriptions
    "product-1-name": "زيت زيتون بكر ممتاز",
    "product-1-desc":
      "زيت الزيتون البكر الممتاز لدينا معصور على البارد من زيتون لبناني مقطوف يدويًا، مما يوفر طعمًا أصيلًا من تراث الزيتون اللبناني الغني.",
    "product-1-details": "متوفر في زجاجات سعة 500 مل و 750 مل",

    "product-2-name": "زيت زيتون عضوي",
    "product-2-desc":
      "زيت زيتون عضوي معتمد من بساتيننا المستدامة في لبنان، مثالي للمستهلكين المهتمين بالصحة الذين يبحثون عن منتجات طبيعية نقية.",
    "product-2-details": "متوفر في زجاجات سعة 500 مل",

    "product-3-name": "زيت زيتون منكّه - ثوم",
    "product-3-desc":
      "زيت الزيتون الكلاسيكي لدينا منكّه بالثوم الطازج، مما يضيف نكهة لذيذة إلى أطباقك المفضلة.",
    "product-3-details": "متوفر في زجاجات سعة 250 مل",

    "product-4-name": "زيت زيتون منكّه - إكليل الجبل",
    "product-4-desc":
      "زيت زيتون بكر ممتاز منكّه بإكليل الجبل الطازج لنكهة عطرة وعشبية.",
    "product-4-details": "متوفر في زجاجات سعة 250 مل",

    "product-5-name": "مزيج زيت الزيتون الفاخر",
    "product-5-desc":
      "مزيج مصمم بعناية من أصناف الزيتون، يقدم نكهة متوازنة مثالية للطهي اليومي.",
    "product-5-details": "متوفر في زجاجات سعة 1 لتر",

    "product-6-name": "زيت زيتون الحصاد المبكر",
    "product-6-desc":
      "محصود من ثمار الزيتون الخضراء الصغيرة للحصول على نكهة أكثر كثافة مع ملاحظات فلفلية ومحتوى أعلى من مضادات الأكسدة.",
    "product-6-details": "متوفر في زجاجات سعة 500 مل، إنتاج محدود",

    // Branches Page
    "branches-page-title": "فروعنا",
    "branches-page-subtitle": "قم بزيارتنا في أحد مواقعنا في جميع أنحاء لبنان",
    "get-in-touch": "ابق على تواصل",
    "cannot-find":
      "لا يمكنك العثور على فرع بالقرب منك؟ اتصل بفريق خدمة العملاء لدينا للحصول على معلومات حول منتجاتنا، أو استفسارات البيع بالجملة، أو لتقديم طلب للتوصيل.",
    "general-inquiries": "استفسارات عامة",
    "customer-service": "خدمة العملاء",
    hours: "ساعات العمل",
    "view-on-map": "عرض على الخريطة",
    phone: "هاتف",
    email: "بريد إلكتروني",

    // Branch Names
    "branch-1-name": "متجر بيروت الرئيسي",
    "branch-2-name": "فرع طرابلس",
    "branch-3-name": "منفذ جبيل",
    "branch-4-name": "متجر بعلبك",
    "lebanon-branch": "فرع لبنان",
    "belgium-branch": "فرع بلجيكا",
    "get-directions": "الحصول على الاتجاهات",

    // Team Section
    "our-team": "فريقنا",
    "team-subtitle": "تعرف على المحترفين المتفانين وراء مجموعة أورسا",
    "founder-ceo": "المؤسس والرئيس التنفيذي",
    "operations-manager": "مدير العمليات",
    "lebanon-branch-manager": "مدير فرع لبنان",
    "customer-relations": "علاقات العملاء",
    "john-doe-desc":
      "بخبرة تزيد عن 15 عامًا في استيراد المنتجات اللبنانية، أسس جون مجموعة أورسا لمشاركة النكهات اللبنانية الأصيلة مع أوروبا.",
    "sarah-smith-desc":
      "تشرف سارة على جميع العمليات بين فروعنا في بلجيكا ولبنان، مما يضمن سلاسة الخدمات اللوجستية وجودة المنتج.",
    "ali-hassan-desc":
      "يعمل علي مباشرة مع المزارعين والمنتجين اللبنانيين للحصول على أعلى جودة من المنتجات لعملائنا.",
    "marie-dubois-desc":
      "تضمن ماري حصول جميع عملائنا على خدمة استثنائية وتساعد في اختيار المنتجات وتقديم التوصيات.",

    // Footer
    "footer-description":
      "مصدرك الأول لزيت الزيتون اللبناني والمنتجات اللبنانية الأصيلة.",
    "rights-reserved": "جميع الحقوق محفوظة.",

    // Miscellaneous
    "toggle-language": "اللغة",
    "select-language": "اختر اللغة",
    english: "English",
    arabic: "العربية",
    dutch: "Nederlands",
  },
  nl: {
    // Navigation & Common
    home: "Home",
    "our-oil": "Onze Olie",
    "our-items": "Onze Producten",
    "our-branches": "Onze Filialen",
    "our-offers": "Onze Aanbiedingen",
    "contact-us": "Contact",
    "about-us": "Over Ons",

    // Home Page
    "hero-title": "ORSA GROUP",
    "hero-subtitle": "Premium Libanese Olijfolie en Authentieke Producten",
    "featured-products": "Uitgelichte Producten",
    "extra-virgin": "Extra Vierge Olijfolie",
    "extra-virgin-desc":
      "Premium kwaliteit Libanese olijfolie van onze landgoederen.",
    "organic-oil": "Biologische Olijfolie",
    "organic-oil-desc":
      "100% biologische olijfolie uit traditionele Libanese boomgaarden.",
    "infused-oil": "Gearomatiseerde Olijfolie",
    "infused-oil-desc":
      "Olijfolie geïnfuseerd met lokale Libanese kruiden en specerijen.",
    "learn-more": "Meer Informatie",
    "about-desc-1":
      "ORSA GROUP is toegewijd aan het brengen van de fijnste Libanese olijfolie en authentieke producten naar consumenten wereldwijd. Onze missie is om het rijke culinaire erfgoed van Libanon te delen door middel van hoogwaardige, duurzaam verkregen producten.",
    "about-desc-2":
      "Opgericht met een passie voor Libanese tradities, zorgt ORSA GROUP ervoor dat elk product voldoet aan de hoogste normen van kwaliteit en authenticiteit.",

    // Oil Page
    "oil-page-title": "Onze Olie",
    "oil-page-subtitle": "Ontdek onze selectie premium Libanese olijfoliën",
    "quality-commitment": "Onze Kwaliteitsgarantie",
    "quality-desc-1":
      "Bij ORSA GROUP zijn we toegewijd aan het leveren van olijfolie van de hoogste kwaliteit. Onze olijven worden met de hand geplukt op het optimale moment en binnen enkele uren koudgeperst om maximale versheid en voedingswaarde te garanderen.",
    "quality-desc-2":
      "We handhaven strikte kwaliteitscontrole gedurende ons hele productieproces, van teelt tot botteling, zodat elke fles voldoet aan onze hoge normen.",

    // Product Descriptions
    "product-1-name": "Extra Vierge Olijfolie",
    "product-1-desc":
      "Onze premium extra vierge olijfolie is koudgeperst van handgeplukte Libanese olijven, met een authentieke smaak van het rijke olijferfgoed van Libanon.",
    "product-1-details": "Verkrijgbaar in 500ml en 750ml flessen",

    "product-2-name": "Biologische Olijfolie",
    "product-2-desc":
      "Gecertificeerde biologische olijfolie van onze duurzame boomgaarden in Libanon, perfect voor gezondheidsbewuste consumenten die op zoek zijn naar pure, natuurlijke producten.",
    "product-2-details": "Verkrijgbaar in 500ml flessen",

    "product-3-name": "Gearomatiseerde Olijfolie - Knoflook",
    "product-3-desc":
      "Onze klassieke olijfolie geïnfuseerd met verse knoflook, voor een heerlijke smaak aan je favoriete gerechten.",
    "product-3-details": "Verkrijgbaar in 250ml flessen",

    "product-4-name": "Gearomatiseerde Olijfolie - Rozemarijn",
    "product-4-desc":
      "Extra vierge olijfolie geïnfuseerd met verse rozemarijn voor een geurig en kruidig smaakprofiel.",
    "product-4-details": "Verkrijgbaar in 250ml flessen",

    "product-5-name": "Premium Blend Olijfolie",
    "product-5-desc":
      "Een zorgvuldig samengestelde blend van olijfvariëteiten, met een uitgebalanceerd smaakprofiel dat perfect is voor dagelijks koken.",
    "product-5-details": "Verkrijgbaar in 1L flessen",

    "product-6-name": "Vroege Oogst Olijfolie",
    "product-6-desc":
      "Geoogst van jonge groene olijven voor een intensere smaak met peperige tonen en een hoger antioxidantengehalte.",
    "product-6-details": "Verkrijgbaar in 500ml flessen, beperkte productie",

    // Branches Page
    "branches-page-title": "Onze Filialen",
    "branches-page-subtitle": "Bezoek ons op een van onze locaties in Libanon",
    "get-in-touch": "Neem Contact Op",
    "cannot-find":
      "Kun je geen filiaal in de buurt vinden? Neem contact op met ons klantenserviceteam voor informatie over onze producten, groothandelsverzoeken of om een bestelling te plaatsen voor levering.",
    "general-inquiries": "Algemene Vragen",
    "customer-service": "Klantenservice",
    hours: "Openingstijden",
    "view-on-map": "Bekijk op Kaart",
    phone: "Telefoon",
    email: "E-mail",

    // Branch Names
    "branch-1-name": "Beiroet Flagship Store",
    "branch-2-name": "Tripoli Filiaal",
    "branch-3-name": "Byblos Outlet",
    "branch-4-name": "Baalbek Winkel",
    "lebanon-branch": "Libanon Vestiging",
    "belgium-branch": "België Vestiging",
    "get-directions": "Routebeschrijving",

    // Team Section
    "our-team": "Ons Team",
    "team-subtitle":
      "Maak kennis met de toegewijde professionals achter ORSA GROUP",
    "founder-ceo": "Oprichter & CEO",
    "operations-manager": "Operationeel Manager",
    "lebanon-branch-manager": "Libanon Vestigingsmanager",
    "customer-relations": "Klantenrelaties",
    "john-doe-desc":
      "Met meer dan 15 jaar ervaring in het importeren van Libanese producten, richtte John ORSA GROUP op om authentieke Libanese smaken met Europa te delen.",
    "sarah-smith-desc":
      "Sarah houdt toezicht op alle activiteiten tussen onze vestigingen in België en Libanon, en zorgt voor een soepele logistiek en productkwaliteit.",
    "ali-hassan-desc":
      "Ali werkt rechtstreeks samen met Libanese boeren en producenten om de hoogste kwaliteit producten voor onze klanten te verkrijgen.",
    "marie-dubois-desc":
      "Marie zorgt ervoor dat al onze klanten uitzonderlijke service ontvangen en helpt bij productselectie en aanbevelingen.",

    // Footer
    "footer-description":
      "Uw eerste keuze voor Libanese olijfolie en authentieke Libanese producten.",
    "rights-reserved": "Alle rechten voorbehouden.",

    // Miscellaneous
    "toggle-language": "Taal",
    "select-language": "Selecteer Taal",
    english: "English",
    arabic: "العربية",
    dutch: "Nederlands",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const direction = language === "ar" ? "rtl" : "ltr";

  const toggleLanguage = () => {
    setLanguageState((prevLang) => {
      if (prevLang === "en") return "ar";
      if (prevLang === "ar") return "nl";
      return "en";
    });
  };

  // Implement the setLanguage function to directly set language state
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string) => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, direction, toggleLanguage, setLanguage, t }}
    >
      <div dir={direction}>{children}</div>
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
