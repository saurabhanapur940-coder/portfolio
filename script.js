/* ===================================================================
   SAURABH PORTFOLIO - JAVASCRIPT
   Interactivity, Mobile Nav, Modal Handling & Contact Simulation
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // Active Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navAnchorLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navAnchorLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // Resume Modal Handling
  const printCvBtn = document.getElementById('print-cv-btn');
  const resumeModal = document.getElementById('resume-modal');
  const resumeOverlay = document.getElementById('resume-overlay');
  const closeResumeBtn = document.getElementById('close-resume-btn');

  const openResumeModal = () => {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeResumeModal = () => {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (printCvBtn) {
    printCvBtn.addEventListener('click', openResumeModal);
  }

  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeOverlay) {
    resumeOverlay.addEventListener('click', closeResumeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeResumeModal();
    }
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && feedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Please fill out all fields before submitting.';
        return;
      }

      // Show temporary sending state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `<strong>Thank you, ${escapeHtml(name)}!</strong> Your message has been recorded. You can also reach Saurabh directly at <a href="mailto:saurabhanapur940@gmail.com" style="color: inherit; text-decoration: underline;">saurabhanapur940@gmail.com</a> or <a href="tel:+918604050638" style="color: inherit; text-decoration: underline;">+91 8604050638</a>.`;
        
        contactForm.reset();
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }, 700);
    });
  }

  // Quick helper to escape HTML
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
});
