// main.js

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('[data-reveal="true"]');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // 1. Scroll reveal animation
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (prefersReducedMotion.matches) {
                        entry.target.style.transition = 'none';
                    }
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        // Fallback: show everything
        revealElements.forEach((el) => el.classList.add('revealed'));
    }

    // 2. Mobile menu toggle
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);

            if (isExpanded) {
                mobileNav.classList.add('hidden');
                mobileNav.classList.remove('flex');
            } else {
                mobileNav.classList.remove('hidden');
                mobileNav.classList.add('flex');
            }
        });

        // Close mobile menu on link click
        mobileNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('hidden');
                mobileNav.classList.remove('flex');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
