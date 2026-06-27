/**
 * 泛客 — Ink Wash Painting Interactions
 * Scroll reveal, progress bar, back-to-top
 */
(function() {
  'use strict';

  // ── Scroll Progress Bar ──
  var progressBar = document.getElementById('scrollProgress');
  var raf = null;

  function updateProgress() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
    if (progressBar) {
      progressBar.style.transform = 'scaleX(' + p + ')';
    }
  }

  window.addEventListener('scroll', function() {
    if (raf) return;
    raf = requestAnimationFrame(function() {
      updateProgress();
      raf = null;
    });
  }, { passive: true });

  // ── Ink Reveal Animation ──
  var reveals = document.querySelectorAll('.ink-reveal');
  var observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(function(el) { revealObserver.observe(el); });

  // ── Back to Top ──
  var backBtn = document.getElementById('backToTop');
  if (backBtn) {
    var scrollThreshold = 400;
    var ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          if (window.scrollY > scrollThreshold) {
            backBtn.classList.add('visible');
          } else {
            backBtn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    backBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Ink Splatter Fade on Scroll ──
  var splatters = document.querySelectorAll('.ink-splatter');
  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    splatters.forEach(function(el) {
      var factor = 1 - Math.min(scrollY / (maxScroll * 0.6), 1);
      el.style.opacity = Math.max(0.01, 0.05 * factor);
    });
  }, { passive: true });

  // ── Initial progress bar ──
  updateProgress();

})();
