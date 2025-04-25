import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../styles/Home.css';

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
      gsap.fromTo(
        headerRef.current.querySelector('.hero-content'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }

    // About section animation
    if (aboutRef.current) {
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            aboutRef.current?.querySelector('.about-content'),
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 }
          );
        }
      });
    }

    // Products section animation
    if (productsRef.current) {
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            productsRef.current?.querySelectorAll('.product-card'),
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }
          );
        }
      });
    }
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div ref={headerRef} className="hero-section" style={{ backgroundImage: "url('/assets/images/home-bg.jpg')" }}>
        <div className="container">
          <div className="hero-content">
            <h1>ORSA GROUP</h1>
            <p>Premium Lebanese Olive Oil and Authentic Products</p>
            <Link to="/oil" className="btn">{t('our-oil')}</Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section ref={aboutRef} className="about-section">
        <div className="container">
          <div className="about-content">
            <h2>{t('about-us')}</h2>
            <p>
              ORSA GROUP is dedicated to bringing the finest Lebanese olive oil and authentic products
              to consumers worldwide. Our mission is to share Lebanon's rich culinary heritage through
              high-quality, sustainably sourced products.
            </p>
            <p>
              Founded with a passion for Lebanese traditions, ORSA GROUP ensures that every product
              meets the highest standards of quality and authenticity.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section ref={productsRef} className="products-section">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {/* Product cards will be mapped here */}
            <div className="product-card">
              <img src="/assets/images/oil1.jpg" alt="Olive Oil" />
              <h3>Extra Virgin Olive Oil</h3>
              <p>Premium quality Lebanese olive oil from our estates.</p>
              <Link to="/oil/1" className="btn">Learn More</Link>
            </div>
            <div className="product-card">
              <img src="/assets/images/oil2.jpg" alt="Olive Oil" />
              <h3>Organic Olive Oil</h3>
              <p>100% organic olive oil from traditional Lebanese orchards.</p>
              <Link to="/oil/2" className="btn">Learn More</Link>
            </div>
            <div className="product-card">
              <img src="/assets/images/oil3.jpg" alt="Olive Oil" />
              <h3>Infused Olive Oil</h3>
              <p>Olive oil infused with local Lebanese herbs and spices.</p>
              <Link to="/oil/3" className="btn">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;