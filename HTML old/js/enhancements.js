// Enhanced functionality for ORSA GROUP website

// Preloader
document.addEventListener('DOMContentLoaded', function() {
  // Add preloader to body
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(preloader);
  
  // Hide preloader when page is loaded
  window.addEventListener('load', function() {
    preloader.classList.add('fade-out');
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 500);
  });
  
  // Initialize animations
  initAnimations();
  
  // Initialize back to top button
  initBackToTop();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize image lightbox
  initImageLightbox();
  
  // Initialize form validation
  initFormValidation();
});

// Initialize animations
function initAnimations() {
  // Add fade-in class to elements
  const fadeElements = document.querySelectorAll('.section');
  fadeElements.forEach(element => {
    element.classList.add('fade-in');
  });
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe fade-in elements
  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Initialize back to top button
function initBackToTop() {
  // Create back to top button
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTop);
  
  // Show/hide back to top button
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  // Scroll to top when clicked
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize smooth scrolling
function initSmoothScrolling() {
  // Get all links with hash
  const links = document.querySelectorAll('a[href*="#"]:not([href="#"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default if link is to the same page
      const href = this.getAttribute('href');
      const isInternalLink = href.startsWith('#') || 
                            (href.includes('#') && href.split('#')[0] === window.location.pathname.split('/').pop());
      
      if (isInternalLink) {
        e.preventDefault();
        
        // Get target element
        const targetId = href.includes('#') ? href.split('#')[1] : href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Close mobile menu if open
          const navLinks = document.querySelector('.nav-links');
          const navToggle = document.querySelector('.nav-toggle');
          if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
          }
          
          // Scroll to target
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Initialize image lightbox
function initImageLightbox() {
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img src="" alt="Lightbox Image" class="lightbox-image">
      <span class="lightbox-close">&times;</span>
    </div>
  `;
  document.body.appendChild(lightbox);
  
  // Add lightbox styles
  const style = document.createElement('style');
  style.textContent = `
    .lightbox {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      z-index: 9999;
      justify-content: center;
      align-items: center;
    }
    .lightbox.active {
      display: flex;
    }
    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
    }
    .lightbox-image {
      max-width: 100%;
      max-height: 90vh;
      border: 5px solid white;
      border-radius: 5px;
    }
    .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      color: white;
      font-size: 30px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
  
  // Get lightbox elements
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  
  // Add click event to product images
  const productImages = document.querySelectorAll('.product-gallery img');
  productImages.forEach(image => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', function() {
      lightboxImage.src = this.src;
      lightbox.classList.add('active');
    });
  });
  
  // Close lightbox when clicking close button
  lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
  });
  
  // Close lightbox when clicking outside image
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
}

// Initialize form validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let isValid = true;
      
      // Get all required inputs
      const requiredInputs = form.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        // Remove existing error messages
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
          existingError.remove();
        }
        
        // Check if input is empty
        if (!input.value.trim()) {
          isValid = false;
          
          // Add error message
          const errorMessage = document.createElement('div');
          errorMessage.className = 'error-message';
          errorMessage.textContent = 'This field is required';
          errorMessage.style.color = 'red';
          errorMessage.style.fontSize = '0.8rem';
          errorMessage.style.marginTop = '5px';
          
          input.parentElement.appendChild(errorMessage);
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = '';
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Please enter a valid email address';
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.8rem';
            errorMessage.style.marginTop = '5px';
            
            input.parentElement.appendChild(errorMessage);
            input.style.borderColor = 'red';
          }
        }
      });
      
      // Prevent form submission if not valid
      if (!isValid) {
        e.preventDefault();
      }
    });
  });
}
