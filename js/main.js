/**
 * Eurolab Landing Page - Main JavaScript
 * Handles animations, interactions, and scroll effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initScrollAnimations();
    initMarquee();
    initSmoothScroll();
});

/**
 * Header scroll effect - adds background on scroll
 */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    const scrollThreshold = 50;

    const updateHeader = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    };

    // Initial check
    updateHeader();

    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (!animatedElements.length) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        animatedElements.forEach(el => {
            el.style.opacity = '1';
        });
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on data-delay attribute or index
                const delay = entry.target.dataset.delay || index * 100;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Initialize infinite logo marquee
 */
function initMarquee() {
    const marqueeTrack = document.querySelector('.logo-marquee__track');
    if (!marqueeTrack) return;

    // Clone items for seamless infinite scroll
    const items = marqueeTrack.querySelectorAll('.logo-marquee__item');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        marqueeTrack.appendChild(clone);
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * WhatsApp link handler - opens WhatsApp with pre-filled message
 */
function openWhatsApp(phone, message) {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Expose to global scope for onclick handlers
window.openWhatsApp = openWhatsApp;
