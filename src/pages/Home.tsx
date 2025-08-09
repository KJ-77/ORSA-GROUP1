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
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ultra-enhanced header animation with 3D effects
    if (headerRef.current) {
      const heroTitle = headerRef.current.querySelector(".hero-title");
      const heroSubtitle = headerRef.current.querySelector(".hero-subtitle");
      const heroButton = headerRef.current.querySelector(".hero-button");
      const heroOverlay = headerRef.current.querySelector(".hero-overlay");
      const floatingElements = headerRef.current.querySelectorAll(".floating-element");

      // Create complex timeline for hero section
      const heroTl = gsap.timeline();
      
      if (heroOverlay) {
        heroTl.fromTo(heroOverlay, 
          { opacity: 0, scale: 1.2 }, 
          { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
        );
      }
      
      if (heroTitle) {
        heroTl.fromTo(heroTitle, 
          { opacity: 0, y: 100, rotationX: 45, scale: 0.5 }, 
          { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1.8, ease: "power4.out" }, 
          "-=1"
        );
      }
      
      if (heroSubtitle) {
        heroTl.fromTo(heroSubtitle, 
          { opacity: 0, y: 60, rotationY: 25 }, 
          { opacity: 1, y: 0, rotationY: 0, duration: 1.2, ease: "power3.out" }, 
          "-=0.8"
        );
      }
      
      if (heroButton) {
        heroTl.fromTo(heroButton, 
          { opacity: 0, y: 50, scale: 0.8, rotationZ: 10 }, 
          { opacity: 1, y: 0, scale: 1, rotationZ: 0, duration: 1, ease: "back.out(2)" }, 
          "-=0.6"
        );
      }

      // Animate floating elements
      if (floatingElements) {
        gsap.fromTo(floatingElements, 
          { opacity: 0, scale: 0, rotation: 180 }, 
          { opacity: 1, scale: 1, rotation: 0, stagger: 0.2, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1 }
        );
      }

      // Continuous floating animations
      if (heroTitle) {
        gsap.to(heroTitle, {
          y: -15,
          rotationX: 2,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    }

    // Enhanced about section with morphing effects
    if (aboutRef.current) {
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 75%",
        onEnter: () => {
          const aboutTitle = aboutRef.current?.querySelector(".about-title");
          const aboutText = aboutRef.current?.querySelectorAll(".about-text");
          const aboutIcon = aboutRef.current?.querySelector(".about-icon");
          const morphingBg = aboutRef.current?.querySelector(".morphing-bg");

          const aboutTl = gsap.timeline();
          
          if (morphingBg) {
            aboutTl.fromTo(morphingBg, 
              { opacity: 0, scale: 0, borderRadius: "50%" }, 
              { opacity: 1, scale: 1, borderRadius: "20px", duration: 2, ease: "power3.out" }
            );
          }
          
          if (aboutIcon) {
            aboutTl.fromTo(aboutIcon, 
              { opacity: 0, scale: 0, rotation: -360, y: -50 }, 
              { opacity: 1, scale: 1, rotation: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" }, 
              "-=1.5"
            );
          }
          
          if (aboutTitle) {
            aboutTl.fromTo(aboutTitle, 
              { opacity: 0, y: 80, skewY: 5 }, 
              { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "power4.out" }, 
              "-=1"
            );
          }
          
          if (aboutText) {
            aboutTl.fromTo(aboutText, 
              { opacity: 0, y: 40, rotationX: 15 }, 
              { opacity: 1, y: 0, rotationX: 0, stagger: 0.3, duration: 1, ease: "power3.out" }, 
              "-=0.8"
            );
          }
        },
      });
    }

    // Advanced products section with 3D card effects
    if (productsRef.current) {
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: "top 70%",
        onEnter: () => {
          const productCards = productsRef.current?.querySelectorAll(".product-card");
          const productsTitle = productsRef.current?.querySelector(".products-title");

          if (productsTitle) {
            gsap.fromTo(productsTitle, 
              { opacity: 0, y: 60, scale: 0.8 }, 
              { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power4.out" }
            );
          }

          if (productCards && productCards.length > 0) {
            gsap.fromTo(productCards, 
              { opacity: 0, y: 100, scale: 0.7, rotationY: 45, z: -200 }, 
              { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                rotationY: 0,
                z: 0,
                stagger: 0.25, 
                duration: 1.5, 
                ease: "power4.out" 
              }
            );

            // Advanced hover animations with 3D transforms
            productCards.forEach((card) => {
              card.addEventListener("mouseenter", () => {
                gsap.to(card, { 
                  y: -25, 
                  scale: 1.08, 
                  rotationY: 8,
                  rotationX: 5,
                  z: 50,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)",
                  duration: 0.6, 
                  ease: "power3.out" 
                });
                
                const cardImage = card.querySelector(".card-image");
                const cardContent = card.querySelector(".card-content");
                
                if (cardImage) {
                  gsap.to(cardImage, { 
                    scale: 1.15, 
                    rotationZ: 2,
                    duration: 0.6, 
                    ease: "power3.out" 
                  });
                }
                
                if (cardContent) {
                  gsap.to(cardContent, { 
                    y: -5, 
                    duration: 0.6, 
                    ease: "power3.out" 
                  });
                }
              });
              
              card.addEventListener("mouseleave", () => {
                gsap.to(card, { 
                  y: 0, 
                  scale: 1, 
                  rotationY: 0,
                  rotationX: 0,
                  z: 0,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  duration: 0.6, 
                  ease: "power3.out" 
                });
                
                const cardImage = card.querySelector(".card-image");
                const cardContent = card.querySelector(".card-content");
                
                if (cardImage) {
                  gsap.to(cardImage, { 
                    scale: 1, 
                    rotationZ: 0,
                    duration: 0.6, 
                    ease: "power3.out" 
                  });
                }
                
                if (cardContent) {
                  gsap.to(cardContent, { 
                    y: 0, 
                    duration: 0.6, 
                    ease: "power3.out" 
                  });
                }
              });
            });
          }
        },
      });
    }

    // Stats section with advanced counter animations
    if (statsRef.current) {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => {
          const statItems = statsRef.current?.querySelectorAll(".stat-item");
          
          if (statItems && statItems.length > 0) {
            gsap.fromTo(statItems, 
              { opacity: 0, y: 60, scale: 0.7, rotationY: 25 }, 
              { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                rotationY: 0,
                stagger: 0.2, 
                duration: 1.2, 
                ease: "elastic.out(1, 0.5)" 
              }
            );

            // Advanced number counting with morphing effects
            statItems.forEach((item, index) => {
              const number = item.querySelector(".stat-number");
              if (number) {
                const finalValues = [50, 1000, 25, 100];
                const finalValue = finalValues[index] || 0;
                
                gsap.fromTo(number, 
                  { textContent: 0, scale: 0.5, rotationX: 90 }, 
                  { 
                    textContent: finalValue,
                    scale: 1,
                    rotationX: 0,
                    duration: 2.5,
                    ease: "power3.out",
                    snap: { textContent: 1 },
                    delay: 0.8 + index * 0.2
                  }
                );
              }
            });
          }
        },
      });
    }

    // Features section with glassmorphism effects
    if (featuresRef.current) {
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top 75%",
        onEnter: () => {
          const featureCards = featuresRef.current?.querySelectorAll(".feature-card");
          
          if (featureCards && featureCards.length > 0) {
            gsap.fromTo(featureCards, 
              { opacity: 0, y: 80, scale: 0.8, rotationX: 30 }, 
              { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                rotationX: 0,
                stagger: 0.15, 
                duration: 1.3, 
                ease: "power4.out" 
              }
            );
          }
        },
      });
    }

    // Testimonials with advanced card animations
    if (testimonialsRef.current) {
      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: "top 75%",
        onEnter: () => {
          const testimonialCards = testimonialsRef.current?.querySelectorAll(".testimonial-card");
          
          if (testimonialCards && testimonialCards.length > 0) {
            gsap.fromTo(testimonialCards, 
              { opacity: 0, x: -100, rotationY: -25, scale: 0.9 }, 
              { 
                opacity: 1, 
                x: 0, 
                rotationY: 0,
                scale: 1,
                stagger: 0.2, 
                duration: 1.4, 
                ease: "power4.out" 
              }
            );
          }
        },
      });
    }

    // Advanced parallax effects
    gsap.to(".parallax-element", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-element",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Morphing background elements
    gsap.to(".morphing-shape", {
      rotation: 360,
      scale: 1.2,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

  }, []);

  return (
    <div className="w-full overflow-hidden relative">
      {/* Ultra-Enhanced Hero Section with 3D Elements */}
      <div
        ref={headerRef}
        className="min-h-screen flex items-center justify-center text-center bg-cover bg-center relative text-white overflow-hidden" style={{ backgroundImage: `url(\"/new-background.jpg\")` }}
      >
        {/* Advanced Background Effects */}
        <div className="hero-overlay absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60"></div>
        
        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-element absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="floating-element absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="floating-element absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-lg animate-bounce"></div>
          
          {/* Morphing Shapes */}
          <div className="morphing-shape absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-lg transform rotate-45"></div>
          <div className="morphing-shape absolute bottom-1/4 left-1/3 w-16 h-16 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full"></div>
        </div>

        {/* Glassmorphism Container */}
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="hero-content backdrop-blur-sm bg-white/5 rounded-3xl p-12 border border-white/10">
            {/* 3D Icon */}
            <div className="mb-8 perspective-1000">
              <div className="inline-block p-6 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full backdrop-blur-md border border-white/20 transform-gpu">
                <svg className="w-20 h-20 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
                </svg>
              </div>
            </div>
            
            <h1 className="hero-title text-5xl md:text-7xl mb-8 uppercase tracking-wider font-black bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent transform-gpu">
              {t("hero-title")}
            </h1>
            
            <p className="hero-subtitle text-lg md:text-2xl mb-12 max-w-[800px] mx-auto leading-relaxed text-gray-200">
              {t("hero-subtitle")}
            </p>
            
            <Link
              to="/oil"
              className="hero-button inline-flex items-center bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white py-5 px-10 rounded-full font-bold text-xl transition-all duration-700 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-110 hover:-translate-y-2 group"
            >
              {t("our-oil")}
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Ultra-Enhanced About Section with Morphing Background */}
      <section ref={aboutRef} className="py-40 relative overflow-hidden">
        {/* Morphing Background */}
        <div className="morphing-bg absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-cyan-50"></div>
        <div className="parallax-element absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* 3D Icon with Glassmorphism */}
            <div className="about-icon mb-12 perspective-1000">
              <div className="inline-block p-8 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-full backdrop-blur-md border border-emerald-200/30 shadow-2xl transform-gpu">
                <svg className="w-16 h-16 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            
            <h2 className="about-title text-4xl md:text-6xl text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text mb-8 font-black">
              {t("about-us")}
            </h2>
            
            <div className="space-y-4">
              <p className="about-text text-base md:text-lg leading-relaxed text-gray-700 backdrop-blur-sm bg-white/30 rounded-2xl p-4 md:p-8 border border-white/20">
                {t("about-desc-1")}
              </p>
              <p className="about-text text-base md:text-lg leading-relaxed text-gray-700 backdrop-blur-sm bg-white/30 rounded-2xl p-4 md:p-8 border border-white/20">
                {t("about-desc-2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Enhanced Features Section with Glassmorphism */}
      <section ref={featuresRef} className="py-32 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="text-6xl text-center text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text mb-20 font-black">
            Why Choose ORSA
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="feature-card backdrop-blur-md bg-white/10 rounded-3xl p-10 border border-white/20 text-center text-white transform-gpu">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6">Premium Quality</h3>
              <p className="text-gray-300 leading-relaxed">Hand-picked olives from the finest Mediterranean groves, processed with traditional Lebanese methods.</p>
            </div>
            
            <div className="feature-card backdrop-blur-md bg-white/10 rounded-3xl p-10 border border-white/20 text-center text-white transform-gpu">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6">Certified Organic</h3>
              <p className="text-gray-300 leading-relaxed">Sustainably produced with organic farming practices that preserve the environment and enhance flavor.</p>
            </div>
            
            <div className="feature-card backdrop-blur-md bg-white/10 rounded-3xl p-10 border border-white/20 text-center text-white transform-gpu">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6">Family Heritage</h3>
              <p className="text-gray-300 leading-relaxed">Three generations of expertise in crafting the finest Lebanese olive oil with love and tradition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Enhanced Stats Section */}
      <section ref={statsRef} className="py-32 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gray-900 opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div className="stat-item p-8 backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl transform-gpu">
              <h3 className="text-5xl font-black mb-4 text-emerald-200"><span className="stat-number">50</span>+</h3>
              <p className="text-xl text-gray-200">Years of Experience</p>
            </div>
            <div className="stat-item p-8 backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl transform-gpu">
              <h3 className="text-5xl font-black mb-4 text-emerald-200"><span className="stat-number">1000</span>+</h3>
              <p className="text-xl text-gray-200">Happy Customers</p>
            </div>
            <div className="stat-item p-8 backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl transform-gpu">
              <h3 className="text-5xl font-black mb-4 text-emerald-200"><span className="stat-number">25</span>+</h3>
              <p className="text-xl text-gray-200">Awards Won</p>
            </div>
            <div className="stat-item p-8 backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl transform-gpu">
              <h3 className="text-5xl font-black mb-4 text-emerald-200"><span className="stat-number">100</span>%</h3>
              <p className="text-xl text-gray-200">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Enhanced Products Section */}
      <section ref={productsRef} className="py-40 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="parallax-element absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="products-title text-6xl text-center text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text mb-20 font-black">
            Our Premium Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Product Card 1 */}
            <div className="product-card backdrop-blur-md bg-white/90 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-4xl group relative transform-gpu perspective-1000 border border-white/20">
              <div className="card-image relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src="/oil1.jpg"
                  alt="Extra Virgin Olive Oil"
                  className="w-full h-72 object-cover transition-transform duration-1000 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center border border-white/30">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-sm"></div>
              </div>
              <div className="card-content p-8 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-3xl opacity-50"></div>
                <h3 className="text-3xl mb-4 text-gray-800 font-black group-hover:text-emerald-700 transition-colors duration-500">Extra Virgin Olive Oil</h3>
                <p className="mb-6 text-gray-600 leading-relaxed text-lg line-clamp-3">Our finest oil, hand-picked and cold-pressed for exceptional flavor and health benefits.</p>
                <Link
                  to="/oil/1"
                  className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-full font-bold transition-all duration-500 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl transform hover:scale-105"
                >
                  View Details
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
            
            {/* Product Card 2 */}
            <div className="product-card backdrop-blur-md bg-white/90 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-4xl group relative transform-gpu perspective-1000 border border-white/20">
              <div className="card-image relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src="/oil2.jpg"
                  alt="Organic Olive Oil"
                  className="w-full h-72 object-cover transition-transform duration-1000 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center border border-white/30">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-sm"></div>
              </div>
              <div className="card-content p-8 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-3xl opacity-50"></div>
                <h3 className="text-3xl mb-4 text-gray-800 font-black group-hover:text-emerald-700 transition-colors duration-500">Organic Olive Oil</h3>
                <p className="mb-6 text-gray-600 leading-relaxed text-lg line-clamp-3">Sustainably produced, this organic oil offers a balanced flavor and rich nutritional value.</p>
                <Link
                  to="/oil/2"
                  className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-full font-bold transition-all duration-500 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl transform hover:scale-105"
                >
                  View Details
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
            
            {/* Product Card 3 */}
            <div className="product-card backdrop-blur-md bg-white/90 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-4xl group relative transform-gpu perspective-1000 border border-white/20">
              <div className="card-image relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src="/oil3.jpg"
                  alt="Garlic Infused Olive Oil"
                  className="w-full h-72 object-cover transition-transform duration-1000 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center border border-white/30">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-sm"></div>
              </div>
              <div className="card-content p-8 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-3xl opacity-50"></div>
                <h3 className="text-3xl mb-4 text-gray-800 font-black group-hover:text-emerald-700 transition-colors duration-500">Garlic Infused Olive Oil</h3>
                <p className="mb-6 text-gray-600 leading-relaxed text-lg line-clamp-3">Aromatic and versatile, perfect for adding depth to your culinary creations.</p>
                <Link
                  to="/oil/3"
                  className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-full font-bold transition-all duration-500 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl transform hover:scale-105"
                >
                  View Details
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Enhanced Testimonials Section */}
      <section ref={testimonialsRef} className="py-40 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="text-6xl text-center text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text mb-20 font-black">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="testimonial-card backdrop-blur-md bg-white/10 rounded-3xl p-10 border border-white/20 text-white transform-gpu">
              <div className="flex items-center mb-6">
                <img src="/pic72.jpg" alt="Customer 1" className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-emerald-400 shadow-lg"/>
                <div>
                  <p className="text-xl font-bold">Sarah L.</p>
                  <div className="flex text-yellow-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                  </div>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-gray-300">"The best olive oil I've ever tasted! The flavor is so rich and authentic. I use it for everything!"</p>
            </div>
            
            <div className="testimonial-card backdrop-blur-md bg-white/10 rounded-3xl p-10 border border-white/20 text-white transform-gpu">
              <div className="flex items-center mb-6">
                <img src="/pic74.jpg" alt="Customer 2" className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-emerald-400 shadow-lg"/>
                <div>
                  <p className="text-xl font-bold">David M.</p>
                  <div className="flex text-yellow-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                  </div>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-gray-300">"The organic olive oil is fantastic! I appreciate the commitment to sustainability without compromising on taste."</p>
            </div>
            
            <div className="testimonial-card backdrop-blur-md bg-white/10 rounded-3xl p-10 border border-white/20 text-white transform-gpu">
              <div className="flex items-center mb-6">
                <img src="/pic75.jpg" alt="Customer 3" className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-emerald-400 shadow-lg"/>
                <div>
                  <p className="text-xl font-bold">Emily R.</p>
                  <div className="flex text-yellow-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.729c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/></svg>
                  </div>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-gray-300">"The garlic infused oil is a game-changer! It adds so much flavor to my dishes without any extra effort."</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

