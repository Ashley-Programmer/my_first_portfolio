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

  // Form Handling
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    clearErrors();

    // Client-side validation
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    let hasError = false;

    if (!name) {
      showError("name", "Name is required");
      hasError = true;
    }
    if (!email) {
      showError("email", "Email is required");
      hasError = true;
    } else if (!isValidEmail(email)) {
      showError("email", "Please enter a valid email address");
      hasError = true;
    }
    if (!subject) {
      showError("subject", "Subject is required");
      hasError = true;
    }
    if (!message) {
      showError("message", "Message is required");
      hasError = true;
    }

    if (hasError) return;

    submitBtn.classList.add("btn-loading");
    submitBtn.disabled = true;
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        successMessage.textContent = "Your message has been sent successfully!";
        successMessage.style.display = "block";
        form.reset();
      } else {
        const errorData = await response.json();
        errorMessage.textContent = errorData.error || "Something went wrong. Please try again.";
        errorMessage.style.display = "block";
      }
    } catch (error) {
      errorMessage.textContent = "Network error. Please try again later.";
      errorMessage.style.display = "block";
    } finally {
      submitBtn.classList.remove("btn-loading");
      submitBtn.disabled = false;
    }
  });

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(`${fieldId}-error`);
    field.classList.add("is-invalid");
    errorDiv.innerHTML = `<small class="text-danger">${message}</small>`;
  }

  function clearErrors() {
    ["name", "email", "subject", "message"].forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      const errorDiv = document.getElementById(`${fieldId}-error`);
      field.classList.remove("is-invalid");
      errorDiv.innerHTML = "";
    });
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Contact Item Animation
  const contactItems = document.querySelectorAll(".contact-form-card, .contact-info-item");
  function animateContactItems() {
    contactItems.forEach((item, index) => {
      item.style.setProperty("--delay", index);
      item.classList.add("animate");
    });
  }

  // Intersection Observer for Contact Items
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateContactItems();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    document.querySelectorAll(".contact-content").forEach((section) => observer.observe(section));
  } else {
    // Fallback for Older Browsers
    animateContactItems();
  }
});