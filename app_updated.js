// Xoiq AI Website JavaScript - Updated with Working Navigation

class XoiqAI {
  constructor() {
    this.currentSection = 'home';
    this.demoActive = false;
    this.accentData = {
      'scottish': {
        name: 'Scottish',
        accuracy: '98%',
        sample: 'Aye, I need help with my account, please.',
        processingTime: '87ms'
      },
      'welsh': {
        name: 'Welsh', 
        accuracy: '97%',
        sample: 'Good morning, I have a question about my service.',
        processingTime: '92ms'
      },
      'northern-irish': {
        name: 'Northern Irish',
        accuracy: '99%',
        sample: 'Hello there, could you help me sort this out?',
        processingTime: '81ms'
      },
      'geordie': {
        name: 'Geordie',
        accuracy: '96%',
        sample: 'Howay man, I need some assistance like.',
        processingTime: '95ms'
      },
      'yorkshire': {
        name: 'Yorkshire',
        accuracy: '98%',
        sample: 'Right then, I need to get this sorted.',
        processingTime: '89ms'
      },
      'cornish': {
        name: 'Cornish',
        accuracy: '95%',
        sample: 'Good day, I wonder if you could help?',
        processingTime: '93ms'
      },
      'brummie': {
        name: 'Brummie',
        accuracy: '97%',
        sample: 'Alright mate, I need some help here.',
        processingTime: '88ms'
      },
      'scouse': {
        name: 'Scouse',
        accuracy: '98%',
        sample: 'Sound lad, can you help me out?',
        processingTime: '86ms'
      },
      'devon': {
        name: 'Devon',
        accuracy: '96%',
        sample: 'Morning my lovely, having a spot of bother.',
        processingTime: '91ms'
      },
      'norfolk': {
        name: 'Norfolk',
        accuracy: '97%',
        sample: 'That fare nice, but I need some help.',
        processingTime: '90ms'
      },
      'cockney': {
        name: 'Cockney',
        accuracy: '99%',
        sample: 'Alright mate, having a bit of trouble here.',
        processingTime: '84ms'
      },
      'rp': {
        name: 'Received Pronunciation',
        accuracy: '99%',
        sample: 'Good afternoon, I require assistance please.',
        processingTime: '82ms'
      },
      'west-country': {
        name: 'West Country',
        accuracy: '96%',
        sample: 'Afternoon my dear, could you help me?',
        processingTime: '94ms'
      },
      'midlands': {
        name: 'Midlands',
        accuracy: '97%',
        sample: 'Alright duck, I need a hand with this.',
        processingTime: '88ms'
      }
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupContactForm();
    this.setupAnimations();
    this.setupROICalculator();
    this.setupSDKTabs();
    this.setupInstallTabs();
    this.setupMobileNav();

    // Show home section by default
    this.showSection('home');

    // Initialize animations after a delay
    setTimeout(() => {
      this.animateHeroStats();
      this.animateAccuracyBars();
    }, 500);
  }

  // Event Listeners Setup
  setupEventListeners() {
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

    // Demo functionality
    const accentSelect = document.getElementById('accentSelect');
    if (accentSelect) {
      accentSelect.addEventListener('change', () => {
        this.updateDemo();
      });
    }

    const startDemoBtn = document.getElementById('startDemo');
    if (startDemoBtn) {
      startDemoBtn.addEventListener('click', () => {
        this.startDemo();
      });
    }

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

  // Navigation System
  showSection(sectionId) {
    console.log('Showing section:', sectionId); // Debug log

    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      this.currentSection = sectionId;
      console.log('Section activated:', sectionId); // Debug log
    } else {
      console.error('Section not found:', sectionId);
      return;
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.add('active');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger section-specific animations
    setTimeout(() => {
      this.triggerSectionAnimations(sectionId);
    }, 100);
  }

  triggerSectionAnimations(sectionId) {
    switch (sectionId) {
      case 'home':
        this.animateHeroStats();
        this.animateAccuracyBars();
        break;
      case 'demo':
        this.resetDemo();
        break;
      case 'analytics':
        this.animateMetricWidgets();
        this.animateAccentBars();
        break;
    }
  }

  // Mobile Navigation
  setupMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('mobile-open');
        }
      });

      // Close menu when clicking on a link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('mobile-open');
        });
      });
    }
  }

  // Demo System
  updateDemo() {
    const accentSelect = document.getElementById('accentSelect');
    const selectedAccent = accentSelect.value;

    if (selectedAccent && this.accentData[selectedAccent]) {
      const accentData = this.accentData[selectedAccent];

      // Update demo results
      const detectedAccent = document.getElementById('detectedAccent');
      const confidenceScore = document.getElementById('confidenceScore');
      const processingTime = document.getElementById('processingTime');

      if (detectedAccent) detectedAccent.textContent = accentData.name;
      if (confidenceScore) confidenceScore.textContent = accentData.accuracy;
      if (processingTime) processingTime.textContent = accentData.processingTime;

      // Update conversation example
      this.updateConversationExample(accentData);
    }
  }

  updateConversationExample(accentData) {
    const conversationMessages = document.getElementById('conversationMessages');
    if (conversationMessages) {
      conversationMessages.innerHTML = `
        <div class="message user">
          <span class="message-text">"${accentData.sample}"</span>
          <span class="message-accent">${accentData.name} accent detected</span>
        </div>
        <div class="message ai">
          <span class="message-text">"Hello! I understand you perfectly. Let me help you with that right away."</span>
          <span class="message-note">Response adapted for ${accentData.name} accent patterns</span>
        </div>
      `;
    }
  }

  startDemo() {
    const startBtn = document.getElementById('startDemo');
    const accentSelect = document.getElementById('accentSelect');
    const selectedAccent = accentSelect.value;

    if (this.demoActive || !selectedAccent) {
      if (!selectedAccent) {
        alert('Please select an accent first!');
      }
      return;
    }

    this.demoActive = true;
    startBtn.textContent = 'Processing...';
    startBtn.disabled = true;

    const accentData = this.accentData[selectedAccent];

    // Animate waveforms
    this.animateWaveforms();

    // Show processing indicator
    const processingIndicator = document.querySelector('.processing-indicator');
    if (processingIndicator) {
      processingIndicator.style.display = 'flex';
    }

    // Simulate processing steps
    setTimeout(() => {
      // Update results
      this.updateDemo();

      // Hide processing indicator
      if (processingIndicator) {
        processingIndicator.style.display = 'none';
      }

      // Show success message
      this.showDemoSuccess(accentData);

      // Reset demo after delay
      setTimeout(() => {
        startBtn.textContent = 'Start Recognition';
        startBtn.disabled = false;
        this.demoActive = false;
      }, 3000);

    }, 2000);
  }

  showDemoSuccess(accentData) {
    // Create and show success notification
    const notification = document.createElement('div');
    notification.className = 'demo-notification';
    notification.innerHTML = `
      <div style="background: #10b981; color: white; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; text-align: center; animation: fadeIn 0.5s ease;">
        ✓ Successfully recognized ${accentData.name} accent with ${accentData.accuracy} confidence!
      </div>
    `;

    const demoInterface = document.querySelector('.demo-interface');
    if (demoInterface) {
      demoInterface.appendChild(notification);

      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  }

  animateWaveforms() {
    const waveBars = document.querySelectorAll('.wave-bar');
    waveBars.forEach((bar, index) => {
      const randomHeight = Math.random() * 80 + 20;
      setTimeout(() => {
        bar.style.height = `${randomHeight}%`;
      }, index * 50);
    });
  }

  resetDemo() {
    const startBtn = document.getElementById('startDemo');
    const accentSelect = document.getElementById('accentSelect');
    const processingIndicator = document.querySelector('.processing-indicator');

    if (startBtn) {
      startBtn.textContent = 'Start Recognition';
      startBtn.disabled = false;
    }

    if (accentSelect) {
      accentSelect.value = '';
    }

    if (processingIndicator) {
      processingIndicator.style.display = 'none';
    }

    // Reset demo results
    const detectedAccent = document.getElementById('detectedAccent');
    const confidenceScore = document.getElementById('confidenceScore');
    const processingTime = document.getElementById('processingTime');

    if (detectedAccent) detectedAccent.textContent = '-';
    if (confidenceScore) confidenceScore.textContent = '-';
    if (processingTime) processingTime.textContent = '-';

    // Reset conversation
    const conversationMessages = document.getElementById('conversationMessages');
    if (conversationMessages) {
      conversationMessages.innerHTML = `
        <div class="message user">
          <span class="message-text">"Hello, I need help with my account"</span>
          <span class="message-accent">Select an accent to see detection</span>
        </div>
        <div class="message ai">
          <span class="message-text">"Hello! I'd be happy to help you with your account."</span>
          <span class="message-note">Response will be adapted based on detected accent</span>
        </div>
      `;
    }

    this.demoActive = false;
  }

  // SDK Tabs
  setupSDKTabs() {
    const sdkTabs = document.querySelectorAll('.sdk-tab');
    sdkTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const lang = tab.getAttribute('data-lang');
        this.showSDKExample(lang);
      });
    });
  }

  showSDKExample(lang) {
    // Remove active class from all tabs
    document.querySelectorAll('.sdk-tab').forEach(tab => {
      tab.classList.remove('active');
    });

    // Hide all examples
    document.querySelectorAll('.sdk-example').forEach(example => {
      example.classList.remove('active');
    });

    // Show selected tab and example
    const selectedTab = document.querySelector(`[data-lang="${lang}"]`);
    const selectedExample = document.getElementById(`${lang}-example`);

    if (selectedTab) selectedTab.classList.add('active');
    if (selectedExample) selectedExample.classList.add('active');
  }

  // Install Tabs
  setupInstallTabs() {
    const installTabs = document.querySelectorAll('.install-tab');
    installTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const lang = tab.getAttribute('data-lang');
        this.showInstallCmd(lang);
      });
    });
  }

  showInstallCmd(lang) {
    // Remove active class from all tabs
    document.querySelectorAll('.install-tab').forEach(tab => {
      tab.classList.remove('active');
    });

    // Hide all commands
    document.querySelectorAll('.install-cmd').forEach(cmd => {
      cmd.classList.remove('active');
    });

    // Show selected tab and command
    const selectedTab = document.querySelector(`.install-tab[data-lang="${lang}"]`);
    const selectedCmd = document.querySelector(`.install-cmd[data-lang="${lang}"]`);

    if (selectedTab) selectedTab.classList.add('active');
    if (selectedCmd) selectedCmd.classList.add('active');
  }

  // Contact Form
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

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    messages.style.display = 'none';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        messages.innerHTML = '<p style="color: var(--success);">✓ Thank you! We'll be in touch within 24 hours.</p>';
        messages.className = 'success';
        messages.style.display = 'block';
        form.reset();

        // Show success animation
        this.showFormSuccess();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      messages.innerHTML = '<p style="color: var(--error);">Sorry, there was an error sending your message. Please try again or contact us directly.</p>';
      messages.className = 'error';
      messages.style.display = 'block';
    }

    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }

  showFormSuccess() {
    const formContainer = document.querySelector('.contact-form-container');
    if (formContainer) {
      formContainer.style.borderTop = '4px solid var(--success)';
      setTimeout(() => {
        formContainer.style.borderTop = '4px solid var(--primary-color)';
      }, 3000);
    }
  }

  // ROI Calculator
  setupROICalculator() {
    const calculateBtn = document.getElementById('calculateROI');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        this.calculateROI();
      });
    }

    // Auto-calculate when inputs change
    ['callVolume', 'callDuration', 'costPerMinute'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => {
          this.calculateROI();
        });
      }
    });

    // Initial calculation
    this.calculateROI();
  }

  calculateROI() {
    const callVolume = parseFloat(document.getElementById('callVolume')?.value || 100000);
    const callDuration = parseFloat(document.getElementById('callDuration')?.value || 8);
    const costPerMinute = parseFloat(document.getElementById('costPerMinute')?.value || 0.15);

    const currentCost = callVolume * callDuration * costPerMinute;
    const optimizedCost = currentCost * 0.7; // 30% reduction
    const monthlySavings = currentCost - optimizedCost;
    const annualSavings = monthlySavings * 12;

    // Update display
    const currentCostEl = document.getElementById('currentCost');
    const optimizedCostEl = document.getElementById('optimizedCost');
    const monthlySavingsEl = document.getElementById('monthlySavings');
    const annualSavingsEl = document.getElementById('annualSavings');

    if (currentCostEl) currentCostEl.textContent = `£${currentCost.toLocaleString()}`;
    if (optimizedCostEl) optimizedCostEl.textContent = `£${optimizedCost.toLocaleString()}`;
    if (monthlySavingsEl) monthlySavingsEl.textContent = `£${monthlySavings.toLocaleString()}`;
    if (annualSavingsEl) annualSavingsEl.textContent = `£${annualSavings.toLocaleString()}`;
  }

  // Animations
  setupAnimations() {
    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .metric-widget, .component-card').forEach(el => {
      observer.observe(el);
    });
  }

  animateHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
      setTimeout(() => {
        stat.style.transform = 'scale(1.1)';
        stat.style.color = 'var(--color-teal-300)';
        setTimeout(() => {
          stat.style.transform = 'scale(1)';
        }, 300);
      }, index * 200);
    });
  }

  animateAccuracyBars() {
    const accuracyFills = document.querySelectorAll('.accuracy-fill');
    accuracyFills.forEach((fill, index) => {
      setTimeout(() => {
        const accuracy = fill.getAttribute('data-accuracy');
        if (accuracy) {
          fill.style.width = `${accuracy}%`;
        }
      }, index * 500);
    });
  }

  animateMetricWidgets() {
    const metricValues = document.querySelectorAll('.metric-value-large');
    metricValues.forEach((metric, index) => {
      setTimeout(() => {
        const finalValue = metric.textContent;
        const isPercentage = finalValue.includes('%');
        const isPrice = finalValue.includes('£');
        const isTime = finalValue.includes('ms');

        let numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));

        metric.textContent = isPercentage ? '0%' : (isPrice ? '£0' : (isTime ? '0ms' : '0'));

        let current = 0;
        const increment = numericValue / 30;

        const counter = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            current = numericValue;
            clearInterval(counter);
          }

          if (isPercentage) {
            metric.textContent = current.toFixed(1) + '%';
          } else if (isPrice) {
            metric.textContent = '£' + Math.round(current).toLocaleString();
          } else if (isTime) {
            metric.textContent = Math.round(current) + 'ms';
          } else {
            metric.textContent = Math.round(current).toLocaleString();
          }
        }, 50);
      }, index * 200);
    });
  }

  animateAccentBars() {
    const barFills = document.querySelectorAll('.bar-fill');
    barFills.forEach((bar, index) => {
      setTimeout(() => {
        const finalWidth = bar.style.width;
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s ease-in-out';

        setTimeout(() => {
          bar.style.width = finalWidth;
        }, 100);
      }, index * 100);
    });
  }
}

// Global functions for HTML onclick events
window.showSection = function(sectionId) {
  if (window.xoiqApp) {
    window.xoiqApp.showSection(sectionId);
  }
};

window.startDemo = function() {
  if (window.xoiqApp) {
    window.xoiqApp.startDemo();
  }
};

window.calculateROI = function() {
  if (window.xoiqApp) {
    window.xoiqApp.calculateROI();
  }
};

window.showSDKExample = function(lang) {
  if (window.xoiqApp) {
    window.xoiqApp.showSDKExample(lang);
  }
};

window.showInstallCmd = function(lang) {
  if (window.xoiqApp) {
    window.xoiqApp.showInstallCmd(lang);
  }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.xoiqApp = new XoiqAI();

  // Add smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      if (window.xoiqApp) {
        window.xoiqApp.showSection(targetId);
      }
    });
  });

  // Add hover effects to interactive elements
  document.querySelectorAll('.feature-card, .metric-widget, .component-card, .workflow-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = 'var(--shadow-lg)';
      this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'var(--shadow)';
    });
  });

  // Add button click animations
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

  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close any open mobile menus
      document.querySelectorAll('.mobile-open').forEach(menu => {
        menu.classList.remove('mobile-open');
      });
    }
  });

  // Add copy-to-clipboard for code blocks
  document.querySelectorAll('pre code').forEach(codeBlock => {
    const pre = codeBlock.parentElement;
    pre.style.position = 'relative';

    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.3s ease;
      font-family: var(--font-family);
    `;

    pre.appendChild(copyBtn);

    copyBtn.addEventListener('click', async () => {
      const code = codeBlock.textContent.trim();
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = 'var(--success)';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.style.background = 'var(--primary-color)';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
        copyBtn.textContent = 'Error';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 2000);
      }
    });

    copyBtn.addEventListener('mouseenter', () => {
      copyBtn.style.opacity = '1';
    });

    copyBtn.addEventListener('mouseleave', () => {
      copyBtn.style.opacity = '0.8';
    });
  });
});

// Handle window resize
window.addEventListener('resize', () => {
  // Close mobile menu on resize
  document.querySelectorAll('.mobile-open').forEach(menu => {
    menu.classList.remove('mobile-open');
  });
});

// Add loading state management
window.addEventListener('load', () => {
  // Hide any loading indicators
  document.querySelectorAll('.loading').forEach(loader => {
    loader.style.display = 'none';
  });

  // Trigger initial animations
  if (window.xoiqApp) {
    setTimeout(() => {
      window.xoiqApp.animateHeroStats();
      window.xoiqApp.animateAccuracyBars();
    }, 500);
  }
});