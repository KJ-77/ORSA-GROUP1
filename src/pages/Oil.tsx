import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// API Product interface
interface ApiProduct {
  id: number;
  name: string;
  price: string;
  quantity: number;
  description: string;
  primaryImage?: string;
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
const defaultProductImages = [
  "/oil1.jpg",
  "/oil2.jpg",
  "/oil3.jpg",
  "/oil4.jpg",
  "/oil5.jpg",
  "/oil6.jpg",
  "/oil21.jpg",
  "/oil22.jpg",
  "/oil23.jpg",
];

const Oil = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Function to fetch images for a product
  const fetchProductImages = async (productId: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://rlg7ahwue7.execute-api.eu-west-3.amazonaws.com/products/${productId}/images`
      );

      if (!response.ok) {
        console.warn(`Failed to fetch images for product ${productId}`);
        return defaultProductImages[0]; // Return default image if API fails
      }

      const images: ApiImage[] = await response.json();

      // Find the primary image
      const primaryImage = images.find((img) => img.is_primary === 1);

      // Return the primary image URL or the first image if no primary is found
      if (primaryImage) {
        return primaryImage.image_url;
      } else if (images.length > 0) {
        return images[0].image_url;
      } else {
        return defaultProductImages[0]; // Return default if no images
      }
    } catch (error) {
      console.warn(`Error fetching images for product ${productId}:`, error);
      return defaultProductImages[0]; // Return default image if error occurs
    }
  };
  // Function to fetch products from API
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

      // Fetch images for each product
      const productsWithImages = await Promise.all(
        data.map(async (product) => {
          const primaryImage = await fetchProductImages(product.id);
          return {
            ...product,
            primaryImage,
          };
        })
      );

      setProducts(productsWithImages);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);
  // Function to get product image
  const getProductImage = (index: number) => {
    return defaultProductImages[index % defaultProductImages.length];
  }; // Function to add product to cart
  const addToCart = (productId: number) => {
    // Check if user is authenticated
    if (!user) {
      alert("Please log in to add items to your cart");
      navigate("/auth");
      return;
    }

    // Get existing cart items from localStorage
    const existingCart = localStorage.getItem("cart");
    const cartItems: number[] = existingCart ? JSON.parse(existingCart) : [];

    // Add the product ID to cart if not already present
    if (!cartItems.includes(productId)) {
      const updatedCartItems = [...cartItems, productId];
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      alert("Product added to cart!");
    } else {
      alert("Product is already in cart!");
    }
  };
  useEffect(() => {
    // Fetch products on component mount
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    // Only run animations after products are loaded
    if (!loading && products.length > 0) {
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
    }
  }, [loading, products]);
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
          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a8e3b]"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          )}
          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchProducts}
                  className="bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}{" "}
          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: ApiProduct, index: number) => (
                <div
                  key={product.id}
                  className="oil-product-card bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={product.primaryImage || getProductImage(index)}
                    alt={product.name}
                    className="w-full h-[240px] object-cover"
                    onError={(e) => {
                      // Fallback to default image if API image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = getProductImage(index);
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl mb-2">{product.name}</h3>
                    <p className="mb-4 text-gray-600">
                      {product.description}
                    </p>{" "}
                    <div className="mb-4">
                      <p className="text-lg font-semibold text-[#4a8e3b]">
                        ${product.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.quantity > 0
                          ? `${product.quantity} in stock`
                          : "Out of stock"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/oil/${product.id}`}
                        className="inline-block bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
                      >
                        {t("learn-more")}
                      </Link>
                      <button
                        onClick={() => addToCart(product.id)}
                        disabled={product.quantity === 0}
                        className={`py-2 px-4 rounded font-semibold transition-all duration-300 ${
                          product.quantity > 0
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* No Products State */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">
                No products available at the moment.
              </p>
              <button
                onClick={fetchProducts}
                className="bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
              >
                Refresh
              </button>
            </div>
          )}
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
