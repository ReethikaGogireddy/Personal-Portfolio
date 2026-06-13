// src/utils/scrollReveal.js
// Global scroll reveal utility using IntersectionObserver.
// Usage: add class "reveal" to section(s). Optionally add "reveal-child" to direct children.
// The function returns a disconnect() function so it can be cleaned up.

export default function initScrollReveal({
  root = null,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.12,
  once = true,
  staggerBase = 80, // ms per child
} = {}) {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!els.length) return () => {};

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      // add active class to reveal element
      el.classList.add("active");

      // optional stagger for children
      const children = Array.from(el.querySelectorAll(".reveal-child"));
      if (children.length) {
        children.forEach((child, i) => {
          const dataDelay = parseInt(child.dataset.delay || "0", 10);
          const order = child.dataset.order ? parseInt(child.dataset.order, 10) : i;
          child.style.transitionDelay = `${dataDelay + order * staggerBase}ms`;
        });
      }

      if (once) observer.unobserve(el);
    });
  }, { root, rootMargin, threshold });

  els.forEach((el) => io.observe(el));

  // return cleanup function
  return () => io.disconnect();
}
