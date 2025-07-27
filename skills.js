document.addEventListener("DOMContentLoaded", function () {
  // Page Loader
  window.addEventListener("load", function () {
    document.body.classList.add("page-loaded");
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Back to Top Button
  const backToTop = document.getElementById("backToTop");
  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Theme Toggle
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = '<i class="fas fa-sun theme-icon"></i>'; // Default to sun (dark mode)
  document.querySelector(".navbar-nav").appendChild(themeToggle);

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
    localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
    themeToggle.innerHTML = document.body.classList.contains("light-theme") ? '<i class="fas fa-moon theme-icon"></i>' : '<i class="fas fa-sun theme-icon"></i>';
  });

  // Apply saved theme
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    themeToggle.innerHTML = '<i class="fas fa-moon theme-icon"></i>'; // Moon for light mode
  } else {
    themeToggle.innerHTML = '<i class="fas fa-sun theme-icon"></i>'; // Sun for dark mode
  }

  // Progress Bar Animation
  const progressBars = document.querySelectorAll(".progress-bar");
  function animateProgressBars() {
    progressBars.forEach((bar, index) => {
      const width = bar.getAttribute("aria-valuenow") + "%";
      bar.style.setProperty("--progress-width", width);
      bar.style.animation = `progressFill 1.5s ease-out ${index * 0.2}s forwards`;
    });
  }

  // Intersection Observer for Progress Bars
  const skillSections = document.querySelectorAll(".py-5");
  const observerOptions = {
    root: null,
    threshold: 0.1,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgressBars();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  skillSections.forEach((section) => observer.observe(section));

  // Tech Badge Animation
  const techBadges = document.querySelectorAll(".tech-badge");
  techBadges.forEach((badge, index) => {
    badge.style.setProperty("--delay", index);
  });
});