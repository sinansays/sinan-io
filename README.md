# sinan.io Personal Website

A clean, performant static website built with plain HTML and CSS.

## Overview

sinan.io is the personal portfolio and professional website of Michael Sinanian, showcasing career projects, teaching work, and writing. The site is a labor of love that emphasizes simplicity, accessibility, and fast load times through a deliberately minimal tech stack.

**Live Site**: [sinan.io](https://sinan.io) (or configured domain)

## Philosophy & Purpose

This site intentionally uses **no JavaScript frameworks** and **no build process**. The goal is:
- **Fast performance**: Static HTML/CSS loads instantly with no bundle overhead
- **Simplicity**: Easy to understand, modify, and maintain
- **Accessibility**: Semantic HTML with ARIA labels and keyboard navigation
- **Durability**: No dependencies to update, no toolchain to maintain

The site doesn't need heavy frameworks because its interactive features are minimal (just theme switching via CSS).

## Tech Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with custom properties (CSS variables) for theming
- **Vanilla JavaScript**: Ultra-lightweight JS for header/footer includes and current page highlighting
- **Fonts**: System-first sans stack (San Francisco on Apple devices, Inter elsewhere) with a crisp SF-inspired mono stack reserved for code snippets
- **Hosting**: Cloudflare Pages (automatic deployment from git)
- **Theme toggle**: CSS-only checkbox pattern (no JavaScript required) presented as an iOS-style control with Lucide Sun and Moon icons
- **No build process**: Files are served exactly as written (no bundling, transpiling, or preprocessing)

## File Structure

See: PROJECT_MAP.md

## Key Design Patterns

### Header/Footer Includes (Vanilla JS)
The site uses ultra-lightweight vanilla JavaScript to load shared header and footer HTML from `/includes/` directory. This eliminates code duplication across the many pages while maintaining the no-build-process philosophy.

**How it works:**
- Each HTML page has placeholder `<header>` and `<footer>` tags with `noscript` fallbacks
- `/assets/js/includes.js` fetches both fragments in parallel and injects them
- Adds `aria-current="page"` attribute to highlight the current page in navigation
- Graceful degradation: users without JS see basic navigation links via `<noscript>` tags

### Page Templates
The site uses three main page templates:

1. **Homepage** (`index.html`): Profile intro + categorized project cards
2. **Content pages** (`about.html`, `contact.html`, project detail pages): Page header + prose content
3. **Index pages** (`projects/index.html`, `posts/index.html`): Grid/list of links

### Card Layouts
Projects are displayed using card grids with different column counts:
- `.grid-2`: 2 columns (falls back to 1 on mobile)
- `.grid-3`: 3 columns (2 on tablet, 1 on mobile)
- `.grid-4`: 4 columns (2 on tablet, 1 on mobile)

### Theme System
The site supports light/dark modes via:
1. OS preference detection: `@media (prefers-color-scheme: dark)`
2. Manual toggle: `#theme-toggle` checkbox flips theme
3. CSS custom properties for all colors

### Typography & Navigation
- Headings, hero copy, and card elements now rely on the system sans stack for a cohesive voice, with monospace reserved exclusively for inline `code`/`pre` content.
- Site title, subtitle, header/footer navigation, and page-level H1 headings are set in uppercase with modern letter-spacing to create intentional, elegant hierarchy.

## CSS Architecture

The single `styles.css` file is organized into sections:

1. **Footer social icons** (lines 1-48)
2. **CSS reset** (lines 50-57)
3. **Theme variables** (lines 59-130)
4. **Layout & typography** (lines 132-300)

All colors are defined as CSS custom properties (`--bg`, `--text`, `--accent`, etc.) that switch based on theme state.

## Current Deployment Process

1. Make changes to HTML/CSS files locally
2. Commit and push to the `main` branch (or configured branch)
3. Cloudflare Pages automatically detects the push
4. Cloudflare builds (no build command needed) and deploys
5. Site updates live within seconds

**No build configuration required** - Cloudflare serves the static files as-is.

## Development Workflow

### Local Development
1. Open HTML files directly in a browser, or
2. Use a simple local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (if http-server is installed)
   npx http-server -p 8000
   ```
3. Navigate to `http://localhost:8000`

### Making Changes
- Edit HTML files to update content or structure
- Edit `assets/css/styles.css` to update styling
- Changes are immediately visible on refresh (no build step)

### Accessibility Testing
- Test keyboard navigation (Tab, Enter, Space)
- Verify skip link works (Tab on page load)
- Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- Check color contrast in both light and dark modes

### Browser Testing
Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (especially for WebP images and CSS features)

## Completed Improvements

### ✅ Header/Footer Includes (Implemented)
The site now uses vanilla JavaScript (`/assets/js/includes.js`) to load shared header and footer from `/includes/` directory. This:
- Eliminates duplication across several HTML files
- Maintains the no-build-process philosophy
- Uses parallel `Promise.all()` fetching for performance
- Provides graceful degradation via `<noscript>` fallbacks
- Auto-highlights current page in navigation

## Planned Improvements

### Responsive Images
**Current state**: Images are served at full size.

**Planned**: Add responsive image handling:
```html
<img srcset="profile-photo-480.webp 480w,
             profile-photo-800.webp 800w,
             profile-photo-1200.webp 1200w"
     sizes="(max-width: 640px) 160px, 220px"
     src="profile-photo-800.webp"
     alt="Michael Sinanian">
```

### Cloudflare Analytics
Add Cloudflare Web Analytics (privacy-friendly, no cookies) to track page views.

## Browser Compatibility

**Tested and working**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**CSS features used**:
- CSS Grid (all modern browsers)
- CSS Custom Properties (IE not supported, but acceptable)
- `:has()` selector for theme toggle (Safari 15.4+, Chrome 105+, Firefox 103+)

**Fallback behavior**: On older browsers that don't support `:has()`, theme toggle won't work, but site remains fully functional in default theme.

## SEO & Metadata

Each page includes:
- `<title>` tag
- Meta description
- Viewport meta tag for mobile
- Semantic HTML (h1, nav, main, footer)
- Proper heading hierarchy

**To improve**: Add Open Graph and Twitter Card meta tags for better social sharing.

## Accessibility Features

- Semantic HTML5 elements
- Skip to content link for keyboard users
- ARIA labels on icon buttons and navigation
- Sufficient color contrast in both themes
- Focus visible indicators
- Alt text on all images
- Responsive design works at all viewport sizes

## Contributing

This is a personal website, but if you spot issues:
1. Check the issue is actually a bug (not just personal preference)
2. For broken links, typos, or accessibility issues: please report
3. For design suggestions: these are subjective, probably won't change

## License

Content is © 2025 Michael Sinanian. All rights reserved.

Code structure and CSS may be used as reference or adapted for your own projects.

---

**For AI Agents**: See `AGENTS.md` for architecture details, patterns, and modification guidelines.
