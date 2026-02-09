// Basic interactions
document.addEventListener('DOMContentLoaded', () => {
    // Navigation buttons interaction
    // Hero Slider Logic
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    let currentSlide = 0;
    const slideIntervalTime = 3500;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance
    function startSlider() {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    if (slides.length > 0) {
        startSlider(); // Start automatically

        // Manual Navigation
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopSlider();
                nextSlide();
                startSlider(); // Restart timer
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopSlider();
                prevSlide();
                startSlider(); // Restart timer
            });
        }
    }

    // Mobile Menu Toggle (if we add one later)
    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Responsive Scaling Logic
const designWidth = 1440;
const mobileThreshold = 768; // Below this, we use fluid mobile layout instead of scaling

function applyScaling() {
    const width = window.innerWidth;
    let wrapper = document.getElementById('scaling-wrapper');

    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.id = 'scaling-wrapper';
        wrapper.style.transformOrigin = 'top left';

        const children = Array.from(document.body.childNodes);
        children.forEach(child => {
            if (child.tagName !== 'SCRIPT' && child.id !== 'scaling-wrapper') {
                wrapper.appendChild(child);
            }
        });
        document.body.appendChild(wrapper);
    }

    if (width >= mobileThreshold && width < 1280) {
        // Scaling range: Tablet to Small Desktop (768px - 1280px)
        const scale = width / designWidth;

        wrapper.style.width = `${designWidth}px`;
        wrapper.style.transform = `scale(${scale})`;

        const rect = wrapper.getBoundingClientRect();
        document.body.style.height = `${rect.height}px`;
        document.body.style.overflowX = 'hidden';

    } else if (width < mobileThreshold) {
        // Fluid Mobile Range (< 768px)
        wrapper.style.transform = '';
        wrapper.style.width = '100%';
        wrapper.style.margin = '0';
        document.body.style.height = '';
        document.body.style.overflowX = 'hidden';
    } else {
        // Desktop Range (>= 1280px)
        wrapper.style.transform = '';
        wrapper.style.width = `${designWidth}px`;
        wrapper.style.margin = '0 auto';
        wrapper.style.position = 'relative';

        document.body.style.height = '';
        if (width < 1440) {
            document.body.style.overflowX = 'auto';
        } else {
            document.body.style.overflowX = 'hidden';
        }
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.header-menu');
    const nav = document.querySelector('.header-nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('mobile-active');
            menuBtn.classList.toggle('active');
        });
    }
}

window.addEventListener('resize', applyScaling);
window.addEventListener('load', () => {
    applyScaling();
    initMobileMenu();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    applyScaling();
    initMobileMenu();
}
