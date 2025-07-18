document.addEventListener('DOMContentLoaded', function () {
  // Page loader
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 1000);

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }
  });

  // Back to top functionality
  backToTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loading animation to external links
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.addEventListener('click', function () {
      this.style.opacity = '0.7';
      setTimeout(() => {
        this.style.opacity = '1';
      }, 200);
    });
  });

  // Filter projects functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const filter = this.dataset.filter;

      // Update active state
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter projects
      projectCards.forEach((card) => {
        if (filter === 'all') {
          card.style.display = 'block';
        } else if (filter === 'featured' && card.classList.contains('featured')) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});