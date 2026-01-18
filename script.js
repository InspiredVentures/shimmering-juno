console.log("Seven Summits loaded.");

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('is-active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Mobile Menu
const menuToggle = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navLinks.classList.toggle('active');
    });
}

// Animations on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (modal) {
            // Open Modal
            openModalBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // Check if it's the register button specifically
                    if (btn.textContent.toLowerCase().includes('register') || btn.getAttribute('href') === '#register' || btn.textContent.toLowerCase().includes('claim') || btn.textContent.toLowerCase().includes('book')) {
                        e.preventDefault();
                        modal.classList.add('active');
                    }
                });
            });

            // Close Modal
            closeModalBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });

            // Close on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }

        // Accordion Logic
        const accordions = document.querySelectorAll('.accordion-header');

        accordions.forEach(acc => {
            acc.addEventListener('click', function () {
                this.classList.toggle('active');
                const content = this.nextElementSibling;

                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    // Optional: Close other accordions
                    accordions.forEach(otherAcc => {
                        if (otherAcc !== this) {
                            otherAcc.classList.remove('active');
                            otherAcc.nextElementSibling.style.maxHeight = null;
                        }
                    });

                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });

        // Scroll Video Autoplay
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.scroll-play-video').forEach(video => {
            videoObserver.observe(video);
        });

        // Scroll Reveal Logic
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optional: Stop observing once revealed
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        // Auto-tag elements for reveal
        document.querySelectorAll('section h2, section p, .grid-2 > div, .grid-3 > div, .accordion-item').forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });

        // Parallax Effect
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            document.querySelectorAll('.hero, header[style*="background"]').forEach(hero => {
                // Simple parallax: move background at half speed
                // Check if element is in view to save performance
                const rect = hero.getBoundingClientRect();
                if (rect.bottom > 0 && rect.top < window.innerHeight) {
                    // Only apply if it has a background image defined inline or in CSS
                    // We'll use a CSS variable or direct style
                    // Note: Direct background-position manipulation might conflict with 'center/cover'
                    // Best to use background-attachment: fixed where possible, or this JS tweak:
                    // hero.style.backgroundPositionY = \\px\; 
                    // BUT 'center/cover' makes this tricky. 
                    // Let's stick to standard background-attachment: fixed for now via CSS class if preferred, 
                    // OR use the 'transform' approach on a child. 
                    // Given the existing code, let's try a safe JS approach for background-position-y deviation.
                }
            });
        });

