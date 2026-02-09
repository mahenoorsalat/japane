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
