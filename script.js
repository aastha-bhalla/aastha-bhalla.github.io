/* ============================================
   PROFESSIONAL PORTFOLIO JAVASCRIPT
   ============================================ */

// ============================================
// DOM ELEMENTS & STATE
// ============================================

const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// ============================================
// THEME MANAGEMENT
// ============================================

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeToggleIcon();
    }
}

// Toggle theme
function toggleTheme() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeToggleIcon();
}

// Update theme toggle icon
function updateThemeToggleIcon() {
    const icon = themeToggle.querySelector('i');
    const isDark = body.classList.contains('dark-mode');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// ============================================
// MOBILE MENU MANAGEMENT
// ============================================

// Toggle mobile menu
function toggleMobileMenu() {
    navbar.classList.toggle('active');
}

// Close mobile menu when nav link is clicked
function closeMobileMenu() {
    navbar.classList.remove('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
        closeMobileMenu();
    }
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================

let scrollY = 0;

function handleScroll() {
    scrollY = window.scrollY;
    
    if (scrollY > 0) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    }
}

// ============================================
// SMOOTH SCROLL & ACTIVE NAV LINK
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    let isValid = true;

    // Reset error states
    contactForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });

    // Validate name
    if (!nameField.value.trim()) {
        showFieldError('name', 'Name is required');
        isValid = false;
    }

    // Validate email
    if (!emailField.value.trim()) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(emailField.value)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (!subjectField.value.trim()) {
        showFieldError('subject', 'Subject is required');
        isValid = false;
    }

    // Validate message
    if (!messageField.value.trim()) {
        showFieldError('message', 'Message is required');
        isValid = false;
    } else if (messageField.value.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

function showFieldError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    const errorElement = document.getElementById(fieldId + 'Error');

    formGroup.classList.add('error');
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
}

function clearFormMessage() {
    formMessage.classList.remove('success', 'error');
    formMessage.textContent = '';
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.add(type);

    if (type === 'success') {
        setTimeout(() => {
            clearFormMessage();
        }, 5000);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
        showFormMessage('Please fill in all fields correctly', 'error');
        return;
    }

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // In a real scenario, you would send the form data to a server
    setTimeout(() => {
        showFormMessage(
            'Thank you for your message! I will get back to you soon.',
            'success'
        );

        contactForm.reset();
        clearFormErrors();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function clearFormErrors() {
    contactForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        const errorElement = group.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}

// ============================================
// PROJECT DETAILS TOGGLE
// ============================================

function toggleProjectDetails(element) {
    const projectCard = element.closest('.project-card');
    if (!projectCard) return;

    const details = projectCard.querySelector('.project-details');
    const icon = projectCard.querySelector('.project-toggle-icon');

    if (details.style.display === 'none' || !details.style.display) {
        details.style.display = 'block';
        projectCard.classList.add('expanded');
    } else {
        details.style.display = 'none';
        projectCard.classList.remove('expanded');
    }
}

// ============================================
// TIME UPDATE
// ============================================

function updateTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe experience cards
    document.querySelectorAll('.experience-card, .timeline-item-secondary').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe featured project cards
    document.querySelectorAll('.featured-project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe contact cards
    document.querySelectorAll('.contact-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        closeMobileMenu();
    }

    // Quick jump to contact with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initializeTheme();

    // Setup event listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Setup scroll listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // Setup form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        // Clear error messages when user starts typing
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', () => {
                const formGroup = field.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.remove('error');
                }
            });
        });
    }

    // Initialize time updates
    updateTime();
    setInterval(updateTime, 1000);

    // Initialize scroll animations
    initializeScrollAnimations();

    // Initial active nav link update
    updateActiveNavLink();

    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Setup project detail toggles
    document.querySelectorAll('.project-header-clickable').forEach(header => {
        header.addEventListener('click', function () {
            toggleProjectDetails(this);
        });
    });

    // Log initialization complete
    console.log('Portfolio initialized successfully! 🚀');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Get computed style with fallback
function getComputedProperty(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
}

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Use passive event listeners for better scroll performance
['scroll', 'resize', 'touchmove'].forEach(event => {
    window.addEventListener(event, () => {}, { passive: true });
});
        projectItem.classList.remove('active');
        expandIcon.style.transform = 'rotate(0deg)';
    }
}

// Update current time in footer
function updateTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true 
        };
        timeElement.textContent = now.toLocaleTimeString('en-US', options);
    }
}

// Initialize functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start time updates
    setInterval(updateTime, 1000);
    updateTime();

    // Handle contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const formMessage = document.getElementById('formMessage');

            if (name && email && message) {
                formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                formMessage.style.color = '#059669';
                contactForm.reset();
                
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
            } else {
                formMessage.textContent = 'Please fill in all fields.';
                formMessage.style.color = '#dc2626';
            }
        });
    }

    // Add smooth scrolling to all navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize project sections
    document.querySelectorAll('.project-header').forEach(header => {
        header.addEventListener('click', () => toggleProject(header));
    });

    // Initialize expand icons
    document.querySelectorAll('.expand-icon').forEach(icon => {
        icon.style.transition = 'transform 0.3s ease';
        icon.style.display = 'inline-block';
    });

    // Hide all project details initially
    document.querySelectorAll('.project-details').forEach(details => {
        details.style.display = 'none';
    });
    
    // Add fade-in animation to main content
    const main = document.querySelector('main');
    if (main) {
        main.style.opacity = '0';
        main.style.transition = 'opacity 0.8s ease-in-out';
        requestAnimationFrame(() => {
            main.style.opacity = '1';
        });
    }
});
