# Deployment Guide

A complete, step-by-step guide to putting your site on the public internet **for free** using
GitHub Pages. Includes optional extras: custom domain, HTTPS, and analytics.

> **Time to first deploy:** ~5 minutes
> **Cost:** $0

---

## 1. Prerequisites

- A **GitHub account** (free). Sign up at [github.com](https://github.com).
- **Git** installed on your computer. ([Download here](https://git-scm.com/downloads).)
- The contents of this project folder. You can keep the project as-is, or rename the folder
  to anything you like.

> 💡 If you've never used the command line, you can skip the terminal entirely and use
> **GitHub's web UI** — see option B below.

---

## 2. Create a new repository

1. Go to [github.com/new](https://github.com/new).
2. Fill in:
   - **Repository name:** `eureka-learning-hub` (or your school name)
   - **Description:** "Eureka Learning Hub — official website"
   - **Visibility:** Public (required for free GitHub Pages)
3. **Do not** check "Add a README file" — we'll push the project files ourselves.
4. Click **Create repository**.

GitHub will then show you commands for the next step. Keep that page open.

---

## 3. Push your site to GitHub

### Option A — command line (recommended)

From inside the project folder, run:

```bash
# Initialise a git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit — Eureka Learning Hub site"

# Add GitHub as the remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/eureka-learning-hub.git

# Push to the main branch
git branch -M main
git push -u origin main
```

If GitHub asks you to sign in, follow the prompts (you may need a
[personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
if you have 2FA enabled).

### Option B — web upload (no terminal)

1. On the new repo page, click **uploading an existing file** (or "Add file → Upload files").
2. Drag the **contents** of the project folder (not the folder itself) into the page.
3. Scroll down, click **Commit changes**.

> ⚠️ The web upload loses folder structure for nested assets. We recommend the command
> line for a clean push.

---

## 4. Turn on GitHub Pages

1. In your repository, click **Settings** (top tab).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment**:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` · **Folder:** `/ (root)`
4. Click **Save**.

GitHub will build your site and show you the URL:

```
https://YOUR-USERNAME.github.io/eureka-learning-hub/
```

The first build takes 30–60 seconds. Refresh the *Pages* settings page to see the
"✓ Your site is live" message.

---

## 5. Find-and-replace the placeholder URL

The repo has a few `YOUR-USERNAME` placeholders that need your real GitHub username so
social-media previews and search engines work right. Use any find-and-replace tool to swap
**all** occurrences in these files:

| File | What to find | Replace with |
| --- | --- | --- |
| `index.html` | `YOUR-USERNAME` | your GitHub username |
| `robots.txt` | `YOUR-USERNAME` | your GitHub username |
| `sitemap.xml` | `YOUR-USERNAME` | your GitHub username |

Then commit and push the change. GitHub Pages rebuilds in seconds.

---

## 6. Test it

Open the site URL in a browser. Things to verify:

- [ ] Logo loads
- [ ] All sections render (About, Programs, Why Us, Gallery, Stories, FAQ, Contact)
- [ ] Mobile menu opens and closes
- [ ] FAQ items open and close
- [ ] Hero counters animate
- [ ] Contact form triggers your email client when submitted
- [ ] Links to Facebook open in a new tab

---

## 7. Using a custom domain (optional)

Want `www.eurekalearninghub.org` instead of the GitHub URL?

1. **Buy the domain** from a registrar (Namecheap, Google Domains, Cloudflare, etc.).
2. **Configure DNS** at your registrar. Two common setups:
   - **Apex domain** (`eurekalearninghub.org`): point four `A` records to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - **Subdomain** (`www.eurekalearninghub.org`): point a `CNAME` record to
     `YOUR-USERNAME.github.io`.
3. **Edit the `CNAME` file** in this project. Replace the example line with your real
   domain (one line, no `http://`):
   ```
   www.eurekalearninghub.org
   ```
4. **In GitHub:** *Settings → Pages → Custom domain* → enter your domain → Save.
5. Wait for DNS to propagate (5 minutes to 24 hours). GitHub will auto-provision
   a Let's Encrypt HTTPS certificate once DNS resolves.

---

## 8. Analytics (optional, but recommended)

### Plausible (privacy-friendly, recommended)

1. Sign up at [plausible.io](https://plausible.io).
2. Add your domain.
3. Plausible will give you a one-line script. Paste it just before `</body>` in
   `index.html`:
   ```html
   <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
   ```
4. Push. Done.

### Google Analytics

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com).
2. Copy the snippet and paste before `</head>` in `index.html`.
3. Push.

> 💡 Use a privacy-friendly option if your school is in a region with strict data laws
> (EU, UK, California). Plausible is cookie-free and GDPR-compliant out of the box.

---

## 9. Updating the site later

Any time you want to change content:

```bash
# Edit files
git add .
git commit -m "Update contact details"
git push
```

GitHub Pages rebuilds automatically. Changes are live in 10–30 seconds.

---

## 10. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Page is blank after deploy | First build hasn't finished | Wait 60s, hard-refresh (Ctrl/Cmd-Shift-R) |
| CSS/JS missing on the live site | Wrong file casing | GitHub Pages is case-sensitive. Match exact casing in `<link>` / `<script>` tags. |
| 404 on a page | Repo name ≠ URL path | URL must match repo name. Renaming the repo changes the URL. |
| Custom domain stuck on "not yet detected" | DNS not propagated | Wait up to 24h, or test with `dig yourdomain.com` |
| Form submit does nothing | User has no mail client configured | Add Formspree / Web3Forms (see [CUSTOMIZATION.md](CUSTOMIZATION.md) → Contact form) |
| Old content showing | Browser cache | Hard refresh (Ctrl/Cmd-Shift-R) |

If you get stuck, the [GitHub Pages docs](https://docs.github.com/en/pages) are excellent.

---

## 11. Backup & ownership tips

- **Treat the GitHub repo as the source of truth.** All your content lives in git history
  — you can roll back to any previous version with one command.
- **Add a second maintainer** under *Settings → Collaborators*. Two people with admin
  access means no single point of failure.
- **Export periodically.** GitHub lets you download a `.zip` of the entire repo at any
  time under the green *Code* button.
