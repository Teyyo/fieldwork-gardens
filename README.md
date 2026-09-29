# Fieldwork Garden Studio

A complete, responsive small-business website for a fictional garden design studio in Bath. Built with semantic HTML, CSS and vanilla JavaScript. No framework, bundler or runtime dependencies.

## Live demo

[Open Fieldwork Garden Studio](https://fieldwork-garden-studio.laszloteodor2008.chatgpt.site)

See `docs/DEPLOYMENT.md` for GitHub Pages setup. The GitHub Pages workflow is included; it needs to be enabled in your own repository.

## Screenshots

Browser screenshots have not been captured in this environment. Once you have reviewed the live site, add your own desktop and mobile screenshots under `docs/screenshots/`. No stock mockup is presented as a screenshot of the implementation.

## Features

- 15 complete pages: home, gallery, four project details, services, three service details, studio, FAQ, enquiry, credits and 404.
- Responsive navigation with keyboard Escape handling and current-page state.
- Category filtering with an announced result count.
- Native image dialog with Escape dismissal and focus restoration.
- Native FAQ disclosures.
- Validated enquiry form, service preselection and downloadable text summary.
- Local responsive WebP images, explicit dimensions and lazy loading below the fold.
- Reduced-motion support, visible focus styles and semantic landmarks.

The form is a frontend demo: it does not send email, store submissions or make bookings. All business details, prices, projects and the testimonial are fictional. Stock photographs illustrate concepts, not real commissions.

## Run locally

You can open `dist/index.html` directly, or serve the site with Python 3:

```sh
python -m http.server 8080 --directory dist
```

On Windows, use `py` if `python` is not available. Open http://localhost:8080. No `npm install` or build step is needed.

## Structure

```text
fieldwork-gardens/
  dist/
    index.html                 # homepage
    gardens.html               # filtered gallery
    services.html              # service overview
    ...                        # remaining complete HTML pages
    assets/
      css/styles.css           # tokens, layouts, components, breakpoints
      js/main.js               # navigation and subtle reveal
      js/gallery.js            # filters and image dialog
      js/contact.js            # validation, preselection and download
      images/                  # five images, two sizes each
  scripts/check_site.py         # dependency-free structural checks
  docs/                        # guides, image credits and QA report
  .github/workflows/pages.yml   # GitHub Pages deployment
```

`dist/` is the editable source AND deployable site, not disposable generated output. Shared header/footer markup is intentionally repeated to keep every page usable without JavaScript. Update all pages when changing shared navigation.

## Checks

```sh
python scripts/check_site.py
node --check dist/assets/js/main.js
node --check dist/assets/js/gallery.js
node --check dist/assets/js/contact.js
node scripts/test-interactions.mjs
```

See `docs/QA.md` for completed checks and the browser-testing limitation. Node is only needed for optional JavaScript checks, not for running the site.

## Responsive design

CSS Grid handles split sections and gallery layouts. At 760px, navigation switches to a disclosure and split layouts stack. At 440px, gallery cards, process steps and form fields become single-column. Fluid heading sizes, flexible containers and responsive image sources adapt between breakpoints.

## Skills demonstrated

Multi-page information architecture, semantic HTML, Grid/Flexbox, responsive images, DOM events, accessible form feedback, progressive enhancement, native dialogs, URL parameters, Blob downloads and static deployment.

## Learning and development

- [Magyar projektmagyarázat és interjúkérdések](docs/PROJECT-GUIDE-HU.md)
- [GitHub feltöltés és valódi commitok](docs/GITHUB-GUIDE-HU.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Image guide and credits](docs/IMAGES.md)

## Future improvements

Connect a real enquiry endpoint with server-side validation, add image-based browser regression checks, introduce shared HTML templates if the site grows, and replace fictional content with an actual client's approved material.

## Attribution

Photography is covered by the Unsplash License; see `docs/IMAGES.md`. This is an AI-assisted starting project. Before presenting it, review and modify the implementation and be ready to explain which work is yours.
