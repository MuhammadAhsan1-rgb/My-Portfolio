// ============================================================
//  script.js — Muhammad Ahsan Portfolio
//  Interactions: Cursor glow, theme toggle, smooth scroll,
//  mobile menu, scroll reveals
// ============================================================

(function() {
  // ----- Cursor Glow (with touch device detection) -----
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  function animateCursor() {
    if (!cursorGlow) return;
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  animateCursor();

  // Hide cursor glow on touch devices
  if ('ontouchstart' in window) {
    document.addEventListener('touchstart', () => {
      if (cursorGlow) cursorGlow.style.display = 'none';
    }, { once: true });
  }

  // ----- Theme Toggle (dark/light) -----
  const htmlTag = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'ma_portfolio_theme';

  function applyTheme(theme) {
    htmlTag.setAttribute('data-theme', theme);
    themeToggle.classList.toggle('is-light', theme === 'light');
    localStorage.setItem(STORAGE_KEY, theme);
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY) || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = htmlTag.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ----- Navbar Shadow on Scroll -----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // ----- Smooth Scroll for Anchor Links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMobileMenu();
    });
  });

  // ----- Active Nav Link Highlighting -----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  // ----- Mobile Menu (Hamburger) -----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.mob-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) closeMobileMenu();
    });
  }

  // ----- Scroll Reveal: Skill Cards -----
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  skillCards.forEach(card => skillObserver.observe(card));

  // ----- Scroll Reveal: Contact Cards -----
  const contactCards = document.querySelectorAll('.contact-card');
  const contactObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 90);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  contactCards.forEach(card => contactObserver.observe(card));

  // ----- Hero Text Stagger (ensure animations run) -----
  const revealLines = document.querySelectorAll('.reveal-line');
  revealLines.forEach((el, i) => {
    el.style.animationDelay = `${0.1 + i * 0.15}s`;
  });
})();