import { Button } from "@/components/ui/button";
import { OfferPopup } from "@/components/Offer-popup";
import { useOfferPopup } from "@/hooks/useOfferPopup";

export function OfferPopupDemo() {
  const salePopup = useOfferPopup();
  const discountPopup = useOfferPopup();
  const newsPopup = useOfferPopup();

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Offer Popup Examples</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button onClick={salePopup.openPopup} variant="destructive">
          Show Sale Popup
        </Button>

        <Button onClick={discountPopup.openPopup} variant="default">
          Show Discount Popup
        </Button>

        <Button onClick={newsPopup.openPopup} variant="outline">
          Show News Popup
        </Button>
      </div>

      {/* Sale Popup */}
      <OfferPopup
        isOpen={salePopup.isOpen}
        onClose={salePopup.closePopup}
        title="🔥 MEGA SALE! 50% OFF"
        description="Limited time offer on our premium oil collection. High-quality oils at unbeatable prices. Sale ends in 24 hours!"
        imageUrl="/oil1.jpg"
        imageAlt="Premium oils on sale"
        buttonText="Shop Sale Items"
        buttonLink="/oil"
        type="sale"
      />

      {/* Discount Popup */}
      <OfferPopup
        isOpen={discountPopup.isOpen}
        onClose={discountPopup.closePopup}
        title="💰 Special Discount - 30% OFF"
        description="Get 30% off on all orders above €100. Use code SAVE30 at checkout. Valid for new and existing customers."
        imageUrl="/oil2.jpg"
        imageAlt="Discount offer"
        buttonText="Apply Discount"
        onButtonClick={() => {
          // You can handle custom logic here, like applying a coupon code
          console.log("Discount applied!");
          // Navigate to cart or products page
          window.location.href = "/cart";
        }}
        type="discount"
      />

      {/* News Popup */}
      <OfferPopup
        isOpen={newsPopup.isOpen}
        onClose={newsPopup.closePopup}
        title="📢 New Products Available!"
        description="We've just added new premium oil varieties to our collection. Discover exotic flavors and premium quality oils from around the world."
        imageUrl="/oil3.jpg"
        imageAlt="New oil products"
        buttonText="Explore New Products"
        buttonLink="/oil?filter=new"
        type="news"
      />
    </div>
  );
}
