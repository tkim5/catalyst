// Catalyst Agape Church — site scripts (vanilla JS, no dependencies)

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close menu when a link is tapped
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Mark current page in nav ---------- */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- Image fallback placeholders ----------
     If a photo referenced in /images/ hasn't been supplied yet,
     swap the <img> for a labeled placeholder instead of showing
     a broken-image icon. Once real files are added to /images/,
     this never triggers. */
  document.querySelectorAll('img[data-fallback-label]').forEach(function (img) {
    img.addEventListener('error', function () {
      var frame = img.closest('.img-frame');
      var label = img.getAttribute('data-fallback-label');
      if (frame) {
        frame.innerHTML = '<div class="img-placeholder">' + label + '</div>';
      }
    });
  });

  /* ---------- Contact form (static — no backend) ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      var name = form.elements['name'].value.trim();
      var email = form.elements['email'].value.trim();
      var message = form.elements['message'].value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        showStatus(status, 'error', 'Please fill in your name, email and message.');
        return;
      }
      if (!emailPattern.test(email)) {
        showStatus(status, 'error', 'Please enter a valid email address.');
        return;
      }

      // No server-side processing is available on GitHub Pages, so we hand
      // the message to the visitor's email client, pre-filled and ready to send.
      var subject = encodeURIComponent(form.elements['subject'].value || 'Message from catalystagape.org');
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:info@catalystagape.org?subject=' + subject + '&body=' + body;

      showStatus(status, 'success', 'Your email app should now open with your message ready to send. If it doesn\u2019t open, email us directly at info@catalystagape.org.');
      form.reset();
    });
  }

  function showStatus(el, type, message) {
    if (!el) return;
    el.textContent = message;
    el.className = 'form-status show ' + type;
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
});
