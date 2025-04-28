import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/OilDetail.css';

// Sample olive oil product data
const oilProducts = [
  {
    id: 1,
    name: 'Extra Virgin Olive Oil',
    description: 'Our premium extra virgin olive oil is cold-pressed from handpicked Lebanese olives, delivering an authentic taste of Lebanon\'s rich olive heritage.',
    longDescription: `Our Extra Virgin Olive Oil is the crown jewel of our collection. Sourced from ancient olive groves in the mountains of Lebanon, this premium oil is produced using traditional methods passed down through generations.
    
    The olives are carefully hand-picked at the perfect moment of ripeness and cold-pressed within hours to preserve their exceptional flavor and nutritional properties. The result is an exquisite, golden-green oil with a fruity aroma, smooth texture, and a distinct peppery finish.
    
    With its low acidity and high polyphenol content, our Extra Virgin Olive Oil is not just delicious but also packed with health benefits. Use it to enhance salads, drizzle over cooked dishes, or simply enjoy with fresh bread.`,
    image: '/assets/images/oil1.jpg',
    gallery: ['/assets/images/oil1.jpg', '/assets/images/oil21.jpg', '/assets/images/oil22.jpg'],
    details: 'Available in 500ml and 750ml bottles',
    nutritionFacts: {
      servingSize: '1 tbsp (15ml)',
      calories: 120,
      totalFat: '14g',
      saturatedFat: '2g',
      monounsaturatedFat: '10g',
      polyunsaturatedFat: '2g',
      cholesterol: '0mg',
      sodium: '0mg',
      totalCarbohydrate: '0g',
      protein: '0g',
      vitaminE: '20%'
    }
  },
  {
    id: 2,
    name: 'Organic Olive Oil',
    description: 'Certified organic olive oil from our sustainable orchards in Lebanon, perfect for health-conscious consumers looking for pure, natural products.',
    longDescription: `Our Organic Olive Oil is produced from olives grown in certified organic orchards in Lebanon. We adhere to strict organic farming practices, avoiding the use of synthetic pesticides, herbicides, or fertilizers.
    
    The olives are harvested at their optimal ripeness and cold-pressed using environmentally friendly methods that maintain the oil's organic integrity and nutritional value.
    
    This oil has a balanced flavor profile with hints of fresh green leaves, a smooth texture, and a mildly peppery finish. It's an excellent choice for those who prioritize both environmental sustainability and personal health.`,
    image: '/assets/images/oil2.jpg',
    gallery: ['/assets/images/oil2.jpg', '/assets/images/oil31.jpg', '/assets/images/oil32.jpg'],
    details: 'Available in 500ml bottles',
    nutritionFacts: {
      servingSize: '1 tbsp (15ml)',
      calories: 120,
      totalFat: '14g',
      saturatedFat: '2g',
      monounsaturatedFat: '10g',
      polyunsaturatedFat: '2g',
      cholesterol: '0mg',
      sodium: '0mg',
      totalCarbohydrate: '0g',
      protein: '0g',
      vitaminE: '20%'
    }
  },
  {
    id: 3,
    name: 'Infused Olive Oil - Garlic',
    description: 'Our classic olive oil infused with fresh garlic, adding a delicious flavor to your favorite dishes.',
    longDescription: `Our Garlic Infused Olive Oil combines our premium extra virgin olive oil with the rich, aromatic flavor of fresh garlic. This infusion creates a versatile cooking oil that adds depth and complexity to any dish without the need to chop or mince garlic.
    
    We use a delicate infusion process that preserves the integrity of both the olive oil and the garlic flavor, resulting in a harmonious blend that elevates your culinary creations.
    
    Perfect for sautéing vegetables, drizzling over pasta, or using as a bread dipping oil, our Garlic Infused Olive Oil is a must-have for garlic lovers and home chefs alike.`,
    image: '/assets/images/oil3.jpg',
    gallery: ['/assets/images/oil3.jpg', '/assets/images/oil41.jpg', '/assets/images/oil42.jpg'],
    details: 'Available in 250ml bottles',
    nutritionFacts: {
      servingSize: '1 tbsp (15ml)',
      calories: 120,
      totalFat: '14g',
      saturatedFat: '2g',
      monounsaturatedFat: '10g',
      polyunsaturatedFat: '2g',
      cholesterol: '0mg',
      sodium: '0mg',
      totalCarbohydrate: '0g',
      protein: '0g',
      vitaminE: '18%'
    }
  },
  {
    id: 4,
    name: 'Infused Olive Oil - Rosemary',
    description: 'Extra virgin olive oil infused with fresh rosemary for a fragrant and herbaceous flavor profile.',
    longDescription: `Our Rosemary Infused Olive Oil marries our premium extra virgin olive oil with the aromatic essence of fresh rosemary. This infusion creates a distinctive oil with a herbaceous character that enhances a wide variety of dishes.
    
    We carefully select fresh rosemary and infuse it into our oil using a method that captures the herb's essential oils and flavor compounds, resulting in a product that truly embodies the essence of this classic Mediterranean herb.
    
    Use it to add depth to roasted potatoes, grilled meats, or drizzle over focaccia bread for an authentic Mediterranean touch to your meals.`,
    image: '/assets/images/oil4.jpg',
    gallery: ['/assets/images/oil4.jpg', '/assets/images/oil51.jpg', '/assets/images/oil52.jpg'],
    details: 'Available in 250ml bottles',
    nutritionFacts: {
      servingSize: '1 tbsp (15ml)',
      calories: 120,
      totalFat: '14g',
      saturatedFat: '2g',
      monounsaturatedFat: '10g',
      polyunsaturatedFat: '2g',
      cholesterol: '0mg',
      sodium: '0mg',
      totalCarbohydrate: '0g',
      protein: '0g',
      vitaminE: '18%'
    }
  },
  {
    id: 5,
    name: 'Premium Blend Olive Oil',
    description: 'A carefully crafted blend of olive varieties, offering a balanced flavor profile perfect for everyday cooking.',
    longDescription: `Our Premium Blend Olive Oil is a meticulously crafted combination of different olive varieties from our Lebanese groves. This thoughtful blend creates an oil with a balanced flavor profile that's versatile enough for everyday use while still maintaining the quality and character you expect from ORSA GROUP.
    
    The oil has a golden color, a mild fruity aroma, and a smooth taste with just a hint of peppery notes on the finish.
    
    An excellent all-purpose cooking oil, our Premium Blend is ideal for sautéing, grilling, roasting, and baking. It's the perfect choice for those looking to incorporate the health benefits of olive oil into their daily cooking routines.`,
    image: '/assets/images/oil5.jpg',
    gallery: ['/assets/images/oil5.jpg', '/assets/images/oil66.jpg', '/assets/images/tents.jpg'],
    details: 'Available in 1L bottles',
    nutritionFacts: {
      servingSize: '1 tbsp (15ml)',
      calories: 120,
      totalFat: '14g',
      saturatedFat: '2g',
      monounsaturatedFat: '10g',
      polyunsaturatedFat: '2g',
      cholesterol: '0mg',
      sodium: '0mg',
      totalCarbohydrate: '0g',
      protein: '0g',
      vitaminE: '15%'
    }
  },
  {
    id: 6,
    name: 'Early Harvest Olive Oil',
    description: 'Harvested from young green olives for a more intense flavor with peppery notes and higher antioxidant content.',
    longDescription: `Our Early Harvest Olive Oil is produced from olives picked at the beginning of the harvest season when they're still green and slightly underripe. This early harvesting creates an oil with distinctive characteristics prized by olive oil connoisseurs.
    
    The resulting oil has a vibrant green color, robust fruity flavor, and a pronounced peppery finish that catches at the back of the throat – a sign of high polyphenol content and exceptional quality.
    
    With its higher concentration of antioxidants and intense flavor profile, our Early Harvest oil is perfect for finishing dishes, drizzling over soups, or enjoying with artisanal bread and good company. Due to the limited production quantities, this is a seasonal specialty product.`,
    image: '/assets/images/oil6.jpeg',
    gallery: ['/assets/images/oil6.jpeg', '/assets/images/oil81.jpeg', '/assets/images/oil82.jpeg'],
    details: 'Available in 500ml bottles, limited production',
    nutritionFacts: {
      servingSize: '1 tbsp (15ml)',
      calories: 120,
      totalFat: '14g',
      saturatedFat: '2g',
      monounsaturatedFat: '10g',
      polyunsaturatedFat: '2g',
      cholesterol: '0mg',
      sodium: '0mg',
      totalCarbohydrate: '0g',
      protein: '0g',
      vitaminE: '25%'
    }
  },
];

const OilDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [product, setProduct] = useState<typeof oilProducts[0] | null>(null);
  const [activeImage, setActiveImage] = useState('');
  
  useEffect(() => {
    // Find the product that matches the ID from the URL params
    if (id) {
      const foundProduct = oilProducts.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setActiveImage(foundProduct.image);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/oil" className="btn">Back to All Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="oil-detail-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> &gt; <Link to="/oil">{t('our-oil')}</Link> &gt; {product.name}
        </div>
        
        {/* Product Overview */}
        <div className="product-overview">
          <div className="product-gallery">
            <div className="main-image">
              <img src={activeImage} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              {product.gallery.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${activeImage === image ? 'active' : ''}`}
                  onClick={() => setActiveImage(image)}
                >
                  <img src={image} alt={`${product.name} thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-details">{product.details}</p>
            <div className="action-buttons">
              <button className="btn">Contact for Pricing</button>
            </div>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="product-details-section">
          <h2>Product Details</h2>
          <div className="product-long-description">
            {product.longDescription.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        {/* Nutrition Facts */}
        <div className="nutrition-facts-section">
          <h2>Nutrition Facts</h2>
          <div className="nutrition-facts-table">
            <div className="nutrition-header">
              <h3>Nutrition Facts</h3>
              <p>Serving Size: {product.nutritionFacts.servingSize}</p>
            </div>
            <div className="nutrition-item">
              <span>Calories</span>
              <span>{product.nutritionFacts.calories}</span>
            </div>
            <div className="nutrition-item">
              <span>Total Fat</span>
              <span>{product.nutritionFacts.totalFat}</span>
            </div>
            <div className="nutrition-item sub-item">
              <span>Saturated Fat</span>
              <span>{product.nutritionFacts.saturatedFat}</span>
            </div>
            <div className="nutrition-item sub-item">
              <span>Monounsaturated Fat</span>
              <span>{product.nutritionFacts.monounsaturatedFat}</span>
            </div>
            <div className="nutrition-item sub-item">
              <span>Polyunsaturated Fat</span>
              <span>{product.nutritionFacts.polyunsaturatedFat}</span>
            </div>
            <div className="nutrition-item">
              <span>Cholesterol</span>
              <span>{product.nutritionFacts.cholesterol}</span>
            </div>
            <div className="nutrition-item">
              <span>Sodium</span>
              <span>{product.nutritionFacts.sodium}</span>
            </div>
            <div className="nutrition-item">
              <span>Total Carbohydrate</span>
              <span>{product.nutritionFacts.totalCarbohydrate}</span>
            </div>
            <div className="nutrition-item">
              <span>Protein</span>
              <span>{product.nutritionFacts.protein}</span>
            </div>
            <div className="nutrition-item">
              <span>Vitamin E</span>
              <span>{product.nutritionFacts.vitaminE}</span>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="related-products-section">
          <h2>You May Also Like</h2>
          <div className="related-products">
            {oilProducts
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="related-product-card">
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  <h3>{relatedProduct.name}</h3>
                  <Link to={`/oil/${relatedProduct.id}`} className="btn">View Details</Link>
                </div>
              ))
            }
          </div>
        </div>
        
        <div className="back-button">
          <Link to="/oil" className="btn">&larr; Back to All Products</Link>
        </div>
      </div>
    </div>
  );
};

export default OilDetail;