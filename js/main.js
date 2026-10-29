/**
 * Main Interactive Logic
 * Fetches content from data/content.json (with automatic offline fallback),
 * renders dynamic sections, and handles navigation, animations, and contact form.
 */

document.addEventListener('DOMContentLoaded', async () => {

  // =========================================================================
  // 1. Load Content (from data/content.json or data/content.js)
  // =========================================================================
  async function loadPortfolioData() {
    let data = null;
    try {
      const res = await fetch('data/content.json');
      if (res.ok) {
        data = await res.json();
      }
    } catch (e) {
      // Handled: Browser blocked file:// fetch
    }

    if (!data) {
      if (typeof portfolioData !== 'undefined') data = portfolioData;
      else if (typeof portfolioConfig !== 'undefined') data = portfolioConfig;
    }
    return data;
  }

  const content = await loadPortfolioData();
  if (content) {
    renderPortfolioFromConfig(content);
  }

  function renderPortfolioFromConfig(cfg) {
    // A. Personal & Hero Section
    if (cfg.personal) {
      const p = cfg.personal;
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle && p.name && p.titleMain) {
        heroTitle.innerHTML = `${p.titlePrefix || 'مرحباً، أنا'} <span class="gradient-text">${p.name}</span><br>${p.titleMain}`;
      }

      const pillBadge = document.querySelector('.pill-badge');
      if (pillBadge && p.badge) {
        pillBadge.innerHTML = `<span class="pill-dot"></span>${p.badge}`;
      }

      const heroDesc = document.querySelector('.hero-desc');
      if (heroDesc && p.bio) {
        heroDesc.innerHTML = p.bio;
      }

      // Stats
      if (p.stats && p.stats.length > 0) {
        const statsContainer = document.querySelector('.hero-stats');
        if (statsContainer) {
          statsContainer.innerHTML = p.stats.map(s => `
            <div class="stat-item">
              <h3>${s.number}</h3>
              <p>${s.label}</p>
            </div>
          `).join('');
        }
      }
    }

    // B. About Section
    if (cfg.about) {
      const ab = cfg.about;
      if (ab.paragraphs && ab.paragraphs.length > 0) {
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
          const highlightsHtml = ab.highlights ? `
            <div class="about-highlights">
              ${ab.highlights.map(h => `
                <div class="highlight-card">
                  <div class="highlight-icon"><i class="${h.icon}"></i></div>
                  <div class="highlight-info">
                    <h4>${h.title}</h4>
                    <p>${h.text}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : '';

          aboutText.innerHTML = `
            ${ab.paragraphs.map(p => `<p>${p}</p>`).join('')}
            ${highlightsHtml}
          `;
        }
      }

      if (ab.quote) {
        const quoteEl = document.querySelector('.about-card-banner p:last-child');
        if (quoteEl) quoteEl.textContent = ab.quote;
      }
    }

    // C. Skills Section
    if (cfg.skillsSection && cfg.skillsSection.categories) {
      const skillsGrid = document.querySelector('.skills-grid');
      if (skillsGrid) {
        skillsGrid.innerHTML = cfg.skillsSection.categories.map(cat => `
          <div class="glass-card">
            <h3 class="skill-category-title">
              <i class="${cat.icon || 'fa-solid fa-code'}"></i>
              ${cat.title}
            </h3>
            ${cat.items.map(item => `
              <div class="skill-item">
                <div class="skill-meta">
                  <span>${item.name}</span>
                  <span>${item.percent}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" data-width="${item.percent}"></div>
                </div>
              </div>
            `).join('')}
            ${cat.tags && cat.tags.length > 0 ? `
              <div class="tags-list">
                ${cat.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `).join('');
      }
    }

    // D. Projects Section
    if (cfg.projectsSection && cfg.projectsSection.projects) {
      const projectsGrid = document.querySelector('.projects-grid');
      if (projectsGrid) {
        projectsGrid.innerHTML = cfg.projectsSection.projects.map(proj => `
          <div class="glass-card project-card">
            <div class="project-preview">
              <div class="project-preview-mockup">
                <div class="mockup-header">
                  <span class="mockup-dot"></span>
                  <span class="mockup-dot"></span>
                  <span class="mockup-dot"></span>
                </div>
                <div class="mockup-body">
                  <i class="${proj.icon || 'fa-solid fa-cube'}"></i>
                </div>
              </div>
            </div>
            <div class="project-body">
              <h3 class="project-title">${proj.title}</h3>
              <p class="project-desc">${proj.description}</p>
              ${proj.aiRole ? `
                <div class="ai-contribution">
                  <strong><i class="fa-solid fa-robot"></i> توظيف الذكاء الاصطناعي:</strong>
                  ${proj.aiRole}
                </div>
              ` : ''}
              ${proj.technologies && proj.technologies.length > 0 ? `
                <div class="project-tech">
                  ${proj.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
              ` : ''}
              <div class="project-links">
                ${proj.liveDemoUrl ? `<a href="${proj.liveDemoUrl}" class="project-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> معاينة مباشرة</a>` : ''}
                ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fa-brands fa-github"></i> كود المصدر</a>` : ''}
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // E. Education & Timeline Section
    if (cfg.educationSection && cfg.educationSection.timeline) {
      const timeline = document.querySelector('.timeline');
      if (timeline) {
        timeline.innerHTML = cfg.educationSection.timeline.map(item => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <span class="timeline-date">${item.dateBadge}</span>
            <h3 class="timeline-title">${item.title}</h3>
            <span class="timeline-place"><i class="${item.placeIcon || 'fa-solid fa-award'}"></i> ${item.place}</span>
            <p class="timeline-desc">${item.description}</p>
          </div>
        `).join('');
      }
    }

    // F. Contact Details & Social Links
    if (cfg.contact) {
      const c = cfg.contact;
      const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
      if (c.email) {
        emailLinks.forEach(a => {
          a.setAttribute('href', `mailto:${c.email}`);
          if (a.textContent.includes('@')) a.textContent = c.email;
        });
      }

      if (c.social) {
        const gh = document.querySelector('.social-btn[title="GitHub"]');
        if (gh && c.social.github) gh.setAttribute('href', c.social.github);

        const li = document.querySelector('.social-btn[title="LinkedIn"]');
        if (li && c.social.linkedin) li.setAttribute('href', c.social.linkedin);
      }
    }

    // Re-initialize skills animation observer for newly rendered elements
    initSkillsObserver();
  }

  // =========================================================================
  // 2. Navbar Scroll Effect
  // =========================================================================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // =========================================================================
  // 3. Mobile Menu Toggle
  // =========================================================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // =========================================================================
  // 4. Active Link Highlight on Scroll
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // =========================================================================
  // 5. Animate Skills Progress Fill on Intersection
  // =========================================================================
  function initSkillsObserver() {
    const skillsSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.progress-fill');
    if (skillsSection && progressFills.length > 0) {
      const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            progressFills.forEach(fill => {
              const width = fill.getAttribute('data-width');
              if (width) {
                fill.style.width = width + '%';
              }
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      skillsObserver.observe(skillsSection);
    }
  }
  initSkillsObserver();

  // =========================================================================
  // 6. Contact Form Simulation (with client-side validation & toast)
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');

  if (contactForm && formToast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> تم الإرسال!';

        formToast.className = 'form-toast success';
        formToast.innerHTML = '<strong>شكراً لتواصلك!</strong> تم استلام رسالتك بنجاح، وسأرد عليك بأسرع وقت.';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 3000);
      }, 900);
    });
  }

  // =========================================================================
  // 7. Dynamic Year
  // =========================================================================
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
