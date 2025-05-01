import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Sample olive oil product data
const oilProducts = [
  {
    id: 1,
    nameKey: "product-1-name",
    descriptionKey: "product-1-desc",
    image: "/oil1.jpg",
    detailsKey: "product-1-details",
  },
  {
    id: 2,
    nameKey: "product-2-name",
    descriptionKey: "product-2-desc",
    image: "/oil2.jpg",
    detailsKey: "product-2-details",
  },
  {
    id: 3,
    nameKey: "product-3-name",
    descriptionKey: "product-3-desc",
    image: "/oil3.jpg",
    detailsKey: "product-3-details",
  },
  {
    id: 4,
    nameKey: "product-4-name",
    descriptionKey: "product-4-desc",
    image: "/oil4.jpg",
    detailsKey: "product-4-details",
  },
  {
    id: 5,
    nameKey: "product-5-name",
    descriptionKey: "product-5-desc",
    image: "/oil5.jpg",
    detailsKey: "product-5-details",
  },
  {
    id: 6,
    nameKey: "product-6-name",
    descriptionKey: "product-6-desc",
    image: "/oil6.jpg",
    detailsKey: "product-6-details",
  },
];

const Oil = () => {
  const { t } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      const pageHeaderContent = headerRef.current.querySelector(
        ".page-header-content"
      );
      if (pageHeaderContent) {
        gsap.fromTo(
          pageHeaderContent,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 }
        );
      }
    }

    // Products animation
    if (productsRef.current) {
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: "top 80%",
        onEnter: () => {
          const oilProductCards =
            productsRef.current?.querySelectorAll(".oil-product-card");
          if (oilProductCards && oilProductCards.length > 0) {
            gsap.fromTo(
              oilProductCards,
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
      {/* Page Header */}
      <div
        ref={headerRef}
        className="bg-[#4a8e3b] text-white py-24 pb-16 text-center"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="page-header-content">
            <h1 className="text-5xl mb-4 uppercase md:text-4xl">
              {t("oil-page-title")}
            </h1>
            <p className="text-xl max-w-[600px] mx-auto md:text-lg">
              {t("oil-page-subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Oil Products */}
      <section ref={productsRef} className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oilProducts.map((product) => (
              <div
                key={product.id}
                className="oil-product-card bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={product.image}
                  alt={t(product.nameKey)}
                  className="w-full h-[240px] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl mb-2">{t(product.nameKey)}</h3>
                  <p className="mb-4 text-gray-600">
                    {t(product.descriptionKey)}
                  </p>
                  <p className="mb-4 text-sm text-gray-500 italic">
                    {t(product.detailsKey)}
                  </p>
                  <Link
                    to={`/oil/${product.id}`}
                    className="inline-block bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
                  >
                    {t("learn-more")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl text-[#4a8e3b] mb-6 text-center">
              {t("quality-commitment")}
            </h2>
            <p className="mb-4">{t("quality-desc-1")}</p>
            <p>{t("quality-desc-2")}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Oil;
