console.log("Seven Summits loaded.");

console.log("Seven Summits loaded.");

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                if (window.innerWidth <= 900) { // Updated to match CSS breakpoint
                    menuToggle.classList.remove('is-active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Mobile Menu
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        console.log("Mobile menu initialized"); // Debug

        // Toggle Menu
        menuToggle.addEventListener('click', (e) => {
            console.log("Menu clicked"); // Debug
            e.stopPropagation(); // Prevent immediate closing
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (menuToggle.classList.contains('is-active')) {
                if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                    console.log("Clicked outside menu"); // Debug
                    menuToggle.classList.remove('is-active');
                    navLinks.classList.remove('active');
                }
            }
        });

        // Close when clicking a link inside the menu
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navLinks.classList.remove('active');
            });
        });
    } else {
        console.error("Mobile menu element not found!");
    }

    // Generic Modal Logic (Global Scope for inline onclicks)
    window.openModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            // Force reflow for transition
            void modal.offsetWidth;
            modal.classList.add('active');
        } else {
            console.error('Modal not found:', modalId);
        }
    };

    window.closeModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Match CSS transition
        }
    };

    // Close on outside click (Generic)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target.id);
        }
    });

    // Close on Close Button Click (Generic)
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal-overlay');
            if (modal) closeModal(modal.id);
        });
    });

    // Trigger Register Custom Link
    document.querySelectorAll('a[href="#register"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.openModal('register-modal');
        });
    });

    // Animations on Scroll & Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Added rootMargin for earlier trigger
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Matches CSS .reveal-on-scroll.visible
                entry.target.classList.add('active');  // Matches CSS .reveal.active
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Auto-tag elements for reveal
    document.querySelectorAll('.reveal-on-scroll, section h2, section p, .grid-2 > div, .grid-3 > div, .accordion-item').forEach(el => {
        el.classList.add('reveal'); // Ensure base class exists if using that system
        observer.observe(el);
    });

    // Accordion Logic
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            // Toggle active state for icon rotation if needed (CSS dependent)
            this.classList.toggle('active'); // CSS might not use this but good for state

            const content = this.nextElementSibling;
            const icon = this.querySelector('.icon'); // If exists

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                if (icon) icon.textContent = '+';
            } else {
                // Optional: Close other accordions
                accordions.forEach(otherAcc => {
                    if (otherAcc !== this) {
                        otherAcc.classList.remove('active');
                        otherAcc.nextElementSibling.style.maxHeight = null;
                        const otherIcon = otherAcc.querySelector('.icon');
                        if (otherIcon) otherIcon.textContent = '+';
                    }
                });

                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.textContent = '-';
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

    // Parallax Effect
    window.addEventListener('scroll', () => {
        // Simple optimization check
        if (window.innerWidth > 768) {
            document.querySelectorAll('.hero').forEach(hero => {
                const scrolled = window.scrollY;
                // Optional simple parallax if background-attachment: fixed isn't enough
            });
        }
    });

});

// Booking Modal Overlay
function openBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside the iframe
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeBookingModal();
            }
        });
    }
});
