import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../styles/Oil.css';

// Sample olive oil product data
const oilProducts = [
  {
    id: 1,
    name: 'Extra Virgin Olive Oil',
    description: 'Our premium extra virgin olive oil is cold-pressed from handpicked Lebanese olives, delivering an authentic taste of Lebanon\'s rich olive heritage.',
    image: '/assets/images/oil1.jpg',
    details: 'Available in 500ml and 750ml bottles'
  },
  {
    id: 2,
    name: 'Organic Olive Oil',
    description: 'Certified organic olive oil from our sustainable orchards in Lebanon, perfect for health-conscious consumers looking for pure, natural products.',
    image: '/assets/images/oil2.jpg',
    details: 'Available in 500ml bottles'
  },
  {
    id: 3,
    name: 'Infused Olive Oil - Garlic',
    description: 'Our classic olive oil infused with fresh garlic, adding a delicious flavor to your favorite dishes.',
    image: '/assets/images/oil3.jpg',
    details: 'Available in 250ml bottles'
  },
  {
    id: 4,
    name: 'Infused Olive Oil - Rosemary',
    description: 'Extra virgin olive oil infused with fresh rosemary for a fragrant and herbaceous flavor profile.',
    image: '/assets/images/oil4.jpg',
    details: 'Available in 250ml bottles'
  },
  {
    id: 5,
    name: 'Premium Blend Olive Oil',
    description: 'A carefully crafted blend of olive varieties, offering a balanced flavor profile perfect for everyday cooking.',
    image: '/assets/images/oil5.jpg',
    details: 'Available in 1L bottles'
  },
  {
    id: 6,
    name: 'Early Harvest Olive Oil',
    description: 'Harvested from young green olives for a more intense flavor with peppery notes and higher antioxidant content.',
    image: '/assets/images/oil6.jpg',
    details: 'Available in 500ml bottles, limited production'
  },
];

const Oil = () => {
  const { t } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.querySelector('.page-header-content'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }

    // Products animation
    if (productsRef.current) {
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            productsRef.current?.querySelectorAll('.oil-product-card'),
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }
          );
        }
      });
    }
  }, []);

  return (
    <div className="oil-page">
      {/* Page Header */}
      <div ref={headerRef} className="page-header">
        <div className="container">
          <div className="page-header-content">
            <h1>{t('our-oil')}</h1>
            <p>Discover our selection of premium Lebanese olive oils</p>
          </div>
        </div>
      </div>

      {/* Oil Products */}
      <section ref={productsRef} className="oil-products-section">
        <div className="container">
          <div className="oil-products-grid">
            {oilProducts.map((product) => (
              <div key={product.id} className="oil-product-card">
                <img src={product.image} alt={product.name} />
                <div className="oil-product-content">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="details">{product.details}</p>
                  <Link to={`/oil/${product.id}`} className="btn">Learn More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="quality-section">
        <div className="container">
          <div className="quality-content">
            <h2>Our Commitment to Quality</h2>
            <p>
              At ORSA GROUP, we're committed to delivering the highest quality olive oil. 
              Our olives are hand-picked at the optimal time and cold-pressed within hours 
              to ensure maximum freshness and nutritional value.
            </p>
            <p>
              We maintain strict quality control throughout our production process, 
              from cultivation to bottling, ensuring that every bottle meets our 
              exacting standards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Oil;