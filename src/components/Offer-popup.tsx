import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useOfferPopup } from "@/hooks/useOfferPopup";

interface OfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  type?: "sale" | "discount" | "news" | "general";
}

export function OfferPopup({
  isOpen,
  onClose,
  title,
  description,
  imageUrl,
  imageAlt = "Offer image",
  buttonText = "Learn More",
  buttonLink,
  onButtonClick,
  type = "general",
}: OfferPopupProps) {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (buttonLink) {
      // Navigate to the link (you might want to use react-router's navigate here)
      window.location.href = buttonLink;
    }
    onClose();
  };

  const getTypeStyles = () => {
    switch (type) {
      case "sale":
        return {
          titleColor: "text-red-600",
          buttonVariant: "destructive" as const,
          borderColor: "border-red-200",
        };
      case "discount":
        return {
          titleColor: "text-orange-600",
          buttonVariant: "default" as const,
          borderColor: "border-orange-200",
        };
      case "news":
        return {
          titleColor: "text-blue-600",
          buttonVariant: "default" as const,
          borderColor: "border-blue-200",
        };
      default:
        return {
          titleColor: "text-gray-800",
          buttonVariant: "default" as const,
          borderColor: "border-gray-200",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-md mx-auto ${styles.borderColor} border-2`}
        showCloseButton={false}
      >
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        <DialogHeader className="space-y-4">
          {/* Image */}
          {imageUrl && (
            <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Title */}
          <DialogTitle className={`text-xl font-bold ${styles.titleColor}`}>
            {title}
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="text-gray-600 text-base leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          {(buttonLink || onButtonClick) && (
            <Button
              variant={styles.buttonVariant}
              onClick={handleButtonClick}
              className="w-full sm:w-auto"
            >
              {buttonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Example usage component (you can remove this if not needed)
export function OfferPopupExample() {
  const { isOpen, openPopup, closePopup } = useOfferPopup();

  return (
    <>
      <Button onClick={openPopup}>Show Offer</Button>
      <OfferPopup
        isOpen={isOpen}
        onClose={closePopup}
        title="Special Sale! 50% Off"
        description="Limited time offer on our premium oil collection. Don't miss out on this amazing deal!"
        imageUrl="/oil1.jpg"
        imageAlt="Oil products on sale"
        buttonText="Shop Now"
        buttonLink="/oil"
        type="sale"
      />
    </>
  );
}
