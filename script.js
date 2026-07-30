document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. MOBILE HAMBURGER MENU TOGGLE
    // =========================================
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon to X close icon
            const icon = mobileMenuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Automatically close menu when clicking any nav link on mobile
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // =========================================
    // 2. BOOKING FORM SUBMISSION (Web3Forms)
    // =========================================
    const form = document.getElementById('bookingForm');
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const statusDiv = document.getElementById('formStatus');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            statusDiv.textContent = "";

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    statusDiv.style.color = '#16a34a'; 
                    statusDiv.textContent = "Success! Your quote request has been sent to HaulTech.";
                    form.reset();
                } else {
                    statusDiv.style.color = '#dc2626'; 
                    statusDiv.textContent = "Error: " + data.message;
                }

            } catch (error) {
                statusDiv.style.color = '#dc2626';
                statusDiv.textContent = "Something went wrong. Please try again or call 0411 460 089.";
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
// =========================================
// STATS COUNTER ANIMATION
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000; // Animation duration in milliseconds (2 seconds)
            const increment = target / (duration / 16); // 60fps frame steps

            let currentCount = 0;

            const updateCount = () => {
                currentCount += increment;
                if (currentCount < target) {
                    counter.textContent = Math.ceil(currentCount) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target + suffix;
                }
            };

            updateCount();
        });
    };

    // Use Intersection Observer to trigger animation when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    runCounters();
                    animated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(statsSection);
    }
});
