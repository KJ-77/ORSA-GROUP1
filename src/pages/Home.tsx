import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { t } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      const heroContent = headerRef.current.querySelector(".hero-content");
      if (heroContent) {
        gsap.fromTo(
          heroContent,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 }
        );
      }
    }

    // About section animation
    if (aboutRef.current) {
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 80%",
        onEnter: () => {
          const aboutContent =
            aboutRef.current?.querySelector(".about-content");
          if (aboutContent) {
            gsap.fromTo(
              aboutContent,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1 }
            );
          }
        },
      });
    }

    // Products section animation
    if (productsRef.current) {
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: "top 80%",
        onEnter: () => {
          const productCards =
            productsRef.current?.querySelectorAll(".product-card");
          if (productCards && productCards.length > 0) {
            gsap.fromTo(
              productCards,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }
            );
          }
        },
      });
    }
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        ref={headerRef}
        className="h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat relative text-white"
        style={{ backgroundImage: "url('/INTROO.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="hero-content">
            <h1 className="text-5xl mb-4 uppercase tracking-wider md:text-4xl">
              {t("hero-title")}
            </h1>
            <p className="text-xl mb-8 max-w-[600px] mx-auto md:text-base">
              {t("hero-subtitle")}
            </p>
            <Link
              to="/oil"
              className="inline-block bg-[#4a8e3b] text-white py-3 px-6 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c] hover:-translate-y-0.5"
            >
              {t("our-oil")}
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section ref={aboutRef} className="py-24 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-[800px] mx-auto text-center about-content">
            <h2 className="text-4xl text-[#4a8e3b] mb-8 md:text-3xl">
              {t("about-us")}
            </h2>
            <p className="mb-6 text-lg leading-relaxed">{t("about-desc-1")}</p>
            <p className="mb-6 text-lg leading-relaxed">{t("about-desc-2")}</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section ref={productsRef} className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl text-[#4a8e3b] mb-12 text-center md:text-3xl">
            {t("featured-products")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product cards */}
            <div className="product-card bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2.5">
              <img
                src="/oil1.jpg"
                alt={t("extra-virgin")}
                className="w-full h-[200px] object-cover"
              />
              <h3 className="p-6 pb-2 text-xl text-[#333]">
                {t("extra-virgin")}
              </h3>
              <p className="px-6 pb-6 text-[#666]">{t("extra-virgin-desc")}</p>
              <Link
                to="/oil/1"
                className="mx-6 mb-6 inline-block bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
              >
                {t("learn-more")}
              </Link>
            </div>
            <div className="product-card bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2.5">
              <img
                src="/oil2.jpg"
                alt={t("organic-oil")}
                className="w-full h-[200px] object-cover"
              />
              <h3 className="p-6 pb-2 text-xl text-[#333]">
                {t("organic-oil")}
              </h3>
              <p className="px-6 pb-6 text-[#666]">{t("organic-oil-desc")}</p>
              <Link
                to="/oil/2"
                className="mx-6 mb-6 inline-block bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
              >
                {t("learn-more")}
              </Link>
            </div>
            <div className="product-card bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2.5">
              <img
                src="/oil3.jpg"
                alt={t("infused-oil")}
                className="w-full h-[200px] object-cover"
              />
              <h3 className="p-6 pb-2 text-xl text-[#333]">
                {t("infused-oil")}
              </h3>
              <p className="px-6 pb-6 text-[#666]">{t("infused-oil-desc")}</p>
              <Link
                to="/oil/3"
                className="mx-6 mb-6 inline-block bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
              >
                {t("learn-more")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
