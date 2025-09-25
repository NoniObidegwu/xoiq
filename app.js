// Xoiq AI Website JavaScript - Clean Working Version

class XoiqAI {
  constructor() {
    this.currentSection = 'home';
    this.demoActive = false;
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupContactForm();
    this.showSection('home');
  }

  setupNavigation() {
    console.log('Setting up navigation...');

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const sectionId = href.substring(1);
          this.showSection(sectionId);
        }
      });
    });

    // Footer links  
    document.querySelectorAll('.footer-section a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const sectionId = href.substring(1);
          this.showSection(sectionId);
        }
      });
    });
  }

  showSection(sectionId) {
    console.log('Showing section:', sectionId);

    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      this.currentSection = sectionId;
    }

    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + sectionId) {
        link.classList.add('active');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleContactForm(e.target);
      });
    }
  }

  async handleContactForm(form) {
    const submitBtn = document.getElementById('submit-btn');
    const messages = document.getElementById('form-messages');

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        messages.innerHTML = '<p style="color: #10b981;">Thank you! We will be in touch within 24 hours.</p>';
        messages.style.display = 'block';
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      messages.innerHTML = '<p style="color: #ef4444;">Sorry, there was an error. Please try again.</p>';
      messages.style.display = 'block';
    }

    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
}

// Global functions for onclick events
window.showSection = function(sectionId) {
  if (window.xoiqApp) {
    window.xoiqApp.showSection(sectionId);
  }
};

window.startDemo = function() {
  console.log('Demo started');
  // Demo functionality can be added here
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Xoiq AI app...');
  window.xoiqApp = new XoiqAI();

  // Add button animations
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (!this.disabled) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
      }
    });
  });
});
Apollo
