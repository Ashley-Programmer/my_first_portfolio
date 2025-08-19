/**
 * Initializes the page loader with accessibility considerations.
 */
function initPageLoader() {
  setTimeout(() => {
    document.body.classList.add("page-loaded");
    const loader = document.querySelector(".page-loader");
    if (loader) loader.setAttribute("aria-hidden", "true");
  }, 800);
}

/**
 * Throttles a function to limit its execution rate.
 * @param {Function} fn - The function to throttle.
 * @param {number} wait - The throttle wait time in milliseconds.
 * @returns {Function} The throttled function.
 */
function throttle(fn, wait) {
  let lastTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Handles navbar scroll effects and back-to-top button visibility.
 */
function initScrollEffects() {
  const navbar = document.querySelector(".navbar");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener(
    "scroll",
    throttle(() => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
        backToTop.classList.add("show");
      } else {
        navbar.classList.remove("scrolled");
        backToTop.classList.remove("show");
      }
    }, 100)
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Enables smooth scrolling for anchor links.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * Enhances mobile navigation accessibility.
 */
function initMobileNav() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarNav = document.querySelector("#navbarNav");

  navbarToggler.addEventListener("click", () => {
    const isExpanded = navbarToggler.getAttribute("aria-expanded") === "true";
    navbarToggler.setAttribute(
      "aria-label",
      isExpanded ? "Open navigation menu" : "Close navigation menu"
    );
    if (isExpanded) {
      const firstNavLink = document.querySelector("#navbarNav .nav-link");
      if (firstNavLink) firstNavLink.focus();
    }
  });

  // Trap focus within menu
  navbarNav.addEventListener("keydown", (e) => {
    if (navbarToggler.getAttribute("aria-expanded") === "true") {
      const focusableElements = navbarNav.querySelectorAll("a.nav-link");
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      } else if (e.key === "Escape") {
        navbarToggler.click();
        navbarToggler.focus();
      }
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navbarToggler.getAttribute("aria-expanded") === "true" &&
      !navbarNav.contains(e.target) &&
      !navbarToggler.contains(e.target)
    ) {
      navbarToggler.click();
    }
  });
}

/**
 * Adds keyboard navigation support for interactive elements.
 */
function initKeyboardNav() {
  document.querySelectorAll(".nav-link, .btn, .social-link").forEach((element) => {
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        element.click();
      }
    });
  });
}

/**
 * Initializes typing animation for hero section.
 */
function initTypingAnimation() {
  const typingText = document.querySelector(".typing-text .words-typing");
  if (!typingText) return;

  const words = ["Software Development", "AI Development", "Fullstack Development", "Web Development"];
  let wordIndex = 0;
  let charIndex = 0;
  let currentWord = "";
  let isDeleting = false;

  function type() {
    if (wordIndex >= words.length) wordIndex = 0;
    currentWord = words[wordIndex];

    typingText.textContent = currentWord.substring(0, charIndex);
    typingText.setAttribute("aria-label", `Current role: ${currentWord.substring(0, charIndex)}`);

    if (isDeleting) {
      charIndex--;
      if (charIndex < 0) {
        isDeleting = false;
        wordIndex++;
        setTimeout(type, 800);
      } else {
        setTimeout(type, 80);
      }
    } else {
      charIndex++;
      if (charIndex > currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1500);
      } else {
        setTimeout(type, 120);
      }
    }
  }
  type();
}

/**
 * Initializes particles.js for hero section background.
 */
function initParticles() {
  if (!document.getElementById("particles-js")) return;

  particlesJS("particles-js", {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: "#3b82f6" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
      size: { value: 3, random: true, anim: { enable: true, speed: 5, size_min: 0.1 } },
      line_linked: { enable: true, distance: 150, color: "#3b82f6", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 4, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
}

/**
 * Initializes profile image ripple effect and accessibility.
 */
function initProfileImage() {
  const profileImageContainer = document.querySelector(".profile-image-container");
  if (!profileImageContainer) return;

  profileImageContainer.setAttribute("tabindex", "0");

  const createRipple = (e, isKeyboard = false) => {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = profileImageContainer.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = isKeyboard ? `${rect.width / 2}px` : `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = isKeyboard ? `${rect.height / 2}px` : `${e.clientY - rect.top - size / 2}px`;
    profileImageContainer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  profileImageContainer.addEventListener("click", (e) => createRipple(e));
  profileImageContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      createRipple(e, true);
    }
  });

  const profileImg = profileImageContainer.querySelector("img");
  if (profileImg) {
    profileImg.setAttribute("loading", "eager");
    profileImg.addEventListener("error", () => {
      profileImg.src = "profile_images/fallback.jpg";
    });
  }
}

/**
 * Initializes active navigation state based on current page.
 */
function initActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link, .footer-links a");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Main initialization function.
 */
document.addEventListener("DOMContentLoaded", () => {
  initPageLoader();
  initScrollEffects();
  initSmoothScroll();
  initMobileNav();
  initKeyboardNav();
  initTypingAnimation();
  initParticles();
  initProfileImage();
  initActiveNav();
});