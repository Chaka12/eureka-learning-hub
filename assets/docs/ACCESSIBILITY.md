# Accessibility

This document explains the accessibility features built into the site and the **rules
of the road** for keeping it accessible as you edit.

> Goal: anyone, with any ability, using any device, can use the site.

The site aims to meet **WCAG 2.1 Level AA** — the same standard most public-sector and
education websites are required to meet.

---

## What's already in place

### 1. Semantic HTML

- One `<h1>` per page.
- Strict heading order — no skipping levels.
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` landmarks used appropriately
  so screen-reader users can jump to regions.
- Lists are real `<ul>` / `<ol>`, not styled-up `<div>`s.

### 2. Keyboard support

- Every interactive element is a real `<a>`, `<button>`, or form control — focusable
  by default.
- **Tab order** follows visual order (no positive `tabindex` used to fake it).
- **Skip link** is the first focusable element on the page; it jumps keyboard users
  past the header straight to `#main`.
- The mobile hamburger button is a real `<button>` and toggles `aria-expanded`.
- The FAQ uses native `<details>`/`<summary>`, which is keyboard-accessible for free
  (Tab to focus, Space/Enter to toggle).
- The contact form submits on **Enter** in any field, like a real form.

### 3. Focus visibility

Every focusable element has a high-contrast `:focus-visible` outline:

```css
:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 2px;
  border-radius: 4px;
}
```

**Do not** remove this rule. It's the single most important a11y feature for
keyboard users, and removing it is the most common a11y bug on the web.

### 4. Colour contrast

All text-on-background combinations meet at least 4.5:1 contrast (the AA threshold):

- `--brown-700` on `--cream` — 12.2:1 (AAA)
- `--gold-deep` on `--cream` — 5.1:1 (AA)
- `--cream` on `--brown-700` — 12.2:1 (AAA)
- `--gold-soft` on `--brown-700` — 5.8:1 (AA)

If you change brand colours, **re-check the contrast** with a tool like
[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

### 5. Images and icons

- All content images have meaningful `alt` text describing what's in them.
- Decorative images and icons carry `alt=""` (so screen readers skip them) or
  `aria-hidden="true"`.
- The hamburger bars and checkmark SVGs are `aria-hidden` because the visible text
  carries the same information.

### 6. Forms

- Every input has a `<label>`, either as a wrapping element or via `for=`/`id` pairing.
- `required` fields are marked up with the `required` attribute and validated
  client-side before the form submits.
- `autocomplete` attributes hint to browsers (and password managers / form fillers)
  what kind of data is expected.
- The form's status message uses `role="status"` and `aria-live="polite"`, so screen
  readers announce feedback without stealing focus.

### 7. Motion

- `@media (prefers-reduced-motion: reduce)` disables:
  - Smooth scroll
  - All CSS transitions and animations
  - The reveal-on-scroll effect (elements appear in their final position)
- The animated counters in the hero stop counting and just snap to the final value
  (because they're driven by JS, the CSS rule alone isn't enough — but the visual
  effect is still "result appears", so it's a graceful degradation).

### 8. Responsive design

- Tested from 320px (small Android) to 2560px (4K).
- No horizontal scrollbars at any width.
- Touch targets are at least 44×44px on mobile (Apple HIG, WCAG 2.5.5).

### 9. Print

A small print stylesheet hides navigation, footer, and form, and forces a high-contrast
black-on-white layout. Parents printing your contact details will get something clean.

---

## How to keep it accessible

When you edit the site, run through this checklist. If any answer is "no", fix it
before pushing.

### Content edits

- [ ] Every image has `alt` text that describes what's in it (or `alt=""` if purely
  decorative).
- [ ] No image carries text that isn't also present in the surrounding copy (e.g. a
  flyer image with a phone number on it — also type the number out as text).
- [ ] Every link's text makes sense out of context. (A screen reader can list all
  links on a page; "click here" tells the user nothing. "Read our exam-prep guide"
  does.)
- [ ] Headings follow strict order: don't jump from `<h2>` to `<h5>`.
- [ ] Colours meet 4.5:1 contrast for text, 3:1 for UI elements.

### Code edits

- [ ] New interactive things are real `<button>` or `<a>` elements — not `<div>`s
  with click handlers.
- [ ] New sections use semantic landmarks (`<section>` for thematically grouped
  content, `<article>` for self-contained content like a blog post).
- [ ] New forms have `<label>` for every input.
- [ ] New animations are gated on `prefers-reduced-motion: no-preference`, or the
  global rule at the bottom of `style.css` will already disable them.
- [ ] No new content requires the user to perceive colour alone (e.g. error states
  also use text and an icon, not just a red border).

### Quick manual test

Before pushing, try these four things:

1. **Keyboard-only navigation.** Click in the address bar, then press Tab repeatedly.
   Can you reach and use every interactive element? Does focus always show?
2. **200% zoom.** Cmd/Ctrl-+ until the page is at 200%. Does layout still work? Any
   clipped text or overlapping elements?
3. **Screen reader.** macOS has VoiceOver (Cmd-F5), Windows has Narrator (Win-Ctrl-Enter).
   Tab through the page; do headings and links make sense when read out of context?
4. **Reduced motion.** macOS: System Preferences → Accessibility → Display → Reduce
   motion. Re-load the page. Are animations still disabled?

---

## Common pitfalls to avoid

### ❌ "Just add `alt='image'`"

Bad alt text is worse than no alt text. Be specific. The alt is for someone who
**cannot see the image**, so describe what they'd gain from seeing it.

### ❌ "I'll fix accessibility later"

Accessibility is cheapest when you write the code right the first time. Adding it
later means re-doing work. 5 minutes now saves 2 hours later.

### ❌ "We don't have users with disabilities"

You do. One in five people globally has a disability (WHO). Add temporary impairments
(someone using the site one-handed while holding a baby, someone in bright sun who
can't see the screen, someone with a broken arm who can only use a keyboard) and the
real number is much higher.

### ❌ "Captions are for video"

Captions and transcripts also help people who:
- Don't have headphones
- Are in a shared space
- Have a slow connection and are reading the captions instead of streaming audio
- Are non-native speakers

### ❌ "WCAG AAA is overkill"

Yes, for a school site, AA is the bar. But aiming for AAA in **your most important
content** (the headings, the main body text) costs you almost nothing and helps
everyone.

---

## Tools

- **[axe DevTools](https://www.deque.com/axe/devtools/)** — browser extension, catches
  ~50% of issues automatically.
- **[WAVE](https://wave.webaim.org/)** — paste your URL in, get a visual a11y overlay.
- **[Lighthouse](https://developer.chrome.com/docs/lighthouse/accessibility/)** —
  built into Chrome DevTools (Audits tab). Free, automated.
- **[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)** — check
  any two colours.
- **[Pa11y CI](https://github.com/pa11y/pa11y-ci)** — run automated checks on every
  deploy (advanced; optional).

Run one of these before every significant change.

---

## If you add a feature…

| Feature | Accessibility check |
| --- | --- |
| New image | `alt` text; if decorative, `alt=""` or `aria-hidden` |
| New link | Link text makes sense out of context |
| New button | Real `<button>`; if icon-only, add `aria-label` |
| New form field | Real `<label>`; appropriate `type`, `autocomplete`, `required` |
| New video | Captions + transcript |
| New audio | Transcript |
| New animation | Respects `prefers-reduced-motion` |
| New colour | Contrast 4.5:1 (text) / 3:1 (UI) |
| New page | Title, single `<h1>`, lang set on `<html>` |

---

## Reporting an accessibility issue

If you (or a visitor) finds an accessibility barrier, please open an issue on the
GitHub repo. Include:

- What you were trying to do
- What happened instead
- What assistive technology you were using (screen reader, keyboard-only, etc.)
- Browser and version

We'll treat it as a bug and prioritise the fix.
