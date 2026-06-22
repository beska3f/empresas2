(function () {
  'use strict';

  var SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  var io;

  if (window.IntersectionObserver) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  }

  function applyStagger() {
    document.querySelectorAll('[data-stagger]').forEach(function (parent) {
      parent.querySelectorAll(SELECTOR).forEach(function (el, i) {
        if (!el.dataset.staggerSet) {
          el.dataset.staggerSet = '1';
          el.style.setProperty('--stagger', i);
        }
      });
    });
  }

  function observeAll() {
    applyStagger();
    document.querySelectorAll(SELECTOR).forEach(function (el) {
      if (!el.dataset.observed) {
        el.dataset.observed = '1';
        if (io) {
          io.observe(el);
        } else {
          el.classList.add('visible');
        }
      }
    });
  }

  /* Exposed for dynamic content (benefits grid, news grid, etc.) */
  window.revealInit = observeAll;

  if (document.readyState !== 'loading') {
    observeAll();
  } else {
    document.addEventListener('DOMContentLoaded', observeAll);
  }
})();
