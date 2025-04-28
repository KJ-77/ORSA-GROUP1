// Language integration for ORSA GROUP website
document.addEventListener('DOMContentLoaded', function() {
  // Default translations
  const translations = {
    'en': {
      'home': 'Home',
      'our_items': 'Our Items',
      'our_offers': 'Our Offers',
      'our_branches': 'Our Branches',
      'about_us': 'About Us',
      'contact': 'Contact Us',
      'view_details': 'View Details',
      'add_to_cart': 'Add to Cart',
      'description': 'Description',
      'nutrition': 'Nutrition',
      'usage_tips': 'Usage Tips',
      'you_may_also_like': 'You May Also Like',
      'in_stock': 'In Stock',
      'free_shipping': 'Free shipping on orders over €50',
      'natural': '100% Natural',
      'all_rights_reserved': 'All Rights Reserved',
      'available_sizes': 'Available Sizes',
      'varieties': 'Varieties',
      'product_details': 'Product Details',
      'quality_guarantee': 'Quality Guarantee',
      'premium_quality': 'Premium Quality',
      'direct_import': 'Direct Import',
      'natural_products': '100% Natural Products'
    },
    'fr': {
      'home': 'Accueil',
      'our_items': 'Nos Produits',
      'our_offers': 'Nos Offres',
      'our_branches': 'Nos Succursales',
      'about_us': 'À Propos',
      'contact': 'Contact',
      'view_details': 'Voir Détails',
      'add_to_cart': 'Ajouter au Panier',
      'description': 'Description',
      'nutrition': 'Nutrition',
      'usage_tips': 'Conseils d\'Utilisation',
      'you_may_also_like': 'Vous Aimerez Aussi',
      'in_stock': 'En Stock',
      'free_shipping': 'Livraison gratuite pour les commandes de plus de 50€',
      'natural': '100% Naturel',
      'all_rights_reserved': 'Tous Droits Réservés',
      'available_sizes': 'Tailles Disponibles',
      'varieties': 'Variétés',
      'product_details': 'Détails du Produit',
      'quality_guarantee': 'Garantie de Qualité',
      'premium_quality': 'Qualité Premium',
      'direct_import': 'Importation Directe',
      'natural_products': 'Produits 100% Naturels'
    },
    'ar': {
      'home': 'الرئيسية',
      'our_items': 'منتجاتنا',
      'our_offers': 'عروضنا',
      'our_branches': 'فروعنا',
      'about_us': 'من نحن',
      'contact': 'اتصل بنا',
      'view_details': 'عرض التفاصيل',
      'add_to_cart': 'أضف إلى السلة',
      'description': 'الوصف',
      'nutrition': 'القيمة الغذائية',
      'usage_tips': 'نصائح الاستخدام',
      'you_may_also_like': 'قد يعجبك أيضًا',
      'in_stock': 'متوفر',
      'free_shipping': 'شحن مجاني للطلبات التي تزيد عن 50 يورو',
      'natural': '100٪ طبيعي',
      'all_rights_reserved': 'جميع الحقوق محفوظة',
      'available_sizes': 'الأحجام المتوفرة',
      'varieties': 'الأصناف',
      'product_details': 'تفاصيل المنتج',
      'quality_guarantee': 'ضمان الجودة',
      'premium_quality': 'جودة ممتازة',
      'direct_import': 'استيراد مباشر',
      'natural_products': 'منتجات طبيعية 100٪'
    }
  };

  // Get current language from localStorage or default to English
  let currentLang = localStorage.getItem('orsa_language') || 'en';
  
  // Set initial language
  setLanguage(currentLang);
  
  // Update language button text
  updateLanguageButton(currentLang);
  
  // Add event listeners to language options
  const languageOptions = document.querySelectorAll('.language-dropdown a');
  languageOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
      updateLanguageButton(lang);
      localStorage.setItem('orsa_language', lang);
    });
  });
  
  // Function to set language
  function setLanguage(lang) {
    // Set document direction for Arabic
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.style.fontFamily = "'Cairo', sans-serif";
      
      // Add Arabic font if not already added
      if (!document.getElementById('arabic-font')) {
        const fontLink = document.createElement('link');
        fontLink.id = 'arabic-font';
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap';
        document.head.appendChild(fontLink);
      }
    } else {
      document.documentElement.dir = 'ltr';
      document.body.style.fontFamily = "Arial, sans-serif";
    }
    
    // Translate navigation links
    const navLinks = document.querySelectorAll('.all-links li a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (href === '#' || href === 'index.html') {
        link.textContent = translations[lang]['home'];
      } else if (href === 'our-items.html' || href === '#services') {
        link.textContent = translations[lang]['our_items'];
      } else if (href === 'our-offers.html') {
        link.textContent = translations[lang]['our_offers'];
      } else if (href === 'our-branches.html') {
        link.textContent = translations[lang]['our_branches'];
      } else if (href === '#about' || href === 'index.html#about') {
        link.textContent = translations[lang]['about_us'];
      } else if (href === '#contact' || href === 'index.html#contact') {
        link.textContent = translations[lang]['contact'];
      }
    });
    
    // Translate buttons
    document.querySelectorAll('a.offer-button, a.branch-button, a.bundle-button, a.promotion-button, button.form-button, button.add-to-cart-btn').forEach(btn => {
      if (btn.textContent.includes('View Details')) {
        btn.textContent = translations[lang]['view_details'];
      } else if (btn.textContent.includes('Add to Cart')) {
        btn.textContent = translations[lang]['add_to_cart'];
      }
    });
    
    // Translate tab buttons
    document.querySelectorAll('.tab-btn').forEach(tab => {
      if (tab.textContent.trim() === 'Description') {
        tab.textContent = translations[lang]['description'];
      } else if (tab.textContent.trim() === 'Nutrition') {
        tab.textContent = translations[lang]['nutrition'];
      } else if (tab.textContent.trim() === 'Usage Tips') {
        tab.textContent = translations[lang]['usage_tips'];
      }
    });
    
    // Translate product meta
    document.querySelectorAll('.product-meta p').forEach(meta => {
      if (meta.textContent.includes('In Stock')) {
        meta.innerHTML = `<i class="fas fa-check-circle"></i> ${translations[lang]['in_stock']}`;
      } else if (meta.textContent.includes('Free shipping')) {
        meta.innerHTML = `<i class="fas fa-truck"></i> ${translations[lang]['free_shipping']}`;
      } else if (meta.textContent.includes('100% Natural')) {
        meta.innerHTML = `<i class="fas fa-leaf"></i> ${translations[lang]['natural']}`;
      }
    });
    
    // Translate section titles
    document.querySelectorAll('h1, h2').forEach(title => {
      const text = title.textContent.trim();
      if (text === 'Our Items' || text === 'OUR ITEMS') {
        title.textContent = translations[lang]['our_items'].toUpperCase();
      } else if (text === 'About Us') {
        title.textContent = translations[lang]['about_us'];
      } else if (text === 'Contact Us') {
        title.textContent = translations[lang]['contact'];
      } else if (text === 'You May Also Like') {
        title.textContent = translations[lang]['you_may_also_like'];
      } else if (text === 'Product Details') {
        title.textContent = translations[lang]['product_details'];
      } else if (text === 'Available Sizes') {
        title.textContent = translations[lang]['available_sizes'];
      } else if (text === 'Quality Guarantee') {
        title.textContent = translations[lang]['quality_guarantee'];
      }
    });
    
    // Translate footer text
    const footerText = document.querySelector('footer p');
    if (footerText) {
      footerText.textContent = `ORSA GROUP © ${new Date().getFullYear()} ${translations[lang]['all_rights_reserved']}`;
    }
  }
  
  // Function to update language button text
  function updateLanguageButton(lang) {
    const languageBtn = document.querySelector('.language-btn');
    if (languageBtn) {
      const langText = lang === 'en' ? 'EN' : (lang === 'fr' ? 'FR' : 'AR');
      languageBtn.innerHTML = `${langText} <i class="fas fa-chevron-down"></i>`;
    }
  }
});
