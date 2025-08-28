document.addEventListener("DOMContentLoaded", function () {
  // Page Loader
  function initPageLoader() {
    window.addEventListener("load", function () {
      document.body.classList.add("page-loaded");
    });
  }
  
  // Navbar Scroll Effect
  function initNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  // Back to Top Button
  function initBackToTop() {
    const backToTop = document.getElementById("backToTop");
    function toggleBackToTop() {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Initialize all functions
  initPageLoader();
  initNavbarScroll();
  initBackToTop();
}); 