document.addEventListener("DOMContentLoaded", function () {
  // Page Loader
  window.addEventListener("load", function () {
    document.body.classList.add("page-loaded");
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  function handleScroll() {
    if (window.scrollY > 100) {
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

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add Loading Animation to External Links
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.addEventListener("click", function () {
      this.style.opacity = "0.7";
      setTimeout(() => {
        this.style.opacity = "1";
      }, 200);
    });
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

  // Apply Saved Theme
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    themeToggle.innerHTML = '<i class="fas fa-moon theme-icon"></i>'; // Moon for light mode
  } else {
    themeToggle.innerHTML = '<i class="fas fa-sun theme-icon"></i>'; // Sun for dark mode
  }

  // Filter Projects Functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.dataset.filter;

      // Update Active State
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter Projects
      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block";
        } else if (filter === "featured" && card.classList.contains("featured")) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Project Item Animation
  const projectItems = document.querySelectorAll(".project-item");
  function animateProjectItems() {
    projectItems.forEach((item, index) => {
      item.style.setProperty("--delay", index);
      item.classList.add("animate");
    });
  }

  // Intersection Observer for Project Items
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateProjectItems();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    document.querySelectorAll(".py-5").forEach((section) => observer.observe(section));
  } else {
    // Fallback for Older Browsers
    animateProjectItems();
  }
});