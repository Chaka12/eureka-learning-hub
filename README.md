# Eureka Learning Hub — Website

A fast, accessible, single-page website for **Eureka Learning Hub** — *“Say It and It Becomes.”*

Built with pure HTML5, CSS3, and vanilla JavaScript. No build step, no npm, no frameworks.
Designed to be hosted for free on **GitHub Pages**.

> **Live site:** add your GitHub Pages URL after deployment.
> **Repo:** add your GitHub repo URL after publishing.

---

## ✨ Features

- 📱 Mobile-first, fully responsive layout
- ♿ Accessible (semantic HTML, ARIA, keyboard-friendly, skip-to-content link)
- 🚀 Fast — single small CSS file, single small JS file, web-optimised images
- 🔍 SEO-ready — Open Graph, Twitter cards, JSON-LD structured data, sitemap, robots.txt
- 🎨 Brand-themed using colours drawn directly from the school seal
- 🖼️ Branded gallery placeholders (drop in your real photos any time)
- 📬 Contact form using `mailto:` (zero backend) — easy to upgrade later
- ❓ Accessible FAQ using native `<details>`/`<summary>`
- 📊 Animated hero counters (IntersectionObserver)
- 🍔 Mobile hamburger navigation
- 🌓 Respects `prefers-reduced-motion`
- 🖨️ Print-friendly stylesheet

---

## 🗂 Project structure

```
eureka-learning-hub/
├── index.html              ← the single page of the site
├── 404.html                ← branded not-found page
├── robots.txt              ← crawler instructions
├── sitemap.xml             ← sitemap (edit after deploying)
├── CNAME                   ← custom-domain hook (optional)
├── .nojekyll               ← tells GitHub Pages to skip Jekyll
├── .gitignore
├── README.md               ← you are here
├── LICENSE
├── assets/
│   ├── css/
│   │   └── style.css       ← all styles, organised by section
│   ├── js/
│   │   └── main.js         ← all behaviour, wrapped in an IIFE
│   ├── images/             ← logo, favicon, OG image
│   │   ├── logo.jpg
│   │   ├── logo-800.jpg
│   │   ├── logo-400.jpg
│   │   ├── logo-200.jpg
│   │   ├── favicon-32.png
│   │   ├── apple-touch-icon.png
│   │   └── og-image.jpg
│   └── docs/               ← detailed documentation
│       ├── DEPLOYMENT.md
│       ├── CUSTOMIZATION.md
│       ├── ARCHITECTURE.md
│       ├── CONTENT_GUIDE.md
│       └── ACCESSIBILITY.md
```

---

## 🚀 Quick start (deploy in 5 minutes)

1. **Create a GitHub repo.** Name it `eureka-learning-hub` (or anything you like).
2. **Push the contents of this folder** to the `main` branch.
3. **Enable GitHub Pages:**
   *Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)`.*
4. Wait ~30 seconds. Your site is live at
   `https://YOUR-USERNAME.github.io/eureka-learning-hub/`.
5. Find/replace `YOUR-USERNAME` in:
   - `index.html` (canonical URL, Open Graph, Twitter, JSON-LD)
   - `robots.txt` (sitemap URL)
   - `sitemap.xml` (page URL)

That's it. See **[`assets/docs/DEPLOYMENT.md`](assets/docs/DEPLOYMENT.md)** for the full walkthrough,
including custom domains, HTTPS, and analytics.

---

## 🛠 Customising the content

Most of what you'll want to change lives in **`index.html`**. Each section is wrapped in a
clearly named `<section class="section ..." id="...">` with a comment explaining its purpose.

Common edits:

| What you want to change | Where to edit |
| --- | --- |
| School name, tagline, contact details | `index.html` → `<title>`, hero, contact, footer |
| Programs offered | `index.html` → `#programs` section |
| Testimonials | `index.html` → `#testimonials` section |
| FAQ | `index.html` → `#faq` section |
| Gallery photos | replace the `.gallery-img` placeholders with `<img>` tags |
| Brand colours | `assets/css/style.css` → `:root` design tokens |
| Form destination email | `index.html` → `#contact` form `action="mailto:..."` |

For a guided tour, see **[`assets/docs/CUSTOMIZATION.md`](assets/docs/CUSTOMIZATION.md)**.

---

## 📖 Documentation

- **[Deployment guide](assets/docs/DEPLOYMENT.md)** — push to GitHub, set up Pages, custom domains, analytics
- **[Customisation guide](assets/docs/CUSTOMIZATION.md)** — edit copy, swap images, change colours
- **[Architecture](assets/docs/ARCHITECTURE.md)** — file layout, naming, CSS architecture, JS modules
- **[Content guide](assets/docs/CONTENT_GUIDE.md)** — how to write for a school site (and what to put in each section)
- **[Accessibility](assets/docs/ACCESSIBILITY.md)** — a11y features built into the site, and how to keep them strong

---

## 🧪 Local preview

You don't need any tooling. To preview locally:

```bash
# macOS / Linux — open in your default browser
open index.html

# or start a tiny static server (recommended so absolute paths work)
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 📄 Licence

MIT — see [`LICENSE`](LICENSE). You're free to use, modify, and ship this site under your
school's branding. A small credit in the footer ("Built with care · Hosted on GitHub Pages")
is appreciated but not required.

---

## 💬 Maintainer

Questions or changes? Open an issue on the GitHub repo or contact
[hello@eurekalearninghub.example](mailto:hello@eurekalearninghub.example).
