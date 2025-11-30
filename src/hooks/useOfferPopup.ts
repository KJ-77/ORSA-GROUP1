import { useState, useCallback } from "react";

interface UseOfferPopupOptions {
  storageKey?: string;
  showOnceDaily?: boolean;
}

export function useOfferPopup(options?: UseOfferPopupOptions) {
  const { storageKey, showOnceDaily = false } = options || {};
  const [isOpen, setIsOpen] = useState(false);

  const checkIfShouldShow = useCallback(() => {
    if (!showOnceDaily || !storageKey) return true;

    const lastShown = localStorage.getItem(storageKey);
    if (!lastShown) return true;

    const lastShownDate = new Date(lastShown);
    const today = new Date();

    // Check if it's a different day
    return (
      lastShownDate.getDate() !== today.getDate() ||
      lastShownDate.getMonth() !== today.getMonth() ||
      lastShownDate.getFullYear() !== today.getFullYear()
    );
  }, [storageKey, showOnceDaily]);

  const openPopup = useCallback(() => {
    if (checkIfShouldShow()) {
      setIsOpen(true);
      if (showOnceDaily && storageKey) {
        localStorage.setItem(storageKey, new Date().toISOString());
      }
    }
  }, [checkIfShouldShow, showOnceDaily, storageKey]);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openPopup,
    closePopup,
  };
}
