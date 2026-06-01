document.addEventListener('DOMContentLoaded', () => {
  // ── THEME MANAGER ──
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Retrieve theme preference from LocalStorage or system settings
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userPrefersDark ? 'dark' : 'light';
  };

  // Set initial theme
  const initialTheme = getPreferredTheme();
  root.setAttribute('data-theme', initialTheme);

  // Toggle theme listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ── SCROLL ANIMATIONS (INTERSECTION OBSERVER) ──
  const animatedElements = document.querySelectorAll('.fade-in');

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing after animation triggers
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -40px 0px' // Slightly offset trigger point
  });

  animatedElements.forEach(element => {
    animationObserver.observe(element);
  });

  // ── CONTACT FORM HANDLER ──
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit');
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      // Clear previous status
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      // Validation check
      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.classList.add('error');
        return;
      }

      // Change button visual state to sending
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Mocking an async request
      setTimeout(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;

        // Display success response
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.classList.add('success');

        // Reset form
        contactForm.reset();
      }, 1500);
    });
  }
});
