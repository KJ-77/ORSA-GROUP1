import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Sample olive oil product data
const oilProducts = [
  {
    id: 1,
    name: "Extra Virgin Olive Oil",
    description:
      "Our premium extra virgin olive oil is cold-pressed from handpicked Lebanese olives, delivering an authentic taste of Lebanon's rich olive heritage.",
    image: "/oil1.jpg",
    details: "Available in 500ml and 750ml bottles",
  },
  {
    id: 2,
    name: "Organic Olive Oil",
    description:
      "Certified organic olive oil from our sustainable orchards in Lebanon, perfect for health-conscious consumers looking for pure, natural products.",
    image: "/oil2.jpg",
    details: "Available in 500ml bottles",
  },
  {
    id: 3,
    name: "Infused Olive Oil - Garlic",
    description:
      "Our classic olive oil infused with fresh garlic, adding a delicious flavor to your favorite dishes.",
    image: "/oil3.jpg",
    details: "Available in 250ml bottles",
  },
  {
    id: 4,
    name: "Infused Olive Oil - Rosemary",
    description:
      "Extra virgin olive oil infused with fresh rosemary for a fragrant and herbaceous flavor profile.",
    image: "/oil4.jpg",
    details: "Available in 250ml bottles",
  },
  {
    id: 5,
    name: "Premium Blend Olive Oil",
    description:
      "A carefully crafted blend of olive varieties, offering a balanced flavor profile perfect for everyday cooking.",
    image: "/oil5.jpg",
    details: "Available in 1L bottles",
  },
  {
    id: 6,
    name: "Early Harvest Olive Oil",
    description:
      "Harvested from young green olives for a more intense flavor with peppery notes and higher antioxidant content.",
    image: "/oil22.jpg",
    details: "Available in 500ml bottles, limited production",
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
              {t("our-oil")}
            </h1>
            <p className="text-xl max-w-[600px] mx-auto md:text-lg">
              Discover our selection of premium Lebanese olive oils
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
                  alt={product.name}
                  className="w-full h-[240px] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl mb-2">{product.name}</h3>
                  <p className="mb-4 text-gray-600">{product.description}</p>
                  <p className="mb-4 text-sm text-gray-500 italic">
                    {product.details}
                  </p>
                  <Link
                    to={`/oil/${product.id}`}
                    className="inline-block bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
                  >
                    Learn More
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
              Our Commitment to Quality
            </h2>
            <p className="mb-4">
              At ORSA GROUP, we're committed to delivering the highest quality
              olive oil. Our olives are hand-picked at the optimal time and
              cold-pressed within hours to ensure maximum freshness and
              nutritional value.
            </p>
            <p>
              We maintain strict quality control throughout our production
              process, from cultivation to bottling, ensuring that every bottle
              meets our exacting standards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Oil;
