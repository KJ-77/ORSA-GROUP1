// Dynamic Navbar Component
document.addEventListener('DOMContentLoaded', function() {
  // Create navbar HTML
  const navbarHTML = `
    <div class="navbar">
      <div class="logo">
        <a href="index.html">ORSA GROUP</a>
      </div>
      <div class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav class="nav-links">
        <a href="index.html">Home</a>
        <a href="our-items.html">Our Items</a>
        <a href="our-offers.html">Our Offers</a>
        <a href="our-branches.html">Our Branches</a>
        <a href="index.html#about">About Us</a>
        <a href="index.html#contact">Contact</a>
        <div class="language-selector">
          <button class="language-btn">EN <i class="fas fa-chevron-down"></i></button>
          <div class="language-dropdown">
            <a href="#" data-lang="en">English</a>
            <a href="#" data-lang="fr">Français</a>
            <a href="#" data-lang="ar">العربية</a>
          </div>
        </div>
      </nav>
    </div>
  `;
  
  // Insert navbar into header
  document.querySelector('header').innerHTML = navbarHTML;
  
  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  navToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Language selector
  const languageBtn = document.querySelector('.language-btn');
  const languageDropdown = document.querySelector('.language-dropdown');
  
  languageBtn.addEventListener('click', function(e) {
    e.preventDefault();
    languageDropdown.classList.toggle('show');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.language-selector')) {
      languageDropdown.classList.remove('show');
    }
  });
  
  // Language selection
  const languageOptions = document.querySelectorAll('.language-dropdown a');
  
  languageOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      languageBtn.innerHTML = this.textContent + ' <i class="fas fa-chevron-down"></i>';
      languageDropdown.classList.remove('show');
      // Here you would implement actual language switching logic
      console.log('Language switched to: ' + lang);
    });
  });
  
  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || 
        (currentPage === '' && linkHref === 'index.html') ||
        (linkHref.includes('#') && currentPage === linkHref.split('#')[0])) {
      link.classList.add('active');
    }
  });
});
