// Mobile navigation script for ORSA GROUP website
document.addEventListener('DOMContentLoaded', function() {
  // Create mobile menu toggle button
  const navbar = document.querySelector('.navbar');
  const mobileMenuToggle = document.createElement('div');
  mobileMenuToggle.className = 'mobile-menu-toggle';
  mobileMenuToggle.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  mobileMenuToggle.style.display = 'none';
  navbar.appendChild(mobileMenuToggle);
  
  // Get navigation links
  const allLinks = document.querySelector('.all-links');
  
  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    allLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.all-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        mobileMenuToggle.classList.remove('active');
        allLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  });
  
  // Handle window resize
  function handleResize() {
    if (window.innerWidth <= 768) {
      mobileMenuToggle.style.display = 'flex';
    } else {
      mobileMenuToggle.style.display = 'none';
      mobileMenuToggle.classList.remove('active');
      allLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }
  
  // Initial check
  handleResize();
  
  // Listen for window resize
  window.addEventListener('resize', handleResize);
});
