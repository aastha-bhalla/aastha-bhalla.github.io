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
