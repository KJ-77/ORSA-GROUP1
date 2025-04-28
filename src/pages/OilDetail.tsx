import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

// Sample olive oil product data
const oilProducts = [
  {
    id: 1,
    name: "Extra Virgin Olive Oil",
    description:
      "Our premium extra virgin olive oil is cold-pressed from handpicked Lebanese olives, delivering an authentic taste of Lebanon's rich olive heritage.",
    longDescription: `Our Extra Virgin Olive Oil is the crown jewel of our collection. Sourced from ancient olive groves in the mountains of Lebanon, this premium oil is produced using traditional methods passed down through generations.
    
    The olives are carefully hand-picked at the perfect moment of ripeness and cold-pressed within hours to preserve their exceptional flavor and nutritional properties. The result is an exquisite, golden-green oil with a fruity aroma, smooth texture, and a distinct peppery finish.
    
    With its low acidity and high polyphenol content, our Extra Virgin Olive Oil is not just delicious but also packed with health benefits. Use it to enhance salads, drizzle over cooked dishes, or simply enjoy with fresh bread.`,
    image: "/assets/images/oil1.jpg",
    gallery: [
      "/assets/images/oil1.jpg",
      "/assets/images/oil21.jpg",
      "/assets/images/oil22.jpg",
    ],
    details: "Available in 500ml and 750ml bottles",
    nutritionFacts: {
      servingSize: "1 tbsp (15ml)",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      monounsaturatedFat: "10g",
      polyunsaturatedFat: "2g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbohydrate: "0g",
      protein: "0g",
      vitaminE: "20%",
    },
  },
  {
    id: 2,
    name: "Organic Olive Oil",
    description:
      "Certified organic olive oil from our sustainable orchards in Lebanon, perfect for health-conscious consumers looking for pure, natural products.",
    longDescription: `Our Organic Olive Oil is produced from olives grown in certified organic orchards in Lebanon. We adhere to strict organic farming practices, avoiding the use of synthetic pesticides, herbicides, or fertilizers.
    
    The olives are harvested at their optimal ripeness and cold-pressed using environmentally friendly methods that maintain the oil's organic integrity and nutritional value.
    
    This oil has a balanced flavor profile with hints of fresh green leaves, a smooth texture, and a mildly peppery finish. It's an excellent choice for those who prioritize both environmental sustainability and personal health.`,
    image: "/assets/images/oil2.jpg",
    gallery: [
      "/assets/images/oil2.jpg",
      "/assets/images/oil31.jpg",
      "/assets/images/oil32.jpg",
    ],
    details: "Available in 500ml bottles",
    nutritionFacts: {
      servingSize: "1 tbsp (15ml)",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      monounsaturatedFat: "10g",
      polyunsaturatedFat: "2g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbohydrate: "0g",
      protein: "0g",
      vitaminE: "20%",
    },
  },
  {
    id: 3,
    name: "Infused Olive Oil - Garlic",
    description:
      "Our classic olive oil infused with fresh garlic, adding a delicious flavor to your favorite dishes.",
    longDescription: `Our Garlic Infused Olive Oil combines our premium extra virgin olive oil with the rich, aromatic flavor of fresh garlic. This infusion creates a versatile cooking oil that adds depth and complexity to any dish without the need to chop or mince garlic.
    
    We use a delicate infusion process that preserves the integrity of both the olive oil and the garlic flavor, resulting in a harmonious blend that elevates your culinary creations.
    
    Perfect for sautéing vegetables, drizzling over pasta, or using as a bread dipping oil, our Garlic Infused Olive Oil is a must-have for garlic lovers and home chefs alike.`,
    image: "/assets/images/oil3.jpg",
    gallery: [
      "/assets/images/oil3.jpg",
      "/assets/images/oil41.jpg",
      "/assets/images/oil42.jpg",
    ],
    details: "Available in 250ml bottles",
    nutritionFacts: {
      servingSize: "1 tbsp (15ml)",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      monounsaturatedFat: "10g",
      polyunsaturatedFat: "2g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbohydrate: "0g",
      protein: "0g",
      vitaminE: "18%",
    },
  },
  {
    id: 4,
    name: "Infused Olive Oil - Rosemary",
    description:
      "Extra virgin olive oil infused with fresh rosemary for a fragrant and herbaceous flavor profile.",
    longDescription: `Our Rosemary Infused Olive Oil marries our premium extra virgin olive oil with the aromatic essence of fresh rosemary. This infusion creates a distinctive oil with a herbaceous character that enhances a wide variety of dishes.
    
    We carefully select fresh rosemary and infuse it into our oil using a method that captures the herb's essential oils and flavor compounds, resulting in a product that truly embodies the essence of this classic Mediterranean herb.
    
    Use it to add depth to roasted potatoes, grilled meats, or drizzle over focaccia bread for an authentic Mediterranean touch to your meals.`,
    image: "/assets/images/oil4.jpg",
    gallery: [
      "/assets/images/oil4.jpg",
      "/assets/images/oil51.jpg",
      "/assets/images/oil52.jpg",
    ],
    details: "Available in 250ml bottles",
    nutritionFacts: {
      servingSize: "1 tbsp (15ml)",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      monounsaturatedFat: "10g",
      polyunsaturatedFat: "2g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbohydrate: "0g",
      protein: "0g",
      vitaminE: "18%",
    },
  },
  {
    id: 5,
    name: "Premium Blend Olive Oil",
    description:
      "A carefully crafted blend of olive varieties, offering a balanced flavor profile perfect for everyday cooking.",
    longDescription: `Our Premium Blend Olive Oil is a meticulously crafted combination of different olive varieties from our Lebanese groves. This thoughtful blend creates an oil with a balanced flavor profile that's versatile enough for everyday use while still maintaining the quality and character you expect from ORSA GROUP.
    
    The oil has a golden color, a mild fruity aroma, and a smooth taste with just a hint of peppery notes on the finish.
    
    An excellent all-purpose cooking oil, our Premium Blend is ideal for sautéing, grilling, roasting, and baking. It's the perfect choice for those looking to incorporate the health benefits of olive oil into their daily cooking routines.`,
    image: "/assets/images/oil5.jpg",
    gallery: [
      "/assets/images/oil5.jpg",
      "/assets/images/oil66.jpg",
      "/assets/images/tents.jpg",
    ],
    details: "Available in 1L bottles",
    nutritionFacts: {
      servingSize: "1 tbsp (15ml)",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      monounsaturatedFat: "10g",
      polyunsaturatedFat: "2g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbohydrate: "0g",
      protein: "0g",
      vitaminE: "15%",
    },
  },
  {
    id: 6,
    name: "Early Harvest Olive Oil",
    description:
      "Harvested from young green olives for a more intense flavor with peppery notes and higher antioxidant content.",
    longDescription: `Our Early Harvest Olive Oil is produced from olives picked at the beginning of the harvest season when they're still green and slightly underripe. This early harvesting creates an oil with distinctive characteristics prized by olive oil connoisseurs.
    
    The resulting oil has a vibrant green color, robust fruity flavor, and a pronounced peppery finish that catches at the back of the throat – a sign of high polyphenol content and exceptional quality.
    
    With its higher concentration of antioxidants and intense flavor profile, our Early Harvest oil is perfect for finishing dishes, drizzling over soups, or enjoying with artisanal bread and good company. Due to the limited production quantities, this is a seasonal specialty product.`,
    image: "/assets/images/oil6.jpeg",
    gallery: [
      "/assets/images/oil6.jpeg",
      "/assets/images/oil81.jpeg",
      "/assets/images/oil82.jpeg",
    ],
    details: "Available in 500ml bottles, limited production",
    nutritionFacts: {
      servingSize: "1 tbsp (15ml)",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      monounsaturatedFat: "10g",
      polyunsaturatedFat: "2g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbohydrate: "0g",
      protein: "0g",
      vitaminE: "25%",
    },
  },
];

const OilDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [product, setProduct] = useState<(typeof oilProducts)[0] | null>(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    // Find the product that matches the ID from the URL params
    if (id) {
      const foundProduct = oilProducts.find((p) => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setActiveImage(foundProduct.image);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center py-12">
          <h2 className="text-3xl text-[#4a8e3b] mb-4">Product Not Found</h2>
          <p className="mb-8">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Link
            to="/oil"
            className="inline-block bg-[#4a8e3b] text-white py-3 px-6 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
          >
            Back to All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-8">
        {/* Breadcrumb Navigation */}
        <div className="my-4 mb-8 text-sm text-gray-500">
          <Link to="/" className="text-[#4a8e3b] no-underline hover:underline">
            Home
          </Link>{" "}
          &gt;{" "}
          <Link
            to="/oil"
            className="text-[#4a8e3b] no-underline hover:underline"
          >
            {t("our-oil")}
          </Link>{" "}
          &gt; {product.name}
        </div>

        {/* Product Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-md mb-4">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.gallery.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 rounded overflow-hidden cursor-pointer opacity-70 transition-all duration-300 hover:opacity-100 ${
                    activeImage === image
                      ? "opacity-100 border-2 border-[#4a8e3b]"
                      : ""
                  }`}
                  onClick={() => setActiveImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-4xl text-[#333] mb-4 md:text-3xl">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
            <p className="text-sm text-gray-500 italic mb-8">
              {product.details}
            </p>
            <div className="flex gap-4">
              <button className="inline-block bg-[#4a8e3b] text-white py-3 px-6 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]">
                Contact for Pricing
              </button>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mb-16">
          <h2 className="text-3xl text-[#4a8e3b] mb-6 pb-2 border-b border-gray-200">
            Product Details
          </h2>
          <div className="leading-relaxed">
            {product.longDescription.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Nutrition Facts */}
        <div className="mb-16">
          <h2 className="text-3xl text-[#4a8e3b] mb-6 pb-2 border-b border-gray-200">
            Nutrition Facts
          </h2>
          <div className="max-w-lg border border-gray-300 rounded p-6 bg-gray-50">
            <div className="border-b-8 border-black pb-2 mb-2">
              <h3 className="mb-2">Nutrition Facts</h3>
              <p>Serving Size: {product.nutritionFacts.servingSize}</p>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Calories</span>
              <span>{product.nutritionFacts.calories}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Total Fat</span>
              <span>{product.nutritionFacts.totalFat}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300 pl-6 text-sm">
              <span>Saturated Fat</span>
              <span>{product.nutritionFacts.saturatedFat}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300 pl-6 text-sm">
              <span>Monounsaturated Fat</span>
              <span>{product.nutritionFacts.monounsaturatedFat}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300 pl-6 text-sm">
              <span>Polyunsaturated Fat</span>
              <span>{product.nutritionFacts.polyunsaturatedFat}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Cholesterol</span>
              <span>{product.nutritionFacts.cholesterol}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Sodium</span>
              <span>{product.nutritionFacts.sodium}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Total Carbohydrate</span>
              <span>{product.nutritionFacts.totalCarbohydrate}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Protein</span>
              <span>{product.nutritionFacts.protein}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Vitamin E</span>
              <span>{product.nutritionFacts.vitaminE}</span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-3xl text-[#4a8e3b] mb-6 pb-2 border-b border-gray-200">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {oilProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-[180px] object-cover"
                  />
                  <h3 className="p-4 pb-2 text-xl">{relatedProduct.name}</h3>
                  <Link
                    to={`/oil/${relatedProduct.id}`}
                    className="mx-4 mb-4 inline-block bg-[#4a8e3b] text-white py-2 px-4 rounded text-sm font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
                  >
                    View Details
                  </Link>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/oil"
            className="inline-block bg-[#4a8e3b] text-white py-3 px-6 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
          >
            &larr; Back to All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OilDetail;
