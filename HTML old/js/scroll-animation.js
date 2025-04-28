// Responsive scrolling animation for index page
document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  // Function to handle responsive animations based on screen size
  function initScrollAnimations() {
    // Clear any existing animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Hero section parallax effect
    gsap.to('.hero', {
      backgroundPosition: `50% ${window.innerHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
        trigger: '.hero',
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    // About section animations
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: "top 80%",
        end: "center center",
        scrub: 1
      }
    });
    
    // Adjust animation based on screen size
    if (window.innerWidth > 768) {
      // Desktop animations
      aboutTl.from('.about-image', {
        x: -100,
        opacity: 0,
        duration: 1
      })
      .from('.about-content', {
        x: 100,
        opacity: 0,
        duration: 1
      }, "-=1");
    } else {
      // Mobile animations
      aboutTl.from('.about-image', {
        y: 50,
        opacity: 0,
        duration: 1
      })
      .from('.about-content', {
        y: 50,
        opacity: 0,
        duration: 1
      }, "-=0.5");
    }
    
    // Contact section animations
    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-section',
        start: "top 80%",
        end: "center center",
        scrub: 1
      }
    });
    
    contactTl.from('.contact-info', {
      y: 50,
      opacity: 0,
      duration: 1
    })
    .from('.contact-form', {
      y: 50,
      opacity: 0,
      duration: 1
    }, "-=0.5");
    
    // Animate back to top button
    gsap.from('.back-to-top', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: 'body',
        start: "top -300px",
        toggleActions: "play none none reverse"
      }
    });
    
    // Navbar background change on scroll
    gsap.to('.navbar', {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      scrollTrigger: {
        trigger: 'body',
        start: "top -50px",
        toggleActions: "play none none reverse"
      }
    });
  }
  
  // Initialize animations
  initScrollAnimations();
  
  // Reinitialize on window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      initScrollAnimations();
    }, 250);
  });
});
