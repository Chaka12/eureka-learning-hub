/* =============================================================================
   Eureka Learning Hub — main.js
   -----------------------------------------------------------------------------
   A small, dependency-free controller for the single-page site.

   Responsibilities:
     1.  Mobile navigation toggle (hamburger)
     2.  Sticky-header "scrolled" class for shadow
     3.  Smooth-scroll offset for the fixed header
     4.  Animated counters (hero stats)
     5.  Reveal-on-scroll for any element with .reveal
     6.  FAQ: enforce "only one item open at a time"
     7.  Contact form: client-side validation + helpful status message
     8.  Active-section highlighting in the primary nav
     9.  Footer year auto-update
    10.  Graceful no-op when an element is missing (no errors thrown)

   The whole file is wrapped in an IIFE so nothing leaks to the global scope.
   =============================================================================
*/
(function () {
  "use strict";

  /* -------------------------------------------------------------------------
     0. Utilities
     ------------------------------------------------------------------------- */
  /** Select a single element. */
  const $ = (sel, root = document) => root.querySelector(sel);
  /** Select multiple elements as an array. */
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** Tiny helper: add a class once an element enters the viewport. */
  const onIntersect = (el, cb, opts = { threshold: 0.15 }) => {
    if (!("IntersectionObserver" in window)) {
      cb(); // Fallback: just run it
      return () => {};
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cb(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  };

  /* -------------------------------------------------------------------------
     1. Mobile navigation
     -------------------------------------------------------------------------
     The hamburger button toggles a class on the nav element. We also close
     the menu when:
       - a nav link is clicked
       - the user clicks outside the open menu
       - the Escape key is pressed
       - the viewport is resized to desktop width
  */
  const initNav = () => {
    const toggle = $("#nav-toggle");
    const nav = $("#primary-nav");
    if (!toggle || !nav) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    // Clicking any link inside the nav closes the mobile menu.
    nav.addEventListener("click", (e) => {
      if (e.target.matches("a")) setOpen(false);
    });

    // Clicking outside the open menu closes it.
    document.addEventListener("click", (e) => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (!isOpen) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });

    // Escape key closes the menu.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    // If the user resizes from mobile to desktop, force the menu closed.
    const mq = window.matchMedia("(min-width: 881px)");
    mq.addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  };

  /* -------------------------------------------------------------------------
     2. Sticky-header "scrolled" state
     ------------------------------------------------------------------------- */
  const initHeaderScroll = () => {
    const header = $("#site-header");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  };

  /* -------------------------------------------------------------------------
     3. Smooth-scroll with sticky-header offset
     -------------------------------------------------------------------------
     The CSS `scroll-behavior: smooth` already handles most browsers, but
     this gives us a small top offset so anchors don't slide under the
     fixed header.
  */
  const initSmoothScroll = () => {
    const header = $("#site-header");
    const getOffset = () => (header ? header.offsetHeight + 8 : 0);

    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - getOffset();
        window.scrollTo({ top, behavior: "smooth" });
        // Update URL hash without an extra jump.
        history.pushState(null, "", id);
      });
    });
  };

  /* -------------------------------------------------------------------------
     4. Animated counters
     -------------------------------------------------------------------------
     Each [data-count] element animates from 0 to its target value once
     it enters the viewport. We use requestAnimationFrame for smoothness
     and respect prefers-reduced-motion via the CSS rule that disables
     transitions.
  */
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic — slow finish, feels natural for counters
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    };
    requestAnimationFrame(step);
  };

  const initCounters = () => {
    $$("[data-count]").forEach((el) => onIntersect(el, () => animateCount(el)));
  };

  /* -------------------------------------------------------------------------
     5. Reveal-on-scroll
     -------------------------------------------------------------------------
     Any element with .reveal fades + slides into place once visible.
     We mark it .is-visible and unobserve (one-shot animation).
  */
  const initReveal = () => {
    $$(".reveal").forEach((el) => onIntersect(el, (node) => node.classList.add("is-visible")));
  };

  /* -------------------------------------------------------------------------
     6. FAQ: only one <details> open at a time
     -------------------------------------------------------------------------
     Native <details>/<summary> is already accessible; we just enforce
     the "accordion" UX by closing siblings when one opens.
  */
  const initFaq = () => {
    const items = $$(".faq-item");
    if (!items.length) return;
    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  };

  /* -------------------------------------------------------------------------
     7. Contact form
     -------------------------------------------------------------------------
     The form action is mailto: — when the user submits, the browser will
     attempt to open their default mail client pre-filled with the form
     contents. This is intentionally dependency-free and works on any
     static host including GitHub Pages.
     If you want a real "submit to server" flow later, swap the action for
     a Formspree / Web3Forms URL and adjust the handler.
  */
  const initForm = () => {
    const form = $("#contact-form");
    const status = $("#form-status");
    if (!form || !status) return;

    form.addEventListener("submit", (e) => {
      // Lightweight validation: rely on the browser for required + type=email.
      if (!form.checkValidity()) {
        e.preventDefault();
        status.textContent = "Please fill in your name, email, and message.";
        status.classList.add("is-error");
        return;
      }
      status.classList.remove("is-error");
      status.textContent = "Opening your email client…";
      // Allow the browser to proceed with the mailto: submit.
    });
  };

  /* -------------------------------------------------------------------------
     8. Active-section nav highlight
     -------------------------------------------------------------------------
     Highlights the matching nav link for whichever section is currently
     in view. Uses rootMargin so a link activates slightly before the
     section's top hits the very top of the viewport.
  */
  const initActiveNav = () => {
    const sections = $$("main section[id]");
    const links = $$(".primary-nav a[href^='#']");
    if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

    const map = new Map();
    links.forEach((a) => {
      const id = a.getAttribute("href").slice(1);
      map.set(id, a);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = map.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove("is-active"));
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
  };

  /* -------------------------------------------------------------------------
     9. Footer year
     ------------------------------------------------------------------------- */
  const setYear = () => {
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear().toString();
  };

  /* -------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------- */
  const boot = () => {
    initNav();
    initHeaderScroll();
    initSmoothScroll();
    initCounters();
    initReveal();
    initFaq();
    initForm();
    initActiveNav();
    setYear();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
