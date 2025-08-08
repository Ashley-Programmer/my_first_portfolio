document.addEventListener('DOMContentLoaded', function () {
    // Page loader with accessibility
    setTimeout(() => {
        document.body.classList.add('page-loaded');
        document.querySelector('.page-loader').setAttribute('aria-hidden', 'true');
    }, 800); // Reduced for faster perceived load

    // Throttle function to optimize scroll events
    function throttle(fn, wait) {
        let lastTime = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastTime >= wait) {
                lastTime = now;
                fn.apply(this, args);
            }
        };
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    const navbarToggler = document.querySelector('.navbar-toggler');

    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
    }, 100));

    // Back to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update ARIA attributes for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    // Theme toggle with smooth transition
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }

    themeToggle.addEventListener('click', () => {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        document.body.classList.toggle('light-theme');
        const isLightTheme = document.body.classList.contains('light-theme');
        themeIcon.classList.toggle('fa-sun', !isLightTheme);
        themeIcon.classList.toggle('fa-moon', isLightTheme);
        themeToggle.setAttribute('aria-label', isLightTheme ? 'Switch to dark theme' : 'Switch to light theme');
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
        // Remove transition after animation
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });

    // Enhanced mobile toggle accessibility
    navbarToggler.addEventListener('click', function () {
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
        navbarToggler.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
        if (isExpanded) {
            const firstNavLink = document.querySelector('#navbarNav .nav-link');
            if (firstNavLink) firstNavLink.focus();
        }
    });

    // Keyboard navigation for accessibility
    document.querySelectorAll('.nav-link, .btn, .social-link').forEach(element => {
        element.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });

    // Trap focus within menu when open
    const navbarNav = document.querySelector('#navbarNav');
    navbarNav.addEventListener('keydown', e => {
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
    document.addEventListener('click', e => {
        if (navbarToggler.getAttribute('aria-expanded') === 'true' && !navbar.contains(e.target) && !navbarToggler.contains(e.target)) {
            navbarToggler.click();
        }
    });

    // Lazy loading images with error handling
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src; // Fallback to src if data-src is missing
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            },
            { rootMargin: window.innerWidth < 768 ? '100px' : '200px' }
        );
        images.forEach(img => observer.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
            img.removeAttribute('data-src');
        });
    }

    // Animation on scroll for sections with stagger
    const animatedElements = document.querySelectorAll('.hero-section, .about-section, .contact-cta');
    if ('IntersectionObserver' in window) {
        const scrollObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animate-in');
                        }, index * 100); // Staggered animation
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        animatedElements.forEach(element => scrollObserver.observe(element));
    }

    // Hero section staggered animations
    const heroElements = document.querySelectorAll('.hero-section h1, .hero-section h3, .hero-section p, .hero-section .d-flex, .profile-image-container');
    if ('IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('hero-animate');
                        }, index * 150); // Staggered delay for hero elements
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        heroElements.forEach(element => heroObserver.observe(element));
    }

    // Enhanced typing animation
    const typingText = document.querySelector('.typing-text .words-typing');
    const words = ['Software Developer', 'AI Developer', 'Fullstack Developer', 'Web Designer'];
    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = '';
    let isDeleting = false;

    function type() {
        if (!typingText) return; // Early exit if element not found
        if (wordIndex >= words.length) wordIndex = 0;
        currentWord = words[wordIndex];

        typingText.textContent = currentWord.substring(0, charIndex);
        typingText.setAttribute('aria-label', `Current role: ${currentWord.substring(0, charIndex)}`);

        if (isDeleting) {
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                wordIndex++;
                setTimeout(type, 800); // Longer pause before next word
            } else {
                setTimeout(type, 80);
            }
        } else {
            charIndex++;
            if (charIndex > currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1500); // Pause at full word
            } else {
                setTimeout(type, 120); // Faster typing speed
            }
        }
    }
    type();

    // Optimized parallax effect for profile image
    const profileImage = document.querySelector('.profile-image-container');
    if (profileImage && window.innerWidth > 768) { // Disable on mobile for performance
        window.addEventListener('scroll', throttle(() => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const parallaxFactor = Math.min(scrollY / maxScroll * 0.2, 0.1); // Limit parallax movement
            profileImage.style.transform = `translateY(${scrollY * parallaxFactor}px)`;
        }, 50));
    }

    // Profile image ripple effect
    const profileImageContainer = document.querySelector('.profile-image-container');
    if (profileImageContainer) {
        profileImageContainer.setAttribute('tabindex', '0'); // Make focusable
        profileImageContainer.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        // Keyboard accessibility for ripple effect
        profileImageContainer.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const rect = profileImageContainer.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${rect.width / 2}px`;
                ripple.style.top = `${rect.height / 2}px`;
                profileImageContainer.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            }
        });
    }

    // Optimize profile image loading
    const profileImg = document.querySelector('.profile-image-container img');
    if (profileImg) {
        profileImg.setAttribute('loading', 'eager'); // Load profile image eagerly for hero section
        profileImg.addEventListener('error', () => {
            profileImg.src = 'profile_images/fallback.jpg'; // Fallback image
        });
    }

    // External link loading indication
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function () {
            this.setAttribute('aria-busy', 'true');
            setTimeout(() => {
                this.removeAttribute('aria-busy');
            }, 500);
        });
    });
});