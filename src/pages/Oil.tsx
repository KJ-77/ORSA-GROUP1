import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// API Product interface
interface ApiProduct {
  id: number;
  name: string;
  price: string;
  quantity: number;
  description: string;
}

// API Image interface
interface ApiImage {
  id: number;
  product_id: number;
  image_url: string;
  image_key: string;
  alt_text: string | null;
  display_order: number;
  is_primary: number;
  created_at: string;
  updated_at: string;
}

// Default product images
const defaultProductImages = ["INTROO.png"];

const Oil = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [productImages, setProductImages] = useState<
    Record<number, ApiImage[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectedFilter = "all"; // Static filter value since filtering UI is not implemented

  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const qualityRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (productId: number) => {
    console.log("Image clicked for product ID:", productId);
    console.log("Navigating to:", `/oil/${productId}`);
    navigate(`/oil/${productId}`);
  };

  // Function to fetch images for all products
  const fetchAllProductImages = useCallback(async (products: ApiProduct[]) => {
    const imagePromises = products.map(async (product) => {
      try {
        const response = await fetch(
          `https://rlg7ahwue7.execute-api.eu-west-3.amazonaws.com/products/${product.id}/images`
        );

        if (!response.ok) {
          console.warn(`Failed to fetch images for product ${product.id}`);
          return { productId: product.id, images: [] };
        }

        const images: ApiImage[] = await response.json();
        return { productId: product.id, images };
      } catch (error) {
        console.warn(`Error fetching images for product ${product.id}:`, error);
        return { productId: product.id, images: [] };
      }
    });

    const results = await Promise.all(imagePromises);
    const imagesMap: Record<number, ApiImage[]> = {};

    results.forEach(({ productId, images }) => {
      imagesMap[productId] = images;
    });

    setProductImages(imagesMap);
  }, []);

  // Function to fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://rlg7ahwue7.execute-api.eu-west-3.amazonaws.com/products"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiProduct[] = await response.json();
      setProducts(data);
      setError(null);

      // Fetch images for all products
      await fetchAllProductImages(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [fetchAllProductImages]);

  // Function to get display image for a product
  const getProductDisplayImage = (productId: number, index: number) => {
    const images = productImages[productId];
    if (images && images.length > 0) {
      // Find primary image or use first image
      const primaryImage = images.find((img) => img.is_primary === 1);
      return primaryImage ? primaryImage.image_url : images[0].image_url;
    }
    // Fallback to default images
    return defaultProductImages[index % defaultProductImages.length];
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    // Ultra-enhanced header animation
    if (headerRef.current) {
      const headerContent = headerRef.current.querySelector(
        ".page-header-content"
      );
      const floatingShapes =
        headerRef.current.querySelectorAll(".floating-shape");

      if (headerContent) {
        gsap.fromTo(
          headerContent,
          { opacity: 0, y: 80, scale: 0.9, rotationX: 15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.5,
            ease: "power4.out",
          }
        );
      }

      if (floatingShapes) {
        gsap.fromTo(
          floatingShapes,
          { opacity: 0, scale: 0, rotation: 180 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.2,
            duration: 2,
            ease: "elastic.out(1, 0.3)",
          }
        );
      }
    }

    // Enhanced products section animation
    if (productsRef.current) {
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: "top 80%",
        onEnter: () => {
          const productCards =
            productsRef.current?.querySelectorAll(".product-card");
          const filterButtons =
            productsRef.current?.querySelectorAll(".filter-button");

          if (filterButtons) {
            gsap.fromTo(
              filterButtons,
              { opacity: 0, y: -30, scale: 0.8 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
              }
            );
          }

          if (productCards && productCards.length > 0) {
            gsap.fromTo(
              productCards,
              { opacity: 0, y: 100, scale: 0.8, rotationY: 25 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                stagger: 0.15,
                duration: 1.2,
                ease: "power4.out",
              }
            );
          }
        },
      });
    }

    // Enhanced quality section animation
    if (qualityRef.current) {
      ScrollTrigger.create({
        trigger: qualityRef.current,
        start: "top 80%",
        onEnter: () => {
          const qualityFeatures =
            qualityRef.current?.querySelectorAll(".quality-feature");

          if (qualityFeatures) {
            gsap.fromTo(
              qualityFeatures,
              { opacity: 0, y: 60, scale: 0.9, rotationX: 20 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                stagger: 0.2,
                duration: 1.3,
                ease: "power4.out",
              }
            );
          }
        },
      });
    }

    // Advanced parallax effects
    gsap.to(".parallax-bg", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-bg",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Morphing shapes animation
    gsap.to(".morphing-shape", {
      rotation: 360,
      scale: 1.1,
      duration: 15,
      repeat: -1,
      ease: "none",
    });
  }, []);

  // Filter products based on selected filter
  const filteredProducts = products.filter((product) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "premium")
      return product.name.toLowerCase().includes("extra virgin");
    if (selectedFilter === "organic")
      return product.name.toLowerCase().includes("organic");
    if (selectedFilter === "infused")
      return (
        product.name.toLowerCase().includes("garlic") ||
        product.name.toLowerCase().includes("herb")
      );
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-emerald-200 border-t-emerald-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-8 text-3xl text-white font-bold">
            Loading our premium oils...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="backdrop-blur-md bg-red-50/20 border-2 border-red-200/30 rounded-3xl p-16 max-w-lg mx-auto shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-red-200 mb-8 text-xl font-semibold">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-8 rounded-full font-bold text-lg transition-all duration-500 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Ultra-Enhanced Header with New Background */}
      <div
        ref={headerRef}
        className="py-32 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url("/new-background.jpg")` }}
      >
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>

        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-xl"></div>
          <div className="floating-shape absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-lg"></div>
          <div className="floating-shape absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-lg transform rotate-45 blur-md"></div>
          <div className="floating-shape absolute bottom-1/4 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-md"></div>
        </div>

        {/* Glassmorphism Pattern Overlay */}
        <div className="absolute inset-0 bg-gray-900 opacity-10"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="page-header-content backdrop-blur-md bg-white/10 rounded-3xl p-16 border border-white/20">
            {/* 3D Icon */}
            <div className="mb-8 perspective-1000">
              <div className="inline-block p-8 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full backdrop-blur-md border border-white/20 shadow-2xl transform-gpu">
                <svg
                  className="w-20 h-20 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl text-center text-transparent bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text mb-8 font-black">
              {t("our-products")}
            </h1>
            <p className="text-lg md:text-2xl text-center text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Discover our premium collection of Lebanese olive oils, crafted
              with tradition and passion for exceptional flavor and quality.
            </p>
          </div>
        </div>
      </div>

      {/* Ultra-Enhanced Oil Products Section */}
      <section
        ref={productsRef}
        className="py-40 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          {/* Enhanced Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="product-card backdrop-blur-md bg-white/90 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-4xl group relative transform-gpu perspective-1000 border border-white/20"
              >
                {/* Premium Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <div className="backdrop-blur-md bg-emerald-500/90 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                    Premium Quality
                  </div>
                </div>

                {/* Enhanced Image Container */}
                <div
                  className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer"
                  onClick={() => handleImageClick(product.id)}
                >
                  <img
                    src={getProductDisplayImage(product.id, index)}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-1000 group-hover:scale-125 cursor-pointer"
                    onClick={() => handleImageClick(product.id)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        defaultProductImages[
                          index % defaultProductImages.length
                        ];
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  {/* Floating Heart Icon */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 pointer-events-none">
                    <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-sm pointer-events-none"></div>
                </div>

                {/* Enhanced Content */}
                <div className="p-8 relative">
                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-3xl opacity-50"></div>

                  <h3 className="text-3xl mb-4 text-gray-800 font-black group-hover:text-emerald-700 transition-colors duration-500">
                    {product.name}
                  </h3>

                  <p className="mb-6 text-gray-600 leading-relaxed text-lg line-clamp-3">
                    {product.description}
                  </p>

                  {/* Price and Stock */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-3xl font-black text-emerald-600">
                      €{product.price}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        product.quantity > 0
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.quantity > 0
                        ? `${product.quantity} in stock`
                        : "Out of stock"}
                    </div>
                  </div>

                  {/* Enhanced Button */}
                  <Link
                    to={`/oil/${product.id}`}
                    className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-8 rounded-full font-bold text-lg transition-all duration-500 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 group/btn"
                  >
                    View Details
                    <span className="ml-3 transition-transform duration-300 group-hover/btn:translate-x-2">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Enhanced Quality Section */}
      <section
        ref={qualityRef}
        className="py-32 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gray-900 opacity-5"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl text-center text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text mb-20 font-black">
              Our Quality Commitment
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="quality-feature backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 text-center text-white transform-gpu">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Certified Quality</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  International quality standards and certifications
                </p>
              </div>

              <div className="quality-feature backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 text-center text-white transform-gpu">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Premium Grade</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Only the finest olives make it to our bottles
                </p>
              </div>

              <div className="quality-feature backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 text-center text-white transform-gpu">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Sustainable</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Environmentally responsible farming practices
                </p>
              </div>

              <div className="quality-feature backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 text-center text-white transform-gpu">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Family Made</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Three generations of Lebanese tradition
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Oil;
