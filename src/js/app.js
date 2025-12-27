// Structured Data (JSON-LD) - Injected dynamically
function injectStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Wagner Ferreira",
    "jobTitle": "Front End Web Developer",
    "description": "Desenvolvedor Front End especializado em criação de websites modernos, responsivos e otimizados",
    "url": "https://wagnerferreira.com.br",
    "sameAs": [
      "https://www.facebook.com",
      "https://www.twitter.com",
      "https://www.linkedin.com",
      "https://www.instagram.com",
      "https://www.github.com"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "32 Getulion Myrand",
      "addressLocality": "Victoria",
      "addressRegion": "Espírito Santo",
      "addressCountry": "BR"
    },
    "email": "wagner@example.com",
    "telephone": "+55 (27) 99999-9999",
    "knowsAbout": ["Web Development", "Front End Development", "Web Design", "HTML5", "CSS3", "JavaScript", "Bootstrap", "Responsive Design", "SEO"],
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Desenvolvimento Web Front End",
        "description": "Serviços de desenvolvimento web, design e otimização de sites"
      }
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100,
  delay: 0,
  anchorPlacement: 'top-bottom',
  disable: function () {
    var maxWidth = 768;
    return window.innerWidth < maxWidth;
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Close mobile menu
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      }
    }
  });
});

// Update year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Active nav link with scroll reveal
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = '#f8f9fa';
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// Refresh AOS on window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    AOS.refresh();
  }, 250);
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Inject structured data
  injectStructuredData();

  // Lazy load images
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    images.forEach(img => {
      img.addEventListener('load', function () {
        this.classList.add('loaded');
      });
      if (img.complete) {
        img.classList.add('loaded');
      }
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
});