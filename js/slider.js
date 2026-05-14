// ============================================
// HERO SLIDER FUNCTIONALITY
// ============================================

let currentSlide = 0;
const slides = [];
let autoSlideTimer;

document.addEventListener('DOMContentLoaded', () => {
    initializeSlider();
});

function initializeSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderDotsContainer = document.getElementById('slider-dots');
    
    if (!sliderContainer) return;

    // Get all slides
    const slideElements = sliderContainer.querySelectorAll('.slide');
    
    if (slideElements.length === 0) return;

    // Create dots
    slideElements.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        sliderDotsContainer.appendChild(dot);
    });

    // Add event listeners to buttons
    document.getElementById('prev-slide')?.addEventListener('click', prevSlide);
    document.getElementById('next-slide')?.addEventListener('click', nextSlide);

    // Start auto-slide
    startAutoSlide();

    // Pause on hover
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
    resetAutoSlide();
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}
