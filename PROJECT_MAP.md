# Project Map

This document provides a comprehensive map of the website structure, showing page relationships, shared resources, and repeated patterns. This is particularly useful for AI agents and developers to understand the site architecture at a glance.

## Site Navigation Tree

```
/ (index.html)
├── /about.html
├── /contact.html
├── /posts/
│   └── index.html
└── /projects/
    ├── index.html (Projects overview)
    ├── ai-pm.html (Category page)
    ├── platforms-saas.html (Category page)
    ├── consumer-iot.html (Category page)
    ├── gencog.html
    ├── revenue-io.html
    ├── personal-ai.html
    ├── ucla-ai-for-pm.html
    ├── lynxdx.html
    ├── dealpath.html
    ├── belkin.html
    ├── linksys.html
    ├── wemo.html
    ├── prior.html
    ├── chew.html
    ├── onvio-usability.html
    ├── gyroscope-growth.html
    └── autonomous-vehicles-law-policy.html
```

## Page Link Matrix

### Homepage (`/index.html`)
**Links to:**
- `/about.html` (nav + bio text mention)
- `/contact.html` (nav)
- `/posts/` (nav)
- `/projects/` (nav + section link)
- `/projects/ai-pm.html` (section heading)
- `/projects/platforms-saas.html` (section heading)
- `/projects/consumer-iot.html` (section heading)
- `/projects/prior/` (section heading)
- `/projects/ucla-ai-for-pm.html` (card)
- `/projects/gencog.html` (card)
- `/projects/revenue-io.html` (card)
- `/projects/personal-ai.html` (card)
- `/projects/lynxdx.html` (card)
- `/projects/dealpath.html` (card)
- `/projects/belkin.html` (card)
- `/projects/linksys.html` (card)
- `/projects/wemo.html` (card)
- `/projects/prior/autonomous-vehicles-law-policy.html` (row link)
- `/projects/prior/gyroscope-growth.html` (row link)
- `/projects/prior/chew.html` (row link)
- `/projects/prior/onvio-usability.html` (row link)

**Linked from:**
- All pages (via nav "Home" link)
- Header logo on all pages

### About Page (`/about.html`)
**Links to:**
- Standard nav links (Home, Posts, Projects, Contact)
- External: UCLA Extension course
- External: Revenue.io, LynxDx, Dealpath, Belkin, Linksys, Wemo
- `/mt-whitney` (mentioned but likely doesn't exist yet)

**Linked from:**
- All pages (via nav)
- Homepage bio mentions "About page"

### Contact Page (`/contact.html`)
**Links to:**
- Standard nav links
- External: LinkedIn (in content)

**Linked from:**
- All pages (via nav)

### Projects Index (`/projects/index.html`)
**Links to:**
- Standard nav links
- `/projects/ai-pm.html`
- `/projects/platforms-saas.html`
- `/projects/consumer-iot.html`
- `/projects/prior/`

**Linked from:**
- All pages (via nav)
- Homepage (multiple section links)

### Individual Project Pages
All project pages (e.g., `/projects/gencog.html`, `/projects/revenue-io.html`, etc.) have:
- Standard nav links
- No internal content links (placeholder pages)

**Linked from:**
- Homepage (as cards or row links)
- Category pages (likely)

## Shared Resources

### CSS
| File | Used By | Purpose |
|------|---------|---------|
| `/assets/css/styles.css` | **All pages** | Single CSS file for entire site |

**Note**: Every HTML page has this exact line:
```html
<link rel="stylesheet" href="/assets/css/styles.css">
```

### Fonts
| Stack | Details | Used For |
|-------|---------|----------|
| System sans | `-apple-system`, `BlinkMacSystemFont`, `Inter`, `Segoe UI`, `Helvetica Neue`, `Arial`, `sans-serif` (Inter 300–900 loaded as fallback) | Body text, navigation, general UI |
| SF-inspired mono | `SF Mono`, `JetBrains Mono`, `Fira Mono`, `Menlo`, `Consolas`, `Liberation Mono`, `monospace` | Accents (`.hero-subtitle`, `.projects-group > h2`, `.card .thumb`), inline code |

**Inter fallback loaded via Google Fonts on all pages**:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Images

#### Profile Photo
- **File**: `/assets/img/profile-photo.webp`
- **Used by**: `index.html`
- **Display size**: 220px × 220px (desktop), 160px × 160px (mobile)
- **Format**: WebP

#### Favicon
- **File**: `/assets/img/favicon.svg`
- **Used by**: All pages
- **Format**: SVG

### External Links

All pages link to:
- Google Fonts (https://fonts.googleapis.com)
- LinkedIn profile (footer)
- GitHub profile (footer)
- Twitter/X profile (footer)
- Bluesky profile (footer)
- Medium blog profile (footer)

## Repeated HTML Patterns

### Pattern 1: Header (Exact Duplicate)

**Found in**: All HTML pages
**Lines**: ~15-50 (varies slightly)

The header structure is **identical** across all pages:

```html
<a class="skip-link" href="#content">Skip to content</a>
<header class="site-header">
  <div class="brand">
    <a href="/" class="logo" aria-label="Home">
      <svg>...</svg>
    </a>
    <div class="title">
      <a href="/" class="site-title">Michael Sinanian</a>
      <div class="site-subtitle">AI Product Leader &amp; Educator</div>
    </div>
  </div>
  <nav class="site-nav" aria-label="Primary">
    <a href="/">Home</a>
    <a href="/about.html">About</a>
    <a href="/posts/">Posts</a>
    <a href="/projects/">Projects</a>
    <a href="/contact.html">Contact</a>
  </nav>
  <div class="actions">
    <input id="theme-toggle" type="checkbox" aria-label="Toggle theme (light/dark)" />
    <label class="theme-toggle" for="theme-toggle">
      <span class="theme-toggle__track" aria-hidden="true">
        <span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">🌅</span>
        <span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">🌙</span>
        <span class="theme-toggle__thumb" aria-hidden="true"></span>
      </span>
    </label>
  </div>
</header>
```

**Total pages with this pattern**: 20+ pages

**Modification impact**: To change navigation or header, must update all pages

**Future improvement candidate**: Extract to `/includes/header.html` and load via vanilla JS

---

### Pattern 2: Footer (Single Source via Include)

**Canonical source**: `/includes/footer.html` — edit this file, not individual pages.

Each page carries only a placeholder plus a `<noscript>` fallback:

```html
<footer class="site-footer" id="site-footer">
  <noscript>
    <div style="padding: 1rem; text-align: center;">
      <p style="margin: 0;">© 2026 Michael Sinanian | <a href="/colophon.html">Colophon</a> | <a href="/contact.html">Contact</a></p>
    </div>
  </noscript>
</footer>
```

`/assets/js/includes.js` fetches the partial and injects it into `#site-footer`.

**Copyright year is dynamic.** `/includes/footer.html` contains the literal token
`{{year}}`, which `includes.js` substitutes with `new Date().getFullYear()` at
injection time:

```js
footer.innerHTML = footerHTML.replace(/\{\{year\}\}/g, new Date().getFullYear());
```

**Do not replace `{{year}}` with a hardcoded year.** Doing so reintroduces an
annual manual edit that this token exists to eliminate.

**Do not add an inline `<script>` to the footer partial.** Scripts inserted via
`innerHTML` are never executed per the HTML spec, so it would silently no-op.

**Modification impact**: Social links and footer markup change in one file and
apply site-wide. Only the `<noscript>` year is per-page (see the copyright-year
scenario below).

---

### Pattern 3: Page Header

**Found in**: Content pages (about.html, contact.html, project pages, posts/index.html, projects/index.html)

```html
<section class="page-header">
  <h1>Page Title</h1>
</section>
```

**Used for**: Simple pages with a title and content below

**Styling note**: `.page-header h1` enforces uppercase typography with expanded letter-spacing in `assets/css/styles.css`.

**Not used on**: Homepage (has different intro layout)

---

### Pattern 4: Prose Content Section

**Found in**: About, Contact, project detail pages

```html
<section class="prose">
  <p>Content paragraphs...</p>
  <ul>...</ul>
</section>
```

**Purpose**: Constrains text width to readable line length (~75 characters)

---

### Pattern 5: Project Card

**Found in**: Homepage (index.html)

```html
<a class="card" href="/projects/project-name.html">
  <div class="thumb" aria-hidden="true">Label</div>
  <div class="card-body">
    <h3>Project Name</h3>
    <p>Brief description</p>
  </div>
</a>
```

**Variations**:
- Used in `.grid-2`, `.grid-3`, or `.grid-4` containers
- Thumbnail shows text label (no actual images)
- Entire card is clickable (wrapped in `<a>`)

**Pattern count**: 10 project cards on homepage

---

### Pattern 6: Row Link

**Found in**: Homepage "Prior Projects" section

```html
<a class="row-link" href="/projects/prior/project-name.html">Project Name</a>
```

**Purpose**: Simpler list format for less prominent items

**Pattern count**: 4 row links on homepage

---

### Pattern 7: Simple Grid

**Found in**: `projects/index.html`

```html
<ul class="simple-grid">
  <li><a href="/projects/category.html">Category Name</a></li>
  <li><a href="/projects/category2.html">Category 2</a></li>
</ul>
```

**Purpose**: Two-column grid of category links

---

## HTML Document Structure Template

All pages follow this structure:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Michael Sinanian</title>
  <meta name="description" content="...">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:..." rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <header class="site-header"><!-- PATTERN 1 --></header>
  <main id="content" class="site-main">
    <!-- PAGE-SPECIFIC CONTENT -->
  </main>
  <footer class="site-footer"><!-- PATTERN 2 --></footer>
</body>
</html>
```

**Variations**:
- `<title>` is the same on all pages (should be unique per page)
- `<meta name="description">` is the same on all pages (should be unique per page)
- Main content structure varies by page type

## Resource Dependencies

```
All HTML Pages
├── Depend on: /assets/css/styles.css (critical)
├── Depend on: Google Fonts (non-critical, has fallback)
├── Depend on: /assets/img/favicon.svg (non-critical)
└── Specific pages depend on:
    ├── /assets/img/profile-photo.webp (index.html only)
    └── /assets/icons/*.svg (all pages for footer)

styles.css
└── Defines all visual styling via CSS custom properties
    ├── Light theme (default)
    ├── Dark theme (via prefers-color-scheme)
    └── Manual toggle (via :has(#theme-toggle:checked))
```

## Page Types & Templates

### Type 1: Homepage
- **File**: `index.html`
- **Unique features**: Profile photo, project cards, multiple sections
- **Layout**: `.intro-with-thumb` + multiple `.projects-group` sections

### Type 2: Content Page
- **Files**: `about.html`, `contact.html`
- **Pattern**: `.page-header` + `.prose`
- **Layout**: Simple single-column text content

### Type 3: Index/List Page
- **Files**: `projects/index.html`, `posts/index.html`
- **Pattern**: `.page-header` + `.simple-grid` or `.card-list`
- **Layout**: Grid of links to sub-pages

### Type 4: Project Detail Page
- **Files**: All individual project pages (e.g., `projects/gencog.html`)
- **Current state**: Placeholder with `.page-header` + `.prose`
- **Future**: Will contain project case studies, images, etc.

### Type 5: Category Page
- **Files**: `projects/ai-pm.html`, `projects/platforms-saas.html`, `projects/consumer-iot.html`
- **Note**: Structure unknown (not examined in detail)
- **Likely pattern**: Similar to project detail pages

## Candidates for Future Includes

Based on repeated patterns, these are good candidates for extraction when implementing JavaScript includes:

### Priority 1: Head Tags
- **Extract to**: `/includes/head-common.html`
- **Contains**: Font preconnects, CSS link, favicon
- **Reason**: Identical across all pages
- **Note**: Page-specific meta tags (title, description) should remain in each file

### Priority 2: Navigation
- **Extract to**: `/includes/nav.html`
- **Reason**: Part of header, but could be separate for easier updates
- **Note**: Would need JavaScript to highlight "current page"

## SEO & Meta Information

### Current State
| Page | Title | Meta Description | Status |
|------|-------|------------------|--------|
| All pages | "Michael Sinanian" | "AI Product Leader & Educator. Technical and user-centric product leader..." | ❌ Not unique |

### Recommended Improvements
- Make `<title>` unique per page (e.g., "About - Michael Sinanian")
- Make meta descriptions unique and relevant to page content
- Add Open Graph tags for social sharing
- Add Twitter Card tags
- Add canonical URLs

## Accessibility Features Map

**Implemented on all pages:**
- Skip link (hidden until focused)
- Semantic HTML (header, nav, main, footer)
- ARIA labels on icon buttons
- Alt text on images
- Keyboard navigation support

**Responsive breakpoints:**
- Mobile: < 640px
- Tablet: 641px - 980px
- Desktop: > 980px

## Known Issues & Inconsistencies

1. **Empty Bluesky link** in footer on some pages
2. **Inconsistent social icon implementation**: Some inline SVG, some `<img>` tags
3. **Non-unique page titles**: All pages have the same `<title>` tag
4. **Non-unique meta descriptions**: All pages have the same description
5. **Placeholder search button**: Non-functional, but present in UI
6. **Theme state not persisted**: Resets on page navigation (no localStorage)

## Deployment Flow

```
Developer makes changes
    ↓
Commit to git
    ↓
Push to GitHub (main branch or configured branch)
    ↓
Cloudflare Pages detects push
    ↓
Auto-deploy (no build step)
    ↓
Live site updated
```

**Build command**: None (static files served as-is)
**Publish directory**: `/` (root)

---

## Quick Reference: Common Modification Scenarios

### Scenario: Add a new navigation link
1. Edit header in **all HTML files** (20+ files)
2. Add new `<a>` tag in `<nav class="site-nav">`
3. Test that separators appear correctly

### Scenario: Update copyright year
**No action needed.** The footer in `/includes/footer.html` uses a `{{year}}`
token that `/assets/js/includes.js` replaces with the current year at runtime.

The only static years are the `<noscript>` fallbacks in each HTML page, which
cannot be dynamic by definition and are seen only by clients without JS. If you
want those in sync too:

```bash
git ls-files -z '*.html' | xargs -0 perl -CSD -i -pe 's/\x{00A9} 2026 Michael Sinanian/\x{00A9} 2027 Michael Sinanian/g'
```

(Note: BSD/macOS `sed -i` requires an argument and mangles UTF-8; `perl -CSD`
handles the `©` correctly.)

### Scenario: Add a new project
1. Create `/projects/new-project.html` (copy existing project page)
2. Update content in new file
3. Add card to `index.html` in appropriate section
4. Add link to `/projects/index.html`

### Scenario: Change site colors
1. Edit `/assets/css/styles.css`
2. Update CSS custom properties in `:root`
3. Update dark mode values in `@media (prefers-color-scheme: dark)`
4. Update toggled theme values in `:root:has(#theme-toggle:checked)`

---

**Document version**: 1.1 (2026-07-25)
**Last updated**: 2026-07-25 — footer section rewritten for the include system and dynamic `{{year}}` token
**Maintainer**: AI agents and human developers should keep this updated as site evolves
