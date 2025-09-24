// Xoiq AI Demo Application JavaScript

class XoiqAIDemo {
  constructor() {
    this.currentSection = 'home';
    this.isProcessing = false;
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupDemo();
    this.setupSDKTabs();
    this.setupInstallTabs();
    this.setupROICalculator();
    this.setupHeroButtons();
    this.setupMobileNav();
    this.setupScrollAnimations();
    this.setupPerformanceMonitoring();
    
    // Initial setup
    this.showSection('home');
    setTimeout(() => {
      this.animateAccuracyBars();
    }, 500);
  }

  // Navigation Management - Fixed
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = link.getAttribute('href').substring(1);
        console.log('Navigating to:', targetId); // Debug log
        
        this.navigateToSection(targetId);
      });
    });
  }

  navigateToSection(sectionId) {
    console.log('Navigating to section:', sectionId); // Debug log
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.style.display = 'block';
      this.currentSection = sectionId;
      
      console.log('Section shown:', sectionId); // Debug log
    } else {
      console.error('Section not found:', sectionId); // Debug log
    }

    // Update navigation
    this.updateActiveNavLink(sectionId);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger section-specific animations
    setTimeout(() => {
      this.triggerSectionAnimations(sectionId);
    }, 100);
  }

  showSection(sectionId) {
    this.navigateToSection(sectionId);
  }

  updateActiveNavLink(sectionId = null) {
    const activeSection = sectionId || this.currentSection;
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${activeSection}`) {
        link.classList.add('active');
      }
    });
  }

  triggerSectionAnimations(sectionId) {
    switch (sectionId) {
      case 'home':
        setTimeout(() => this.animateAccuracyBars(), 200);
        break;
      case 'analytics':
        setTimeout(() => {
          this.animateMetricWidgets();
          this.animateAccentBars();
        }, 200);
        break;
      case 'demo':
        setTimeout(() => this.startWaveformAnimations(), 200);
        break;
    }
  }

  // Demo Section Functionality - Fixed
  setupDemo() {
    const accentSelect = document.getElementById('accentSelect');
    const startDemoBtn = document.getElementById('startDemo');

    if (startDemoBtn && accentSelect) {
      startDemoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedAccent = accentSelect.value;
        
        if (selectedAccent) {
          this.runDemo(selectedAccent);
        } else {
          alert('Please select an accent first');
        }
      });
    }

    // Start waveform animations
    this.startWaveformAnimations();
  }

  async runDemo(accent) {
    if (this.isProcessing) return;

    this.isProcessing = true;
    const startBtn = document.getElementById('startDemo');
    const processingIndicator = document.querySelector('.processing-indicator');
    const detectedAccent = document.getElementById('detectedAccent');
    const confidenceScore = document.getElementById('confidenceScore');
    const processingTime = document.getElementById('processingTime');

    // Update button state
    if (startBtn) {
      startBtn.textContent = 'Processing...';
      startBtn.disabled = true;
    }

    // Show processing indicator
    if (processingIndicator) {
      processingIndicator.classList.add('active');
    }

    // Simulate processing delay
    await this.sleep(2000 + Math.random() * 1000);

    // Generate demo results
    const results = this.generateDemoResults(accent);

    // Update results
    if (detectedAccent) detectedAccent.textContent = results.accent;
    if (confidenceScore) confidenceScore.textContent = results.confidence;
    if (processingTime) processingTime.textContent = results.processingTime;

    // Update conversation example
    this.updateConversationExample(accent);

    // Hide processing indicator
    if (processingIndicator) {
      processingIndicator.classList.remove('active');
    }

    // Reset button
    if (startBtn) {
      startBtn.textContent = 'Start Recognition';
      startBtn.disabled = false;
    }
    
    this.isProcessing = false;
  }

  generateDemoResults(accent) {
    const accentNames = {
      'scottish': 'Scottish',
      'welsh': 'Welsh',
      'northern-irish': 'Northern Irish',
      'geordie': 'Geordie',
      'yorkshire': 'Yorkshire',
      'cornish': 'Cornish',
      'brummie': 'Brummie',
      'scouse': 'Scouse',
      'devon': 'Devon',
      'norfolk': 'Norfolk',
      'cockney': 'Cockney',
      'rp': 'Received Pronunciation',
      'west-country': 'West Country',
      'midlands': 'Midlands'
    };

    return {
      accent: accentNames[accent] || 'Unknown',
      confidence: (95 + Math.random() * 4).toFixed(1) + '%',
      processingTime: (80 + Math.random() * 40).toFixed(0) + 'ms'
    };
  }

  updateConversationExample(accent) {
    const messages = document.getElementById('conversationMessages');
    if (!messages) return;

    const examples = {
      'scottish': {
        user: 'Och, I cannae get intae my account',
        userNote: '(Scottish accent detected)',
        ai: 'I understand you\'re having trouble accessing your account. Let me help you with that right away.',
        aiNote: '(Response adapted for Scottish dialect patterns)'
      },
      'geordie': {
        user: 'Howay man, me account\'s not working',
        userNote: '(Geordie accent detected)',
        ai: 'I can see you\'re having issues with your account. Let me sort that out for you.',
        aiNote: '(Response adapted for Geordie dialect patterns)'
      },
      'welsh': {
        user: 'Right then, my account isn\'t working properly',
        userNote: '(Welsh accent detected)',
        ai: 'I understand there\'s a problem with your account. I\'ll help you resolve this straight away.',
        aiNote: '(Response adapted for Welsh dialect patterns)'
      }
    };

    const example = examples[accent] || {
      user: 'Hello, I need help with my account',
      userNote: `(${accent.replace('-', ' ')} accent detected)`,
      ai: 'Hello! I\'d be happy to help you with your account. Can you please provide your account number?',
      aiNote: `(Response adapted for ${accent.replace('-', ' ')} accent patterns)`
    };

    messages.innerHTML = `
      <div class="message user">
        <span class="message-text">${example.user}</span>
        <span class="message-accent">${example.userNote}</span>
      </div>
      <div class="message ai">
        <span class="message-text">${example.ai}</span>
        <span class="message-note">${example.aiNote}</span>
      </div>
    `;
  }

  startWaveformAnimations() {
    const waveBars = document.querySelectorAll('.wave-bar');
    
    if (this.waveformInterval) {
      clearInterval(this.waveformInterval);
    }
    
    this.waveformInterval = setInterval(() => {
      waveBars.forEach((bar, index) => {
        const time = Date.now() / 1000;
        const frequency = 0.5 + (index % 3) * 0.3;
        const amplitude = 30 + Math.sin(time * frequency + index * 0.5) * 25;
        const noise = Math.random() * 15;
        
        bar.style.height = Math.max(8, amplitude + noise) + '%';
      });
    }, 200);
  }

  // SDK Tabs Functionality - Fixed
  setupSDKTabs() {
    const tabs = document.querySelectorAll('.sdk-tab');
    const examples = document.querySelectorAll('.sdk-example');

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = tab.getAttribute('data-lang');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding example
        examples.forEach(ex => {
          ex.classList.remove('active');
          if (ex.id === `${lang}-example`) {
            ex.classList.add('active');
          }
        });
      });
    });
  }

  // Install Tabs Functionality - Fixed
  setupInstallTabs() {
    const installTabs = document.querySelectorAll('.install-tab');
    const installCmds = document.querySelectorAll('.install-cmd');

    installTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = tab.getAttribute('data-lang');
        
        // Update active tab
        installTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding command
        installCmds.forEach(cmd => {
          cmd.classList.remove('active');
          if (cmd.getAttribute('data-lang') === lang) {
            cmd.classList.add('active');
          }
        });
      });
    });
  }

  // ROI Calculator Functionality - Fixed
  setupROICalculator() {
    const calculateBtn = document.getElementById('calculateROI');
    const callVolumeInput = document.getElementById('callVolume');
    const callDurationInput = document.getElementById('callDuration');
    const costPerMinuteInput = document.getElementById('costPerMinute');

    if (calculateBtn) {
      calculateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.calculateROI();
      });
    }

    // Auto-calculate on input change
    [callVolumeInput, callDurationInput, costPerMinuteInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          this.calculateROI();
        });
      }
    });

    // Initial calculation
    setTimeout(() => this.calculateROI(), 500);
  }

  calculateROI() {
    const callVolumeEl = document.getElementById('callVolume');
    const callDurationEl = document.getElementById('callDuration');
    const costPerMinuteEl = document.getElementById('costPerMinute');
    
    if (!callVolumeEl || !callDurationEl || !costPerMinuteEl) return;
    
    const callVolume = parseFloat(callVolumeEl.value) || 100000;
    const callDuration = parseFloat(callDurationEl.value) || 8;
    const costPerMinute = parseFloat(costPerMinuteEl.value) || 0.15;

    const currentMonthlyCost = callVolume * callDuration * costPerMinute;
    const optimizedCost = currentMonthlyCost * 0.7; // 30% reduction
    const monthlySavings = currentMonthlyCost - optimizedCost;
    const annualSavings = monthlySavings * 12;

    // Update display
    const currentCostEl = document.getElementById('currentCost');
    const optimizedCostEl = document.getElementById('optimizedCost');
    const monthlySavingsEl = document.getElementById('monthlySavings');
    const annualSavingsEl = document.getElementById('annualSavings');

    if (currentCostEl) currentCostEl.textContent = this.formatCurrency(currentMonthlyCost);
    if (optimizedCostEl) optimizedCostEl.textContent = this.formatCurrency(optimizedCost);
    if (monthlySavingsEl) monthlySavingsEl.textContent = this.formatCurrency(monthlySavings);
    if (annualSavingsEl) annualSavingsEl.textContent = this.formatCurrency(annualSavings);
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Accuracy Bar Animations - Fixed
  animateAccuracyBars() {
    const accuracyFills = document.querySelectorAll('.accuracy-fill');
    
    // Reset first
    accuracyFills.forEach(fill => {
      fill.style.width = '0%';
    });
    
    // Then animate
    setTimeout(() => {
      accuracyFills.forEach((fill, index) => {
        setTimeout(() => {
          if (fill.classList.contains('xoiq')) {
            fill.style.width = '98%';
          } else if (fill.classList.contains('competitor')) {
            fill.style.width = '76%';
          }
        }, index * 500);
      });
    }, 200);
  }

  // Hero Button Handlers - Fixed
  setupHeroButtons() {
    const tryDemoBtn = document.getElementById('tryDemoBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');

    if (tryDemoBtn) {
      tryDemoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateToSection('demo');
      });
    }

    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateToSection('architecture');
      });
    }
  }

  // Analytics Animations - Fixed
  animateMetricWidgets() {
    const widgets = document.querySelectorAll('.metric-widget');
    
    widgets.forEach((widget, index) => {
      widget.style.transform = 'translateY(20px)';
      widget.style.opacity = '0';
      
      setTimeout(() => {
        widget.style.transition = 'all 0.6s ease';
        widget.style.transform = 'translateY(0)';
        widget.style.opacity = '1';
      }, index * 100);
    });
  }

  animateAccentBars() {
    const bars = document.querySelectorAll('.bar-fill');
    
    // Reset bars
    bars.forEach(bar => {
      const originalWidth = bar.style.width;
      bar.setAttribute('data-width', originalWidth);
      bar.style.width = '0%';
    });
    
    // Animate bars
    setTimeout(() => {
      bars.forEach((bar, index) => {
        setTimeout(() => {
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
        }, index * 150);
      });
    }, 300);
  }

  // Mobile Navigation - Fixed
  setupMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.classList.toggle('show');
      });

      // Close mobile nav when clicking on a link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (navLinks) {
            navLinks.classList.remove('show');
          }
        });
      });

      // Close mobile nav when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('show');
        }
      });
    }
  }

  // Scroll-triggered animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all cards and major elements
    document.querySelectorAll('.card, .feature-card, .component-card, .workflow-card').forEach(el => {
      observer.observe(el);
    });
  }

  // Performance monitoring - Fixed
  setupPerformanceMonitoring() {
    // Initial update
    setTimeout(() => {
      this.updatePerformanceMetrics();
    }, 1000);
    
    // Periodic updates
    setInterval(() => {
      this.updatePerformanceMetrics();
    }, 5000);
  }

  updatePerformanceMetrics() {
    const baseMetrics = {
      activeCalls: 2847,
      accuracy: 98.2,
      responseTime: 89,
      costSavings: 127000
    };

    const metrics = {
      activeCalls: Math.floor(baseMetrics.activeCalls + (Math.random() - 0.5) * 200),
      accuracy: (baseMetrics.accuracy + (Math.random() - 0.5) * 0.6).toFixed(1),
      responseTime: Math.floor(baseMetrics.responseTime + (Math.random() - 0.5) * 20),
      costSavings: Math.floor(baseMetrics.costSavings + (Math.random() - 0.5) * 10000)
    };

    // Update metric displays if they exist
    const elements = {
      activeCalls: document.querySelector('.metric-widget:nth-child(1) .metric-value-large'),
      accuracy: document.querySelector('.metric-widget:nth-child(2) .metric-value-large'),
      responseTime: document.querySelector('.metric-widget:nth-child(3) .metric-value-large'),
      costSavings: document.querySelector('.metric-widget:nth-child(4) .metric-value-large')
    };

    if (elements.activeCalls) elements.activeCalls.textContent = metrics.activeCalls.toLocaleString();
    if (elements.accuracy) elements.accuracy.textContent = metrics.accuracy + '%';
    if (elements.responseTime) elements.responseTime.textContent = metrics.responseTime + 'ms';
    if (elements.costSavings) elements.costSavings.textContent = '£' + metrics.costSavings.toLocaleString();
  }

  // Utility Functions
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Xoiq AI Demo...'); // Debug log
  
  const app = new XoiqAIDemo();
  
  // Make app globally available for debugging
  window.XoiqApp = app;
  
  console.log('Xoiq AI Demo initialized successfully'); // Debug log
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = XoiqAIDemo;
}