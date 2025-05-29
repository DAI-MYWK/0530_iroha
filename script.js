// NO LIMIT COLOR! - Interactive JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  // Paint Splash Animation on Scroll
  const paintSplashes = document.querySelectorAll(".paint-splash");
  const paintDrips = document.querySelectorAll(".paint-drip");

  function animatePaintElements() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    paintSplashes.forEach((splash, index) => {
      const speed = 0.5 + index * 0.2;
      const yPos = -(scrollY * speed);
      splash.style.transform = `translateY(${yPos}px) rotate(${
        45 + scrollY * 0.1
      }deg)`;
    });

    paintDrips.forEach((drip, index) => {
      const speed = 0.3 + index * 0.1;
      const yPos = scrollY * speed;
      drip.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".service-card, .reason-item, .timeline-item, .work-item")
    .forEach((el) => {
      observer.observe(el);
    });

  // Dynamic Paint Brush Cursor Effect
  let paintBrush = null;

  function createPaintBrush() {
    paintBrush = document.createElement("div");
    paintBrush.className = "paint-brush-cursor";
    paintBrush.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #FF2D2D, #0070FF);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            mix-blend-mode: multiply;
        `;
    document.body.appendChild(paintBrush);
  }

  function updatePaintBrush(e) {
    if (paintBrush) {
      paintBrush.style.left = e.clientX - 10 + "px";
      paintBrush.style.top = e.clientY - 10 + "px";
    }
  }

  // CTA Button Paint Drip Effect
  document.querySelectorAll(".cta-button").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      if (paintBrush) paintBrush.style.opacity = "0.7";

      // Create paint drip effect
      const drip = document.createElement("div");
      drip.style.cssText = `
                position: absolute;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                width: 10px;
                height: 0;
                background: linear-gradient(180deg, currentColor, transparent);
                animation: paint-drip 1s ease-out forwards;
                pointer-events: none;
            `;

      this.appendChild(drip);

      setTimeout(() => {
        if (drip.parentNode) drip.parentNode.removeChild(drip);
      }, 1000);
    });

    button.addEventListener("mouseleave", function () {
      if (paintBrush) paintBrush.style.opacity = "0";
    });
  });

  // Service Cards Color Animation
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const color = this.dataset.color;
      this.style.borderTop = `5px solid ${color}`;
      this.style.transform = "translateY(-10px) rotate(2deg) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.borderTop = "none";
      this.style.transform = "translateY(0) rotate(0deg) scale(1)";
    });
  });

  // Parallax Effect for Background Elements
  function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(
      ".section-bg, .brush-stroke-bg, .giant-brush-bg"
    );

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Paint Splash Creation on Click
  function createClickSplash(e) {
    const splash = document.createElement("div");
    const colors = ["#FF2D2D", "#0070FF", "#00C07B", "#FF9800"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    splash.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            background: ${randomColor};
            border-radius: 50% 20% 50% 20%;
            pointer-events: none;
            z-index: 1000;
            left: ${e.clientX - 15}px;
            top: ${e.clientY - 15}px;
            animation: splash-expand 0.6s ease-out forwards;
        `;

    document.body.appendChild(splash);

    setTimeout(() => {
      if (splash.parentNode) splash.parentNode.removeChild(splash);
    }, 600);
  }

  // Character Animation on Scroll
  function animateCharacters() {
    const characters = document.querySelectorAll(".character");
    const scrollPercent =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);

    characters.forEach((character, index) => {
      const bounce = Math.sin(Date.now() * 0.003 + index) * 10;
      const rotation = Math.sin(Date.now() * 0.002 + index) * 5;
      character.style.transform = `translateY(${bounce}px) rotate(${rotation}deg)`;
    });
  }

  // Neon Text Effect for Works Section
  function animateNeonText() {
    const neonTitle = document.querySelector(".section-title.neon");
    if (neonTitle) {
      const intensity = Math.sin(Date.now() * 0.005) * 0.5 + 0.5;
      neonTitle.style.textShadow = `
                0 0 ${20 + intensity * 20}px #FFE600,
                0 0 ${40 + intensity * 40}px #FFE600,
                0 0 ${60 + intensity * 60}px #FFE600
            `;
    }
  }

  // Initialize paint brush cursor
  createPaintBrush();

  // Event Listeners
  window.addEventListener("scroll", () => {
    animatePaintElements();
    parallaxEffect();
    requestAnimationFrame(animateCharacters);
  });

  window.addEventListener("mousemove", updatePaintBrush);

  document.addEventListener("click", createClickSplash);

  // Continuous animations
  setInterval(animateNeonText, 100);

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes paint-drip {
            to {
                height: 20px;
                opacity: 0;
            }
        }
        
        @keyframes splash-expand {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(3) rotate(180deg);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(255, 230, 0, 0.98);
            padding: 2rem;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
  document.head.appendChild(style);

  // Loading Animation
  window.addEventListener("load", () => {
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
      heroTitle.style.animation = "none";
      heroTitle.offsetHeight; // Trigger reflow
      heroTitle.style.animation = "titleReveal 2s ease-out forwards";
    }
  });

  // Add title reveal animation
  const titleStyle = document.createElement("style");
  titleStyle.textContent = `
        @keyframes titleReveal {
            0% {
                opacity: 0;
                transform: scale(0.8) rotate(-5deg);
            }
            50% {
                transform: scale(1.1) rotate(2deg);
            }
            100% {
                opacity: 1;
                transform: scale(1) rotate(0deg);
            }
        }
    `;
  document.head.appendChild(titleStyle);

  console.log("🎨 NO LIMIT COLOR! - Website loaded with maximum energy! 🚀");
});
