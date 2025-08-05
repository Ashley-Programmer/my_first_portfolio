document.addEventListener('DOMContentLoaded', function () {
    // Page loader
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 1000);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    const navbarToggler = document.querySelector('.navbar-toggler');

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
            behavior: 'smooth',
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
                    block: 'start',
                });
            }
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');
        const isLightTheme = document.body.classList.contains('light-theme');
        themeIcon.classList.toggle('fa-sun', !isLightTheme);
        themeIcon.classList.toggle('fa-moon', isLightTheme);
        themeToggle.setAttribute('aria-label', isLightTheme ? 'Switch to dark theme' : 'Switch to light theme');
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    });

    // Enhanced mobile toggle accessibility
    navbarToggler.addEventListener('click', function () {
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
        navbarToggler.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');

        // Focus management: Move focus to first nav link when menu opens
        if (isExpanded) {
            const firstNavLink = document.querySelector('#navbarNav .nav-link');
            if (firstNavLink) {
                firstNavLink.focus();
            }
        }
    });

    // Keyboard navigation for accessibility
    document.querySelectorAll('.nav-link, .btn, .social-link').forEach((element) => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });

    // Trap focus within menu when open
    const navbarNav = document.querySelector('#navbarNav');
    navbarNav.addEventListener('keydown', (e) => {
        if (navbarToggler.getAttribute('aria-expanded') === 'true') {
            const focusableElements = navbarNav.querySelectorAll('a.nav-link, button.nav-link');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            } else if (e.key === 'Escape') {
                navbarToggler.click();
                navbarToggler.focus();
            }
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navbarToggler.getAttribute('aria-expanded') === 'true' && !navbar.contains(e.target) && !navbarToggler.contains(e.target)) {
            navbarToggler.click();
        }
    });

    // Lazy loading images
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        },
        { rootMargin: window.innerWidth < 768 ? '100px' : '200px' }
    );

    images.forEach((img) => observer.observe(img));

    // Animation on scroll for sections
    const animatedElements = document.querySelectorAll('.hero-section, .about-section, .contact-cta');
    const scrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        },
        { threshold: 0.1 }
    );

    animatedElements.forEach((element) => scrollObserver.observe(element));

    // Hero section specific animations
    const heroElements = document.querySelectorAll('.hero-section h1, .hero-section h3, .hero-section p, .hero-section .d-flex, .profile-image-container');
    const heroObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('hero-animate');
                }
            });
        },
        { threshold: 0.3, rootMargin: '0px' }
    );
    heroElements.forEach((element) => heroObserver.observe(element));

    // typing animation with accessibility
    const typingText = document.querySelector('.typing-text');
    const words = ['Software Developer', 'AI Developer', 'Fullstack Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = '';
    let isDeleting = false;

    function type() {
        if (wordIndex >= words.length) wordIndex = 0;
        currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex);
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                wordIndex++;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 100);
            }

        } else {
            typingText.textContent = currentWord.substring(0, charIndex);
            charIndex++;
            if (charIndex > currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        }
        // update aria-label for screen readers
        typingText.setAttribute('aria-label', `Currently role: ${typingText.textContent}`);
    }
    type();

    // Parallax effect for profile image
    const profileImage = document.querySelector('.profile-image-container');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        profileImage.style.transform = `translateY(${scrollY * 0.1}px) scale(1.05)`;
    });

    // Optimize profile image loading
    const profileImg = document.querySelector('.profile-image-container img');
    if (profileImg) {
        profileImg.setAttribute('loading', 'lazy');
    }

    // Remove loading animation for external links
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        link.addEventListener('click', function () {
            this.setAttribute('aria-busy', 'true');
            setTimeout(() => {
                this.removeAttribute('aria-busy');
            }, 200);
        });
    });
});