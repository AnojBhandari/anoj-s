// Loading Animation
window.addEventListener('load', function () {
    // Give a little extra time to ensure all assets are loaded
    setTimeout(function () {
        const preloader = document.querySelector('.preloader');

        // Add hide class to start fade out
        preloader.classList.add('hide');

        // Remove preloader from DOM after animation completes
        setTimeout(function () {
            preloader.style.display = 'none';

            // Animate sections once preloader is gone
            document.querySelectorAll('section').forEach(function (section) {
                section.classList.add('loaded');
            });
        }, 500);
    }, 1000); // Reduced time for better user experience
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const header = document.querySelector('header');
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const navbar = document.querySelector('#navbar');
    const navLinks = document.querySelectorAll('#navbar ul li a');
    const sections = document.querySelectorAll('section');

    // Show menu on click
    menuBtn.addEventListener('click', function () {
        navbar.classList.add('active');
        // Change icon based on menu state
        const icon = this.querySelector('i');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    });

    // Hide menu on close button click
    closeBtn.addEventListener('click', function () {
        navbar.classList.remove('active');
        // Restore hamburger icon
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });

    // Close menu when clicking a nav link
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navbar.classList.remove('active');
            // Restore hamburger icon
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Add background to header on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Update active nav link based on current section
    function updateActiveNavLink() {
        let currentSection = '';

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Here you would normally send the form data to a server
            // For demo purposes, just show a success message
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get email value
            const email = this.querySelector('input[type="email"]').value;

            // Simple validation
            if (!email) {
                alert('Please enter your email address');
                return;
            }

            // Here you would normally send the subscription request to a server
            // For demo purposes, just show a success message
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Animation for skill bars (optional)
    const skillCards = document.querySelectorAll('.skill-card');

    // Function to add animation when element is in viewport
    function animateOnScroll(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }

    // Create the Intersection Observer
    const skillObserver = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.3
    });

    // Observe each skill card
    skillCards.forEach(card => {
        skillObserver.observe(card);
    });

    // Add CSS animation class to skill cards that are visible
    skillCards.forEach(function (card) {
        if (isElementInViewport(card)) {
            card.classList.add('animate');
        }
    });

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
