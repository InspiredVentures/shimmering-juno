
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.presentation-container');
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.querySelector('.deck-progress');
    let currentSlideIndex = 0;
    let isScrolling = false;

    // Helper to scroll to specific slide
    function scrollToSlide(index) {
        if (index < 0 || index >= slides.length) return;

        isScrolling = true;
        currentSlideIndex = index;

        slides[index].scrollIntoView({ behavior: 'smooth' });

        // Update Active State
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active'); // Trigger animations

        // Update Progress Bar
        const progress = ((index + 1) / slides.length) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;

        setTimeout(() => {
            isScrolling = false;
        }, 800); // Debounce
    }

    // Initial Trigger
    scrollToSlide(0);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (isScrolling) return;

        switch (e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                scrollToSlide(currentSlideIndex + 1);
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
            case 'PageUp':
                e.preventDefault();
                scrollToSlide(currentSlideIndex - 1);
                break;
            case 'Home':
                scrollToSlide(0);
                break;
            case 'End':
                scrollToSlide(slides.length - 1);
                break;
        }
    });

    // Button Controls
    document.getElementById('deck-next')?.addEventListener('click', () => scrollToSlide(currentSlideIndex + 1));
    document.getElementById('deck-prev')?.addEventListener('click', () => scrollToSlide(currentSlideIndex - 1));

    // Intersection Observer to track active slide if user manually scrolls
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find index
                const index = Array.from(slides).indexOf(entry.target);
                if (index !== -1 && !isScrolling) {
                    currentSlideIndex = index;
                    slides.forEach(s => s.classList.remove('active'));
                    entry.target.classList.add('active');

                    const progress = ((index + 1) / slides.length) * 100;
                    if (progressBar) progressBar.style.width = `${progress}%`;
                }
            }
        });
    }, { threshold: 0.5 });

    slides.forEach(slide => observer.observe(slide));
});
