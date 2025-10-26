# Editkaro.in — Portfolio

A simple, static portfolio website for Editkaro.in. This repository contains the source files (HTML, CSS, and optional JavaScript) for a personal/agency portfolio site that showcases services, projects, and contact information.

This project is a lightweight, responsive static site intended to be easy to customize and deploy (for example, using GitHub Pages or any static hosting provider).

---

## Table of contents

- About
- Features
- Tech stack
- Preview
- Getting started
  - Prerequisites
  - Run locally
- Project structure
- Customize
- Deploy
- Contributing
- License
- Contact

---

## About

The repository hosts the front-end source for the Editkaro.in portfolio. It is built as a static site so it can be edited directly, previewed locally, and published quickly.

---

## Features

- Clean, minimal portfolio layout
- Responsive CSS (mobile-first)
- Sections for About, Services, Portfolio/Projects, Testimonials, Contact
- Easy to edit content (single-file or modular HTML)
- Ready for static hosting (GitHub Pages, Netlify, Vercel, etc.)

---

## Tech stack

- HTML (static pages)
- CSS (primary language used in the repo)
- Optional JavaScript for interactive bits (if present or added)

---

## Preview

Open index.html in your browser to preview the site locally. If you'd like a live-reload experience, use a simple static file server (examples below).

---

## Getting started

### Prerequisites

You only need a modern web browser. For a local server, optionally have:

- Python 3 (for python -m http.server)
- Node.js with `live-server` (optional)

### Run locally

1. Clone the repository:

```bash
git clone https://github.com/Vamshikrishan/Editkaro.in_portfolio.git
cd Editkaro.in_portfolio
```

2. Open index.html directly in your browser:

- Double-click index.html
- or run a simple server:

Using Python 3:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Using npm live-server:

```bash
npx live-server
# opens the site in your default browser with live reload
```

---

## Project structure

A typical structure for a static portfolio site in this repository may look like:

```
/ (root)
├─ index.html
├─ about.html (optional)
├─ contact.html (optional)
├─ css/
│  └─ styles.css
├─ js/
│  └─ main.js (optional)
├─ images/
│  └─ ...
└─ assets/
   └─ ...
```

If your repository differs, inspect the root for `index.html` and the `css/` folder.

---

## Customize

- Update text in `index.html` (or other HTML files) to change content.
- Edit `css/styles.css` (or main stylesheet) to change colors, typography, spacing.
- Replace images in `images/` with your own assets (optimize for web).
- Add or remove sections (Portfolio, Services, Testimonials) as needed.

Example: changing the primary color in CSS

```css
:root {
  --primary-color: #1e90ff; /* change to your brand color */
}
```

---

## Deploy

GitHub Pages (quick):

1. Push your changes to the repository.
2. Go to GitHub → repository Settings → Pages.
3. Under "Build and deployment", select "Deploy from a branch".
4. Choose `main` branch and `/ (root)` folder, then save.
5. Your site will be available at: https://<your-username>.github.io/<repo-name>/ (may take a few minutes).

Other options: Netlify, Vercel, Firebase Hosting — all support static sites and provide CI/CD integration.

---

## Contributing

Contributions are welcome! Typical contributions include:

- Fixes or improvements to HTML/CSS
- Performance and accessibility improvements
- Adding documentation or examples
- Replacing placeholder content with real content

If you'd like me to help create a CONTRIBUTING.md, open issues, or create a PR with changes, tell me what you'd like to change.

---

## License

No license file is included in the repository by default. If you want to open-source this project, add a LICENSE file (for example, MIT) to define permissions and limitations.

---

## Contact

Repository: https://github.com/Vamshikrishan/Editkaro.in_portfolio

Live link: https://poetic-elf-edc838.netlify.app/
If you want help customizing, deploying, or adding features (SASS, build tools, CMS integration), let me know what you want and I can generate specific edits or files.
