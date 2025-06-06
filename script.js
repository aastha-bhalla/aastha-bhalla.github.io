document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Contact form validation and feedback
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMessage = document.getElementById('formMessage');

  if (name && email && message) {
    formMessage.textContent = `Thank you for reaching out, ${name}! I will get back to you soon.`;
    formMessage.style.color = '#357ab8';
    formMessage.style.background = '#e6f0fa';
    formMessage.style.padding = '0.5em 1em';
    formMessage.style.borderRadius = '6px';
    formMessage.style.marginTop = '1em';
    this.reset();
  } else {
    formMessage.textContent = 'Please fill in all fields.';
    formMessage.style.color = '#d7263d';
    formMessage.style.background = '#fff0f3';
    formMessage.style.padding = '0.5em 1em';
    formMessage.style.borderRadius = '6px';
    formMessage.style.marginTop = '1em';
  }
});

// Theme toggle with smooth transition
const themeBtn = document.getElementById('toggle-theme');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  themeBtn.setAttribute('aria-label', document.body.classList.contains('dark-mode') ? 'Switch to light mode' : 'Switch to dark mode');
});

// About section toggle (if present)
const aboutBtn = document.getElementById('about-toggle');
const moreAbout = document.getElementById('more-about');
if (aboutBtn && moreAbout) {
  let aboutOpen = false;
  aboutBtn.addEventListener('click', () => {
    aboutOpen = !aboutOpen;
    moreAbout.style.display = aboutOpen ? 'inline' : 'none';
    aboutBtn.textContent = aboutOpen ? 'Read Less' : 'Read More';
  });
}

// Show more projects (if present)
const showProjectsBtn = document.getElementById('show-projects');
const extraProjects = document.getElementById('extra-projects');
if (showProjectsBtn && extraProjects) {
  let projectsOpen = false;
  showProjectsBtn.addEventListener('click', () => {
    projectsOpen = !projectsOpen;
    extraProjects.style.display = projectsOpen ? 'block' : 'none';
    showProjectsBtn.textContent = projectsOpen ? 'Show Less Projects' : 'Show More Projects';
  });
}

// Live time in footer
function updateTime() {
  const now = new Date();
  const timeElem = document.getElementById('currentTime');
  if (timeElem) {
    timeElem.textContent = now.toLocaleString('en-IN', {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: true
    });
  }
}
setInterval(updateTime, 1000);
updateTime();

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Add subtle fade-in animation to main content
window.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (main) {
    main.style.opacity = 0;
    main.style.transition = 'opacity 1.2s cubic-bezier(.4,0,.2,1)';
    setTimeout(() => { main.style.opacity = 1; }, 200);
  }
});
