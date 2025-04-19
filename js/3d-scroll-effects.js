// Creative 3D scrolling effects for ORSA GROUP website
document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  // Function to check if device supports 3D effects
  function supportsAdvancedEffects() {
    // Check for mobile devices with potentially lower performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return !isMobile || window.innerWidth >= 768;
  }
  
  // Initialize 3D scroll effects
  function init3DScrollEffects() {
    // Clear any existing animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Add perspective to body for 3D effects
    document.body.style.perspective = '1000px';
    document.body.style.overflowX = 'hidden';
    
    // Hero section parallax and 3D effects
    const heroContent = document.querySelector('.hero-content');
    const heroSection = document.querySelector('.hero');
    const scrollDown = document.querySelector('.scroll-down');
    
    if (heroContent && heroSection) {
      // Create 3D parallax effect for hero section
      gsap.to(heroSection, {
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        backgroundPosition: `50% ${window.innerHeight / 2}px`,
        ease: "none"
      });
      
      // 3D rotation effect for hero content
      gsap.to(heroContent, {
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        rotationX: 10,
        y: 100,
        opacity: 0,
        ease: "power1.inOut"
      });
      
      // Enhance scroll down indicator
      if (scrollDown) {
        gsap.to(scrollDown, {
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "25% top",
            scrub: true
          },
          opacity: 0,
          y: 50,
          ease: "power2.in"
        });
      }
    }
    
    // About section 3D effects
    const aboutContainer = document.querySelector('.about-container');
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    
    if (aboutContainer && aboutImage && aboutContent) {
      // Create 3D card effect for about section
      gsap.set(aboutContainer, { transformStyle: "preserve-3d" });
      
      // 3D rotation for about image
      gsap.from(aboutImage, {
        scrollTrigger: {
          trigger: '.about-section',
          start: "top 80%",
          end: "center center",
          scrub: 1
        },
        rotationY: 25,
        x: -100,
        opacity: 0,
        transformOrigin: "left center",
        ease: "power2.out"
      });
      
      // 3D rotation for about content
      gsap.from(aboutContent, {
        scrollTrigger: {
          trigger: '.about-section',
          start: "top 80%",
          end: "center center",
          scrub: 1
        },
        rotationY: -25,
        x: 100,
        opacity: 0,
        transformOrigin: "right center",
        ease: "power2.out"
      });
      
      // Add hover effect to about image
      aboutImage.addEventListener('mouseenter', function() {
        gsap.to(this, { rotationY: 5, scale: 1.05, duration: 0.5 });
      });
      
      aboutImage.addEventListener('mouseleave', function() {
        gsap.to(this, { rotationY: 0, scale: 1, duration: 0.5 });
      });
    }
    
    // Contact section 3D effects
    const contactContainer = document.querySelector('.contact-container');
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    if (contactContainer && contactInfo && contactForm) {
      // Create 3D card effect for contact section
      gsap.set(contactContainer, { transformStyle: "preserve-3d" });
      
      // 3D rotation for contact info
      gsap.from(contactInfo, {
        scrollTrigger: {
          trigger: '.contact-section',
          start: "top 80%",
          end: "center center",
          scrub: 1
        },
        rotationX: 20,
        y: 100,
        opacity: 0,
        transformOrigin: "bottom center",
        ease: "power2.out"
      });
      
      // 3D rotation for contact form
      gsap.from(contactForm, {
        scrollTrigger: {
          trigger: '.contact-section',
          start: "top 80%",
          end: "center center",
          scrub: 1
        },
        rotationX: 20,
        y: 100,
        opacity: 0,
        transformOrigin: "bottom center",
        ease: "power2.out",
        delay: 0.2
      });
    }
    
    // 3D floating effect for cards
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
      cards.forEach((card, index) => {
        // Set initial transform style
        gsap.set(card, { transformStyle: "preserve-3d" });
        
        // Create scroll animation
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "bottom center",
            scrub: 1
          },
          rotationY: -15 + (index % 3) * 15,
          rotationX: 15,
          y: 100,
          opacity: 0,
          transformOrigin: "center center",
          ease: "power2.out"
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
          gsap.to(this, { 
            rotationY: 5, 
            rotationX: -5, 
            scale: 1.05, 
            boxShadow: "0 15px 30px rgba(0,0,0,0.2)", 
            duration: 0.5 
          });
        });
        
        card.addEventListener('mouseleave', function() {
          gsap.to(this, { 
            rotationY: 0, 
            rotationX: 0, 
            scale: 1, 
            boxShadow: "0 0 10px rgba(0,0,0,0.2)", 
            duration: 0.5 
          });
        });
      });
    }
    
    // Create 3D parallax effect for background sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (section.classList.contains('hero')) return; // Skip hero section as it's already handled
      
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        backgroundPosition: `50% ${window.innerHeight / 10}px`,
        ease: "none"
      });
    });
    
    // Add 3D effect to navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      gsap.from(navbar, {
        scrollTrigger: {
          trigger: 'body',
          start: "top top",
          end: "100px top",
          scrub: true
        },
        y: -20,
        opacity: 0.8,
        ease: "power1.out"
      });
      
      // Add depth to navbar on scroll
      gsap.to(navbar, {
        scrollTrigger: {
          trigger: 'body',
          start: "top -50px",
          end: "100px top",
          scrub: true
        },
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        backgroundColor: "rgba(0,0,0,0.9)",
        ease: "none"
      });
    }
    
    // Add 3D effect to back-to-top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      gsap.set(backToTop, { transformStyle: "preserve-3d" });
      
      gsap.from(backToTop, {
        scrollTrigger: {
          trigger: 'body',
          start: "top -300px",
          toggleActions: "play none none reverse"
        },
        rotationY: 180,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
      
      // Add hover effect
      backToTop.addEventListener('mouseenter', function() {
        gsap.to(this, { rotationY: 10, scale: 1.1, duration: 0.3 });
      });
      
      backToTop.addEventListener('mouseleave', function() {
        gsap.to(this, { rotationY: 0, scale: 1, duration: 0.3 });
      });
    }
  }
  
  // Initialize based on device capability
  if (supportsAdvancedEffects()) {
    init3DScrollEffects();
    
    // Reinitialize on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        init3DScrollEffects();
      }, 250);
    });
  } else {
    // Fallback to simpler animations for devices that might struggle with 3D
    console.log("Device may not support advanced 3D effects, using fallback animations");
    
    // Load the simpler scroll animation script
    const fallbackScript = document.createElement('script');
    fallbackScript.src = 'js/scroll-animation.js';
    document.head.appendChild(fallbackScript);
  }
});
