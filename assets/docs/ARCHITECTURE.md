# Architecture

A high-level tour of how the site is put together, so any future maintainer (including
future-you) can find their bearings in minutes.

---

## 1. Design principles

| Principle | What it means in practice |
| --- | --- |
| **Static-first** | Every file works without a server. No build step, no framework. |
| **HTML is the source of truth** | Content lives in `index.html`, not in a CMS or database. |
| **CSS by design tokens** | All colours, spacing, fonts come from CSS custom properties at the top of `style.css`. |
| **Tiny, dependency-free JS** | The whole script is one IIFE in `main.js`. No jQuery, no React, no build tools. |
| **Progressive enhancement** | The site works without JS. JS only adds polish (animations, smooth scroll, accordion). |
| **Accessibility is structural** | Landmarks, ARIA, keyboard support, and reduced-motion are baked in, not bolted on. |

---

## 2. File responsibilities

### `index.html` (one page, many sections)

A single-page site organised as labelled `<section>` blocks. Each section:

- Has a stable `id` so nav links and anchors work
- Has a clear class (e.g. `.hero`, `.about`, `.programs`)
- Begins with a comment explaining its purpose

This makes the file easy to **scan** and easy to **rearrange**. To add a section: copy an
existing one. To delete one: remove the whole `<section>…</section>` block (and the
matching nav link).

### `assets/css/style.css` (one file, organised by section)

Single stylesheet, table-of-contents comment at the top, sections numbered 1–18:

1.  Design tokens
2.  Base + reset
3.  Layout primitives
4.  Typography
5.  Buttons
6.  Header + nav
7.  Hero
8.  About
9.  Programs
10. Why us
11. Gallery
12. Testimonials
13. FAQ
14. Contact
15. Footer
16. Utilities
17. Responsive overrides
18. Reduced motion + print

**Why one file?** For a site this size, a single HTTP request is faster than splitting
into many files, and you can `Ctrl-F` to find anything. If the project grows past ~2000
lines of CSS, splitting by section is a reasonable next step.

**CSS architecture pattern used:** loosely BEM-ish. Block names map to sections
(`.program-card`, `.testimonial`, `.faq-item`), elements stack with the block name
(`.testimonial-quote`, `.testimonial-author`). No CSS preprocessor needed.

### `assets/js/main.js` (one IIFE, ten small functions)

Wrapped in an Immediately Invoked Function Expression to avoid leaking anything to the
global scope. Inside, ten small single-responsibility functions:

| Function | Responsibility |
| --- | --- |
| `initNav` | Hamburger toggle, click-outside, escape key, resize-aware |
| `initHeaderScroll` | Adds `.scrolled` class to header after 8px scroll |
| `initSmoothScroll` | Anchor links scroll with sticky-header offset |
| `initCounters` | Animate `[data-count]` when in view |
| `initReveal` | Animate `.reveal` elements when in view |
| `initFaq` | Only-one-open accordion behaviour |
| `initForm` | Client-side validation + status message |
| `initActiveNav` | Highlight current section in primary nav |
| `setYear` | Insert current year into footer |
| `boot` | Calls them all when DOM is ready |

Every function **exits silently** if its target element isn't on the page, so it's safe
to remove a section from the HTML without breaking JS.

### `assets/images/`

Image strategy:

- **One master logo** (`logo.jpg`, 1280×1280) — keep as the source of truth.
- **Three responsive sizes** (`logo-200`, `logo-400`, `logo-800`) — pick the smallest one
  that still looks sharp. (We're not using `<picture>` srcset right now because the
  logo is small; the 400px version is fine for almost every case.)
- **Favicon** at 32×32 (browser tabs, bookmarks).
- **Apple touch icon** at 180×180 (iOS home screen).
- **OG image** at 1200×630 (social-media link previews). Branded background + centered
  logo so the preview looks good even if the scraper doesn't fetch the logo separately.

---

## 3. Layout system

### Container

```css
.container {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

Every section uses `.container` to keep content centered with consistent side padding.
There's also `.container.narrow` (760px max) for text-heavy blocks like the FAQ.

### Two-column

```css
.two-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}
@media (min-width: 880px) {
  .two-col { grid-template-columns: 1.2fr 1fr; gap: 4rem; }
}
```

Used in the About and Contact sections. Mobile-first: stacks to a single column, then
splits on tablet+.

### Auto-fit grids

```css
.program-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}
```

Used for Programs, Why Us, Testimonials, and Footer. Auto-fits as many columns as fit
at the current viewport width. No media queries needed.

---

## 4. Theming via design tokens

All colours, fonts, spacing, radii, and shadows live as CSS custom properties under
`:root`. Changing any single token updates everywhere it's used.

```css
:root {
  --gold:       #d4a13a;   /* change this and every gold updates */
  --brown-700:  #3a2e26;
  --cream:      #fbf7f0;
  /* ... */
}
```

To support a **dark mode** later, you can add a `@media (prefers-color-scheme: dark)`
block that re-declares the same tokens with dark values. The rest of the CSS doesn't
need to change.

---

## 5. JS architecture

The whole file is one IIFE that:

1. Defines `$` and `$$` query helpers at the top.
2. Defines a small `onIntersect` utility (one-shot IntersectionObserver wrapper).
3. Has one function per feature, each checking for required elements before binding.
4. Has a `boot()` that calls them all on `DOMContentLoaded`.
5. Defers loading the file (`<script src="...main.js" defer>`) so it doesn't block
   first paint.

### Why no framework?

For a site this size, a framework would add kilobytes of JavaScript and a build step,
without saving meaningful complexity. Vanilla JS keeps the bundle around **3KB** of
minified-ish source. The only feature that **might** be easier with a framework is the
active-nav highlighting; a 12-line IntersectionObserver does the job.

---

## 6. Accessibility patterns used

- **Skip link** as the first focusable element, visually hidden until focused.
- **Semantic landmarks** (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- **Heading order** is strict (one `<h1>`, then `<h2>` per section, `<h3>` inside).
- **Hamburger button** uses `aria-expanded` and `aria-controls` and toggles
  `aria-label` between "Open menu" and "Close menu".
- **FAQ** uses native `<details>`/`<summary>` (keyboard-accessible for free).
- **All interactive elements** have visible `:focus-visible` outlines.
- **`prefers-reduced-motion`** disables animations and smooth scroll.
- **Form** has `<label>` wrapping inputs (or `for=`/`id` pairs) — never placeholder-only labels.
- **Decorative icons** carry `aria-hidden="true"`.
- **Emoji icons** in program cards are decorative; the card heading is the accessible name.

See [`ACCESSIBILITY.md`](ACCESSIBILITY.md) for the full a11y audit and how to keep the
site strong as you edit.

---

## 7. Performance budget

A reasonable budget for a site like this:

| Asset | Target size | This site |
| --- | --- | --- |
| HTML | < 30 KB | 28 KB |
| CSS | < 30 KB | 25 KB |
| JS | < 15 KB | 11 KB |
| Logo (per size) | < 50 KB | 13–80 KB |
| OG image | < 100 KB | 74 KB |
| **Total first load (excluding fonts)** | < 300 KB | ~150 KB |

Add Google Fonts (~80KB woff2) and you're well under 500KB on first paint — comfortably
fast on 3G.

### Performance optimisations already in place

- `defer` on the script tag.
- `loading="eager"` on the above-the-fold hero logo; everything else can be lazy.
- `font-display: swap` (default in Google Fonts URL) to avoid invisible text.
- `width` / `height` on every `<img>` to prevent layout shift.
- `preconnect` hints to Google Fonts.
- Single CSS, single JS — fewer round trips.

---

## 8. Where to extend

When the school grows, here's where the obvious extensions plug in:

| Need | Where to add it |
| --- | --- |
| Blog / news | New `blog.html`, add a `<section>` of recent posts to home, optionally migrate to a static-site generator like Eleventy or Hugo |
| Multi-language | Duplicate each HTML file, add a language switcher in the header, set `<html lang="...">` per file |
| Online enrolment | Replace the `mailto:` form with Formspree / Web3Forms (see [CUSTOMIZATION.md](CUSTOMIZATION.md) §10) |
| Events calendar | Add a `calendar.html` page or embed a Google Calendar |
| Student portal | Add a new section linking out — the site is for marketing; the portal is a separate app |
| Dark mode | Add a `@media (prefers-color-scheme: dark)` block overriding the `:root` tokens |
| More pages | Duplicate `index.html`, prune to the right sections, update nav and sitemap |

---

## 9. Things we deliberately did NOT do

- **No CSS framework** (Tailwind, Bootstrap). Adds weight and a build step; you don't
  need either for a site this size.
- **No JavaScript framework** (React, Vue, Svelte). Same reasoning.
- **No build pipeline** (Vite, webpack, Parcel). You'd lose the ability to edit a file
  and see the change in two seconds.
- **No CMS.** Content updates are git commits — reviewable, reversible, archival.
- **No tracking by default.** Schools have a duty of care around minors' data; Plausible
  or GA4 only if you genuinely need it.
- **No carousel library** for testimonials. A static grid reads better and is faster.
- **No image carousel** for the gallery. A grid is more accessible and never auto-plays.
