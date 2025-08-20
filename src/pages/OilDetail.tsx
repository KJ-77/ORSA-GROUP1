import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
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
const defaultProductImages = [
  "/oil1.jpg",
  "/oil2.jpg",
  "/oil3.jpg",
  "/oil4.jpg",
  "/oil5.jpg",
  "/oil6.jpg",
];

const OilDetail = () => {
  const { } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [images, setImages] = useState<ApiImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const nutritionRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  // Function to fetch product details
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://rlg7ahwue7.execute-api.eu-west-3.amazonaws.com/products/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiProduct = await response.json();
      setProduct(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch product images
  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://rlg7ahwue7.execute-api.eu-west-3.amazonaws.com/products/${id}/images`
      );

      if (!response.ok) {
        console.warn(`Failed to fetch images for product ${id}`);
        return;
      }

      const data: ApiImage[] = await response.json();
      setImages(data);
    } catch (error) {
      console.warn(`Error fetching images for product ${id}:`, error);
    }
  };

  // Function to add product to cart
  const addToCart = () => {
    if (!user) {
      alert("Please log in to add items to your cart");
      navigate("/auth");
      return;
    }

    if (!product) return;

    const existingCart = localStorage.getItem("cart");
    const cartItems: number[] = existingCart ? JSON.parse(existingCart) : [];

    if (!cartItems.includes(product.id)) {
      const updatedCartItems = [...cartItems, product.id];
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      alert("Product added to cart!");
    } else {
      alert("Product is already in cart!");
    }
  };

  // Get display images (API images or defaults)
  const getDisplayImages = () => {
    if (images.length > 0) {
      return images.map(img => img.image_url);
    }
    return defaultProductImages;
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchImages();
    }
  }, [id]);

  useEffect(() => {
    if (!loading && product) {
      // Ultra-enhanced header animation
      if (headerRef.current) {
        const breadcrumb = headerRef.current.querySelector(".breadcrumb");
        const floatingShapes = headerRef.current.querySelectorAll(".floating-shape");
        
        if (breadcrumb) {
          gsap.fromTo(breadcrumb, 
            { opacity: 0, y: -30, scale: 0.9 }, 
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
          );
        }
        
        if (floatingShapes) {
          gsap.fromTo(floatingShapes, 
            { opacity: 0, scale: 0, rotation: 180 }, 
            { opacity: 1, scale: 1, rotation: 0, stagger: 0.2, duration: 2, ease: "elastic.out(1, 0.3)" }
          );
        }
      }

      // Ultra-enhanced product section animation
      if (productRef.current) {
        ScrollTrigger.create({
          trigger: productRef.current,
          start: "top 80%",
          onEnter: () => {
            const imageGallery = productRef.current?.querySelector(".image-gallery");
            const productInfo = productRef.current?.querySelector(".product-info");
            
            if (imageGallery) {
              gsap.fromTo(imageGallery, 
                { opacity: 0, x: -100, scale: 0.9 }, 
                { opacity: 1, x: 0, scale: 1, duration: 1.5, ease: "power4.out" }
              );
            }
            
            if (productInfo) {
              gsap.set(productInfo, { opacity: 0, x: 100, scale: 0.9 });
              gsap.to(productInfo, { opacity: 1, x: 0, scale: 1, duration: 1.5, ease: "power4.out", delay: 0.5 });
            }
          },
        });
      }

      // Enhanced details section animation
      if (detailsRef.current) {
        ScrollTrigger.create({
          trigger: detailsRef.current,
          start: "top 80%",
          onEnter: () => {
            const detailsContent = detailsRef.current?.querySelector(".details-content");
            
            if (detailsContent) {
              gsap.fromTo(detailsContent, 
                { opacity: 0, y: 60, scale: 0.95 }, 
                { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
              );
            }
          },
        });
      }

      // Enhanced nutrition section animation
      if (nutritionRef.current) {
        ScrollTrigger.create({
          trigger: nutritionRef.current,
          start: "top 80%",
          onEnter: () => {
            const nutritionTable = nutritionRef.current?.querySelector(".nutrition-table");
            
            if (nutritionTable) {
              gsap.fromTo(nutritionTable, 
                { opacity: 0, y: 40, rotationX: 15 }, 
                { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: "power3.out" }
              );
            }
          },
        });
      }

      // Enhanced related products animation
      if (relatedRef.current) {
        ScrollTrigger.create({
          trigger: relatedRef.current,
          start: "top 80%",
          onEnter: () => {
            const relatedCards = relatedRef.current?.querySelectorAll(".related-card");
            
            if (relatedCards && relatedCards.length > 0) {
              gsap.fromTo(relatedCards, 
                { opacity: 0, y: 60, scale: 0.9, rotationY: 15 }, 
                { opacity: 1, y: 0, scale: 1, rotationY: 0, stagger: 0.2, duration: 1, ease: "power3.out" }
              );
            }
          },
        });
      }
    }
  }, [loading, product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-emerald-200 border-t-emerald-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-8 text-2xl text-white font-bold">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="backdrop-blur-md bg-red-50/20 border-2 border-red-200/30 rounded-3xl p-16 max-w-lg mx-auto shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-red-200 mb-8 text-xl font-semibold">{error || "Product not found"}</p>
            <Link
              to="/oil"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-8 rounded-full font-bold text-lg transition-all duration-500 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl transform hover:scale-105"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayImages = getDisplayImages();

  return (
    <div className="w-full overflow-hidden">
      {/* Ultra-Enhanced Header with New Background */}
      <div ref={headerRef} className="py-20 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(\"/new-background.jpg\")` }}>
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
        
        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-xl"></div>
          <div className="floating-shape absolute bottom-20 right-32 w-48 h-48 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl"></div>
          <div className="floating-shape absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-lg transform rotate-45 blur-lg"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <nav className="breadcrumb backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-4 text-white">
              <Link to="/" className="hover:text-emerald-400 transition-colors duration-300 font-semibold">
                Home
              </Link>
              <span className="text-emerald-400">→</span>
              <Link to="/oil" className="hover:text-emerald-400 transition-colors duration-300 font-semibold">
                Our Products
              </Link>
              <span className="text-emerald-400">→</span>
              <span className="text-emerald-300 font-bold">{product.name}</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Ultra-Enhanced Product Section */}
      <section ref={productRef} className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Ultra-Enhanced Image Gallery */}
            <div className="image-gallery">
              {/* Main Image */}
              <div className="mb-8 relative group">
                <div className="backdrop-blur-md bg-white/80 rounded-3xl p-6 shadow-2xl border border-white/20">
                  <img
                    src={displayImages[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-[500px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = defaultProductImages[0];
                    }}
                  />
                  
                  {/* Quality Badge */}
                  <div className="absolute top-10 left-10 backdrop-blur-md bg-emerald-500/90 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                    Premium Quality
                  </div>
                  
                  {/* 3D Floating Elements */}
                  <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-lg animate-pulse"></div>
                  <div className="absolute bottom-10 left-10 w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-md animate-bounce"></div>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {displayImages.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                      selectedImageIndex === index 
                        ? "ring-4 ring-emerald-500 shadow-xl" 
                        : "hover:shadow-lg"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-24 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = defaultProductImages[index % defaultProductImages.length];
                      }}
                    />
                    <div className={`absolute inset-0 bg-emerald-500/20 transition-opacity duration-300 ${
                      selectedImageIndex === index ? "opacity-100" : "opacity-0"
                    }`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ultra-Enhanced Product Info */}
            <div className="product-info">
              <div className="backdrop-blur-md bg-white/80 rounded-3xl p-10 shadow-2xl border border-white/20">
                {/* Premium Badge */}
                <div className="inline-block mb-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Premium Quality
                  </div>
                </div>
                
                <h1 className="text-5xl mb-8 text-gray-800 font-black leading-tight">
                  {product.name}
                </h1>
                
                <p className="mb-8 text-gray-600 leading-relaxed text-xl">
                  {product.description}
                </p>
                
                <p className="mb-10 text-gray-500 italic text-lg">
                  Available in 250ml bottles
                </p>
                
                {/* Enhanced Action Buttons */}
                <div className="flex gap-6 mb-10">
                  <button
                    onClick={addToCart}
                    disabled={product.quantity === 0}
                    className={`flex-1 py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                      product.quantity > 0
                        ? "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 hover:shadow-xl"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <svg className="w-6 h-6 inline mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
                    </svg>
                    Add to Cart
                  </button>
                </div>
                
                {/* Stock Status */}
                <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-black text-emerald-700">
                        €{product.price}
                      </p>
                      <p className="text-emerald-600 font-semibold">
                        {product.quantity > 0
                          ? `${product.quantity} in stock`
                          : "Out of stock"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`w-4 h-4 rounded-full ${product.quantity > 0 ? "bg-emerald-500" : "bg-red-500"} shadow-lg`}></div>
                      <p className="text-sm text-gray-500 mt-2 font-medium">
                        {product.quantity > 0 ? "Available" : "Sold out"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Enhanced Product Details Section */}
      <section ref={detailsRef} className="py-32 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(\"/new-background.jpg\")` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="text-6xl text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text mb-16 text-center font-black">
            Product Details
          </h2>
          
          <div className="details-content backdrop-blur-md bg-white/10 rounded-3xl p-12 border border-white/20 text-white">
            <p className="text-2xl leading-relaxed mb-8">
              Our Garlic Infused Olive Oil combines our premium extra virgin olive oil with the rich, aromatic flavor of fresh garlic. This infusion creates a versatile cooking oil that adds depth and complexity to any dish without the need to chop or mince garlic.
            </p>
            <p className="text-2xl leading-relaxed">
              We use a delicate infusion process that preserves the integrity of both the olive oil and the garlic flavor, resulting in a harmonious blend that elevates your culinary creations. Perfect for sautéing vegetables, drizzling over pasta, or using as a bread dipping oil, our Garlic Infused Olive Oil is a must-have for garlic lovers and home chefs alike.
            </p>
          </div>
        </div>
      </section>

      {/* Ultra-Enhanced Nutrition Facts Section */}
      <section ref={nutritionRef} className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="text-6xl text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text mb-16 text-center font-black">
            Nutrition Facts
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="nutrition-table backdrop-blur-md bg-white/90 rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="border-b-4 border-gray-800 pb-4 mb-8">
                <h3 className="text-3xl font-black text-gray-800">Nutrition Facts</h3>
                <p className="text-lg text-gray-600 font-semibold">Serving Size: 1 tbsp (15ml)</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-xl font-bold text-gray-800">Calories</span>
                  <span className="text-xl font-black text-gray-800">120</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-semibold text-gray-700">Total Fat</span>
                    <span className="text-lg font-bold text-gray-800">14g</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 pl-6">
                    <span className="text-gray-600">Saturated Fat</span>
                    <span className="text-gray-800 font-semibold">2g</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 pl-6">
                    <span className="text-gray-600">Monounsaturated Fat</span>
                    <span className="text-gray-800 font-semibold">10g</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 pl-6">
                    <span className="text-gray-600">Polyunsaturated Fat</span>
                    <span className="text-gray-800 font-semibold">2g</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-lg font-semibold text-gray-700">Cholesterol</span>
                  <span className="text-lg font-bold text-gray-800">0mg</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-lg font-semibold text-gray-700">Sodium</span>
                  <span className="text-lg font-bold text-gray-800">0mg</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-lg font-semibold text-gray-700">Total Carbohydrate</span>
                  <span className="text-lg font-bold text-gray-800">0g</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-lg font-semibold text-gray-700">Protein</span>
                  <span className="text-lg font-bold text-gray-800">0g</span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-lg font-semibold text-gray-700">Vitamin E</span>
                  <span className="text-lg font-bold text-emerald-600">18%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Enhanced Related Products Section */}
      <section ref={relatedRef} className="py-32 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(\"/new-background.jpg\")` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="text-6xl text-center text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text mb-20 font-black">
            You May Also Like
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: "Extra Virgin Olive Oil", image: "/oil1.jpg", link: "/oil/1" },
              { name: "Organic Olive Oil", image: "/oil2.jpg", link: "/oil/2" },
              { name: "Rosemary Infused Oil", image: "/oil4.jpg", link: "/oil/4" }
            ].map((relatedProduct, index) => (
              <div key={index} className="related-card backdrop-blur-md bg-white/10 rounded-3xl overflow-hidden border border-white/20 text-white transform-gpu">
                <div className="relative overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-full blur-sm animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-sm animate-bounce"></div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-6">{relatedProduct.name}</h3>
                  <Link
                    to={relatedProduct.link}
                    className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-full font-bold transition-all duration-500 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl transform hover:scale-105"
                  >
                    View Details
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OilDetail;

