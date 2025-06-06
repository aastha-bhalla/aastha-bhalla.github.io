// Function to toggle project details
function toggleProject(element) {
    // Find the project container (li element)
    const projectItem = element.closest('li');
    if (!projectItem) return;

    // Find the details and expand icon within this project
    const details = projectItem.querySelector('.project-details');
    const expandIcon = projectItem.querySelector('.expand-icon');
    if (!details || !expandIcon) return;

    // Get all projects in the same list
    const projectsList = projectItem.closest('ul');
    if (!projectsList) return;

    // First collapse all other projects
    projectsList.querySelectorAll('li').forEach(item => {
        if (item !== projectItem) {
            const otherDetails = item.querySelector('.project-details');
            const otherIcon = item.querySelector('.expand-icon');
            if (otherDetails && otherIcon) {
                otherDetails.style.display = 'none';
                item.classList.remove('active');
                otherIcon.style.transform = 'rotate(0deg)';
            }
        }
    });

    // Toggle current project
    const isExpanded = projectItem.classList.contains('active');
    if (!isExpanded) {
        details.style.display = 'block';
        projectItem.classList.add('active');
        expandIcon.style.transform = 'rotate(45deg)';
    } else {
        details.style.display = 'none';
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
