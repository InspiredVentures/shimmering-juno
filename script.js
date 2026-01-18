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

    // Modal Logic
    const modal = document.getElementById('register-modal');
    // Verify modal exists before adding listeners (it wasn't in script.js before but index.html had it inline/merged)
    // The previous view of script.js showed "const observer = ... if (modal) {...}" inside the observer?? 
    // Wait, the previous file view lines 55-80 had modal logic INSIDE the intersection observer callback?? 
    // That looks like a copy-paste error from a previous merge. 
    // I will pull the modal logic OUT of the observer and put it here in the main scope.

    if (modal) {
        const openModalBtns = document.querySelectorAll('a[href="#register"], .btn-book');
        const closeModalBtn = modal.querySelector('.close-modal');

        // Open Modal
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Check if it's the register button specifically or broadly
                e.preventDefault();
                modal.classList.add('active');
            });
        });

        // Close Modal
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

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

