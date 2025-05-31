document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Simple form validation
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMessage = document.getElementById('formMessage');

  if (name && email && message) {
    formMessage.textContent = 'Thank you for reaching out, ' + name + '! I will get back to you soon.';
    formMessage.style.color = 'green';
    this.reset();
  } else {
    formMessage.textContent = 'Please fill in all fields.';
    formMessage.style.color = 'red';
  }
});

// Theme toggle
const themeBtn = document.getElementById('toggle-theme');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// About section toggle
const aboutBtn = document.getElementById('about-toggle');
const moreAbout = document.getElementById('more-about');
let aboutOpen = false;
aboutBtn.addEventListener('click', () => {
  aboutOpen = !aboutOpen;
  moreAbout.style.display = aboutOpen ? 'inline' : 'none';
  aboutBtn.textContent = aboutOpen ? 'Read Less' : 'Read More';
});

// Show more projects
const showProjectsBtn = document.getElementById('show-projects');
const extraProjects = document.getElementById('extra-projects');
let projectsOpen = false;
showProjectsBtn.addEventListener('click', () => {
  projectsOpen = !projectsOpen;
  extraProjects.style.display = projectsOpen ? 'block' : 'none';
  showProjectsBtn.textContent = projectsOpen ? 'Show Less Projects' : 'Show More Projects';
});

// Live time in footer
function updateTime() {
  const now = new Date();
  document.getElementById('currentTime').textContent = now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();
