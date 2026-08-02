# Customisation Guide

This guide shows you **where** to change things and **how** to change them safely.
Every example is line-numbered so you can jump straight to it.

> If you haven't read [`DEPLOYMENT.md`](DEPLOYMENT.md) yet, do that first. Push the
> site as-is, get it live, then come back here to customise.

---

## 1. Page metadata (title, description, social previews)

**File:** `index.html` — top of the file, inside `<head>` (lines ~7–50).

| Tag | What it does | When to update |
| --- | --- | --- |
| `<title>` | Browser tab + Google result headline | Always — this is your homepage title |
| `meta name="description"` | Google result snippet | Every time your main offering changes |
| `og:image` / `twitter:image` | Image shown when shared on social media | When you change the OG image |
| `link rel="canonical"` | Tells search engines the "real" URL | After you set up a custom domain |

**Replace `YOUR-USERNAME`** in this file (and in `robots.txt` / `sitemap.xml`) with your
actual GitHub username. Use a global find-and-replace.

---

## 2. Brand colours

**File:** `assets/css/style.css` — top of the file, inside `:root` (lines ~17–40).

The palette is **sampled directly from the school seal**. To re-theme:

```css
:root {
  --gold:        #d4a13a;   /* the warm amber ring */
  --gold-soft:   #e6b85a;   /* lighter highlight */
  --gold-deep:   #a87a1c;   /* deep gold, used for accents */
  --brown:       #5b4636;   /* mid-brown */
  --brown-700:   #3a2e26;   /* dark band of the seal */
  --brown-900:   #221b15;   /* footer background */
  --cream:       #fbf7f0;   /* page background */
  --cream-deep:  #f3ecdf;   /* alternating section background */
  --line:        #e8dcc4;   /* border colour */
}
```

> 💡 **Tip:** if you ever want a different colour scheme, change the values here and the
> whole site re-themes automatically. Don't hunt through the rest of the file for colour
> literals.

---

## 3. Hero section (top of page)

**File:** `index.html` — search for `id="top"` (around line ~135).

What you'll likely want to change:

- **Tagline** (line ~140): `"Say It and It Becomes."` — keep it if it's your official
  motto; otherwise replace.
- **Subtitle** (line ~142): the one-sentence description of the school.
- **Call-to-action buttons** (lines ~145–148): change the button text and `href` if
  your enrolment flow is different.
- **Stats** (lines ~151–162): change the `data-count` values to your real numbers
  (students served, tutors, years). They animate from 0 to that number when scrolled
  into view.

---

## 4. About section

**File:** `index.html` — search for `id="about"` (around line ~170).

Replace the paragraphs with your real story. The right-hand "card" contains three
sub-blocks — **Mission**, **Vision**, **Values** — each is a `<h3>` followed by a `<p>`.
Edit them in place.

---

## 5. Programs

**File:** `index.html` — search for `id="programs"` (around line ~200).

Each program is a `<li class="program-card">`. To change one:

```html
<li class="program-card">
  <div class="program-icon" aria-hidden="true">📚</div>     <!-- swap emoji -->
  <h3>Core Tutoring</h3>                                     <!-- program name -->
  <p>One-on-one and small-group support...</p>               <!-- description -->
</li>
```

To add a new program: copy any `<li class="program-card">…</li>` block and paste it at
the end of the `.program-grid` list. To remove one: delete the whole `<li>…</li>`.

> 💡 **Emoji icons** are used for portability (no external icon library needed). If you
> prefer line icons, swap the emoji `<div>` for an inline `<svg>` and style it with the
> `.why-icon` class for a consistent look.

---

## 6. "Why us" list

**File:** `index.html` — search for `id="why"` (around line ~245).

Six trust points, each a `<li>` with an inline SVG checkmark. To change one, just edit
the `<h3>` and `<p>` inside the `<li>`. To add a seventh, copy any `<li>…</li>` and
paste at the end of `.why-grid`.

---

## 7. Gallery (replace placeholders with real photos)

**File:** `index.html` — search for `id="gallery"` (around line ~290).

The current code uses CSS-only "placeholder" tiles. To put real photos in:

### Step 1 — drop images into the project

Save your photos to `assets/images/gallery/` (create the folder). Aim for ~1200px wide
JPEG/PNG. Use tools like [squoosh.app](https://squoosh.app) to compress.

### Step 2 — replace each placeholder

Find:
```html
<div class="gallery-img" data-label="Classroom"></div>
```

Replace with:
```html
<img
  src="assets/images/gallery/classroom.jpg"
  alt="Students working together in the Eureka Learning Hub classroom"
  class="gallery-img-real"
  loading="lazy"
  width="800"
  height="600"
/>
```

### Step 3 — add the new style

Append to the bottom of `assets/css/style.css`:

```css
.gallery-img-real {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  transition: transform .3s ease;
}
.gallery-item:hover .gallery-img-real { transform: scale(1.02); }
```

> 💡 Always include meaningful `alt` text describing the photo — it helps both
> accessibility and Google Images SEO.

---

## 8. Testimonials

**File:** `index.html` — search for `id="testimonials"` (around line ~330).

Each testimonial is a `<li class="testimonial">`. To add one, copy any block and edit
the quote + author. **Always get written permission** from the family before publishing
their words.

---

## 9. FAQ

**File:** `index.html` — search for `id="faq"` (around line ~370).

Each item is a `<details class="faq-item">` with a `<summary>` (the question) and a
`<p>` (the answer). To add a new question, copy any `<details>…</details>` block and
edit both. The accordion "only one open at a time" behaviour is automatic.

**Good FAQ questions for a school:**

- What ages do you teach?
- What does a typical week look like?
- How do you measure progress?
- What are your fees / do you offer scholarships?
- How do I enrol my child?
- Do you offer online or hybrid classes?
- What is your cancellation / refund policy?

---

## 10. Contact details

**File:** `index.html` — search for `id="contact"` (around line ~415).

| What | Where | Notes |
| --- | --- | --- |
| Email | `mailto:hello@...` (3 places: link in `contact-list`, form `action`, and footer) | Replace with your real email |
| Phone | `<a href="tel:...">` | Use international format, e.g. `+254712345678` |
| Facebook | `<a href="..." target="_blank">` | Already filled in — keep or change |
| Address | `.contact-list` and footer | Add a Google Maps `<iframe>` if you want a map |
| Hours | `.contact-list` and footer | Edit as needed |

### Upgrading the contact form

Right now the form uses `mailto:`, which opens the visitor's email client. Most users
have one, but some don't. To upgrade to a real "submit to your inbox" form, use a
free service:

**Option 1 — Formspree** (5 min, free tier = 50 submissions/month)
1. Sign up at [formspree.io](https://formspree.io).
2. Create a form, copy the endpoint URL (looks like `https://formspree.io/f/abcd1234`).
3. In `index.html`, change the form's `action` attribute to that URL and add
   `method="POST"`.
4. Remove `enctype="text/plain"`.

**Option 2 — Web3Forms** (no signup, free)
1. Get a free access key at [web3forms.com](https://web3forms.com).
2. Add a hidden field to the form:
   ```html
   <input type="hidden" name="access_key" value="YOUR-ACCESS-KEY" />
   ```
3. Set `action="https://api.web3forms.com/submit"` and `method="POST"`.

Either way, also update the `initForm` function in `assets/js/main.js` to remove the
`mailto:` behaviour and just show a success message after submit.

---

## 11. Footer

**File:** `index.html` — search for `<footer class="site-footer">` (around line ~480).

Edit brand name, address, and hours in place. The auto-updating year is in
`#year` and is set by `main.js`.

---

## 12. Fonts

**File:** `index.html` — search for `fonts.googleapis.com` (line ~62).

We're using:
- **Playfair Display** (display, italic-friendly) for headings — gives an academic, classic feel
- **Inter** (sans-serif) for body — clean, highly readable

To change fonts:
1. Pick a pair on [fonts.google.com](https://fonts.google.com) that fits your school vibe.
2. Replace the URL in the `<link>` tag.
3. Update `--font-display` and `--font-body` in `style.css` (top of file).

> 💡 Loading Google Fonts adds ~100ms to first paint. If you ever need to be ultra-fast
> (e.g. on slow rural connections), self-host the WOFF2 files and reference them with
> `@font-face` instead.

---

## 13. The 404 page

**File:** `404.html`.

This is what visitors see if they hit a broken link. The branding matches the main
site. You can edit the text and link targets in place — no other config required,
GitHub Pages serves this automatically.

---

## 14. Adding a new section

If you outgrow a single page:

1. Copy any existing `<section class="section ..." id="...">` block.
2. Give it a unique `id`.
3. Add a matching `<li><a href="#new-id">…</a></li>` to the nav in `<header>`.
4. (Optional) Add a new design token to `style.css` if you need new colours.

If you want **multiple pages** (e.g. `/about.html`, `/programs.html`):

1. Duplicate `index.html` → `about.html`, etc.
2. Remove the sections that aren't relevant to that page.
3. Update the `<title>` and `<nav>` so the current page is marked active.
4. Update `sitemap.xml` with the new URLs.
