# AI Agent Documentation

This document provides detailed technical information for AI coding agents working with this codebase. It makes implicit knowledge explicit and documents patterns, constraints, and gotchas.

## Table of Contents
1. [Architecture Decisions](#architecture-decisions)
2. [Code Patterns](#code-patterns)
3. [Dependencies & Constraints](#dependencies--constraints)
4. [Common Modification Tasks](#common-modification-tasks)
5. [Gotchas & Important Considerations](#gotchas--important-considerations)
6. [Testing & Validation](#testing--validation)

---

## Architecture Decisions

### Why Plain HTML/CSS + Minimal Vanilla JS?

**Decision**: Use vanilla HTML and CSS with minimal vanilla JavaScript for includes. No frameworks or build tooling.

**Rationale**:
1. **Simplicity**: This is a personal portfolio site, not a web application. It displays static content with minimal interactivity.
2. **Performance**: No framework bundle to download/parse/execute. Pages load in milliseconds. The includes.js file is <1KB.
3. **Maintenance**: No dependencies to update, no security vulnerabilities in npm packages, no build pipeline to maintain.
4. **Longevity**: HTML/CSS/vanilla JS written today will work in browsers 10 years from now without modification.
5. **Accessibility**: Progressive enhancement with `<noscript>` fallbacks ensures the site works even without JavaScript.

**Trade-off**: Requires JavaScript for optimal experience, but gracefully degrades for users without JS.

### Why CSS-Only Theme Toggle?

**Decision**: Use a hidden checkbox + CSS `:has()` selector instead of JavaScript.

**Rationale**:
1. **No JavaScript required**: Maintains zero-JS philosophy
2. **Performant**: No script execution, no FOUC (Flash of Unstyled Content)
3. **Works with `:has()` support**: Modern browsers (2022+) support this natively

**Mechanism**:
```css
/* When checkbox is checked, flip all theme variables */
:root:has(#theme-toggle:checked) {
  --bg: #0f1216;  /* dark background */
  --text: #e5e7eb; /* light text */
  /* ... */
}
```

**Limitation**: Users on older browsers can't toggle theme, but default (OS preference) still works.

### Why Cloudflare Pages?

**Decision**: Host on Cloudflare Pages instead of Netlify, Vercel, or GitHub Pages.

**Rationale**:
1. **Performance**: Cloudflare's CDN and AI crawler control is excellent
2. **No build config needed**: Just serve static files
3. **Free tier sufficient**: Unlimited bandwidth for static sites
4. **Integration**: Owner may use other Cloudflare services

### Why WebP for Images?

**Decision**: Use WebP format for photos (profile picture, etc.).

**Rationale**:
1. **File size**: WebP is 25-35% smaller than JPEG at same quality
2. **Browser support**: Supported in all modern browsers (Safari 14+, Chrome 23+, Firefox 65+)

**Fallback**: None currently. Old browsers won't display images, but this is acceptable for the target audience.

---

## Code Patterns

### HTML Structure Pattern

Every page follows this structure:

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
  <header class="site-header">...</header>
  <main id="content" class="site-main">
    <!-- Page-specific content here -->
  </main>
  <footer class="site-footer">...</footer>
</body>
</html>
```

**Important**:
- Always include `skip-link` for accessibility
- Main content must have `id="content"` for skip link to work
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<footer>`)

### CSS Naming Conventions

**Classes follow BEM-like patterns**:
- **Block**: `.site-header`, `.card`, `.hero`
- **Element**: `.site-nav`, `.card-body`, `.hero-title`
- **Modifier**: `.intro-with-thumb`, `.grid-2`, `.row-link`

**Utility classes**:
- `.prose`: Max-width content wrapper for text
- `.simple-grid`: Two-column link grid
- `.card-grid`: Flexible card grid (use with `.grid-2`, `.grid-3`, or `.grid-4`)

**Avoid**:
- Don't create new utility classes. Prefer semantic class names.
- Don't use inline styles. All styling should be in `styles.css`.

### Theme Variable Naming

All colors are CSS custom properties defined in `:root`:

| Variable | Purpose | Light Mode | Dark Mode |
|----------|---------|------------|-----------|
| `--bg` | Body background | `#ffffff` | `#0f1216` |
| `--text` | Body text | `#1f2937` | `#e5e7eb` |
| `--muted` | Borders, subtle UI | `#e5e7eb` | `#27303a` |
| `--surface-1` | Cards, raised surfaces | `#ffffff` | `#14181d` |
| `--surface-2` | Hover states, inputs | `#f3f4f6` | `#1a1f25` |
| `--accent` | Primary blue (links, highlights) | `#3479F7` | `#51ABF2` |
| `--link` | Link color | `#603FEF` (purple) | `#b026ff` (purple) |
| `--nav-sep` | Navigation separators | `#e5e7eb` | `#2a323c` |
| `--shadow` | Box shadows | subtle | more pronounced |

**When adding new colors**: Always define both light and dark variants.

### Card Components

There are two main card types:

#### 1. Project Cards (`.card`)
```html
<a class="card" href="/projects/example.html">
  <div class="thumb" aria-hidden="true">Label</div>
  <div class="card-body">
    <h3>Project Name</h3>
    <p>Brief description</p>
  </div>
</a>
```

**Structure**: 2-column grid (120px thumbnail + flexible content)
**Styling**: Border, shadow, hover effect (lift + border color change)
**Responsive**: Stacks vertically on mobile (<640px)

#### 2. Row Links (`.row-link`)
```html
<a class="row-link" href="/path.html">Link Text</a>
```

**Structure**: Simple block link with padding and border
**Use case**: List of links (like "Prior Projects" section)

### Grid Layouts

Use `.card-grid` with a grid modifier:

```html
<div class="card-grid grid-4">
  <!-- 4 columns on desktop, 2 on tablet, 1 on mobile -->
</div>

<div class="card-grid grid-3">
  <!-- 3 columns on desktop, 2 on tablet, 1 on mobile -->
</div>

<div class="card-grid grid-2">
  <!-- 2 columns on desktop, 1 on mobile -->
</div>
```

**Breakpoints**:
- Desktop: Above 980px (uses specified grid)
- Tablet: 641px-980px (uses grid-2 for grid-3/grid-4)
- Mobile: Below 640px (all grids become single column)

### Navigation Pattern

The site uses a "current page" pattern where the page you're on should be styled differently. **This is NOT currently implemented** but would be added like this:

```html
<nav class="site-nav" aria-label="Primary">
  <a href="/">Home</a>
  <a href="/about.html" aria-current="page">About</a> <!-- Current page -->
  <a href="/posts/">Posts</a>
  <a href="/projects/">Projects</a>
  <a href="/contact.html">Contact</a>
</nav>
```

Then add CSS:
```css
.site-nav a[aria-current="page"] {
  color: var(--accent);
  font-weight: 700;
}
```

---

## Dependencies & Constraints

### External Dependencies

1. **Google Fonts**: Inter (loaded as a fallback when system fonts are unavailable)
   - URLs are preconnected for performance
   - If Google Fonts is blocked, typography stays on the platform system stack
   - Fallback stack: `-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif`

2. **Social Icons**: SVG images in `/assets/icons/`
   - Self-hosted, not from a CDN
   - Some pages use inline SVG, others use `<img>` tags (inconsistent)

3. **Profile Image**: WebP format at `/assets/img/profile-photo.webp`
   - Single size currently served (not responsive)
   - Dimensions: 220px display size (actual file may be larger)

### Minimal Dependencies

- **No npm packages**: This is intentional. Don't add them.
- **No build tools**: No webpack, Vite, Parcel, etc.
- **No CSS preprocessors**: No Sass, Less, PostCSS
- **No JavaScript frameworks**: No React, Vue, Angular, etc.
- **Only vanilla JavaScript**: Single 1KB file (`/assets/js/includes.js`) for header/footer loading

### Hosting Constraints

**Cloudflare Pages limitations**:
- Static files only (no server-side processing)
- No redirects defined currently (could add `_redirects` file)
- No custom headers (could add `_headers` file)

**What this means for agents**:
- You cannot add server-side logic
- You cannot use PHP, Python, Node.js backends
- You cannot connect to databases directly
- You can only modify HTML, CSS, and client-side JavaScript

---

## Common Modification Tasks

### Adding a New Page

1. **Copy an existing page** as a template:
   ```bash
   cp about.html new-page.html
   ```

2. **Update the content**:
   - Change `<title>`
   - Change `<meta name="description">`
   - Update the `<main>` content
   - Keep header and footer identical

3. **Add navigation link** (if needed):
   - Edit the `<nav class="site-nav">` in ALL pages to include the new page
   - Use absolute paths: `/new-page.html`

4. **Test**:
   - Verify skip link works
   - Check mobile responsiveness
   - Test in both light and dark themes

### Adding a New Portfolio Project

1. **Create project HTML file**:
   ```bash
   cp projects/gencog.html projects/new-project.html
   ```

2. **Update project content** in `projects/new-project.html`

3. **Add card to homepage** (`index.html`):
   ```html
   <a class="card" href="/projects/new-project.html">
     <div class="thumb" aria-hidden="true">Label</div>
     <div class="card-body">
       <h3>Project Name</h3>
       <p>Description</p>
     </div>
   </a>
   ```

4. **Add to projects index** (`projects/index.html`)

### Modifying Styles

**Always edit** `/assets/css/styles.css` (the single CSS file)

**When adding new colors**:
1. Define CSS variable in `:root` (light mode)
2. Define same variable in `@media (prefers-color-scheme: dark)` (dark mode default)
3. Define in `:root:has(#theme-toggle:checked)` (dark mode when toggled)
4. Define in dark mode's checked state (light mode when toggled from dark OS)

**Example**:
```css
:root {
  --new-color: #ff0000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --new-color: #ff6666;
  }
}

:root:has(#theme-toggle:checked) {
  --new-color: #ff6666;
}

@media (prefers-color-scheme: dark) {
  :root:has(#theme-toggle:checked) {
    --new-color: #ff0000;
  }
}
```

### Modifying Header or Footer

**Important**: Header and footer are modular using the include system.

1. **Edit the include file**:
   - For navigation changes: Edit `/includes/header.html`
   - For footer changes: Edit `/includes/footer.html`

2. **Changes apply automatically** to all pages

3. **Test with and without JavaScript** to ensure `<noscript>` fallbacks work

### Adding Social Icons

Social icons appear in the footer. To add a new one:

1. **Add icon** to `/assets/icons/`

2. **Edit `/includes/footer.html`** (NOT individual pages):
   ```html
   <a href="https://platform.com/username" target="_blank" rel="noopener"
      aria-label="Platform Name" class="social-icon platform-name">
     <img src="/assets/icons/new-platform.svg" width="26" height="26" alt="Platform Name" />
   </a>
   ```

3. **Optional: Add custom styling** in `styles.css`:
   ```css
   .footer-social .social-icon.platform-name:hover {
     background: #platform-brand-color;
   }
   ```

---

## Gotchas & Important Considerations

### 1. Path References Must Be Absolute

**Problem**: Using relative paths breaks when pages are in subdirectories.

**Wrong**:
```html
<link rel="stylesheet" href="assets/css/styles.css">  <!-- Breaks in /projects/ -->
```

**Correct**:
```html
<link rel="stylesheet" href="/assets/css/styles.css">  <!-- Works everywhere -->
```

**Rule**: Always use absolute paths starting with `/` for:
- CSS files
- Images
- Icons
- Internal links

### 2. Header/Footer Are Modular

**Current state**: Header and footer are loaded from `/includes/header.html` and `/includes/footer.html` via JavaScript.

**Implication**: To modify navigation or footer, edit the single include file and it updates across all pages automatically.

**How it works**:
1. Each page has placeholder `<header id="site-header">` and `<footer id="site-footer">` tags
2. `/assets/js/includes.js` fetches both include files in parallel
3. JavaScript injects the content into the placeholders
4. `<noscript>` fallback provides basic navigation for users without JS

**To modify**: Edit `/includes/header.html` or `/includes/footer.html` - changes apply site-wide instantly.

### 3. Theme Toggle State Not Persisted

**Issue**: When a user toggles the theme, it resets on page navigation.

**Why**: No JavaScript to save preference to `localStorage`.

**Acceptable for now**: This is a known limitation of the CSS-only approach.

**Future fix**: Add minimal JavaScript:
```javascript
// On load
const theme = localStorage.getItem('theme');
if (theme === 'dark') document.querySelector('#theme-toggle').checked = true;

// On toggle
document.querySelector('#theme-toggle').addEventListener('change', (e) => {
  localStorage.setItem('theme', e.target.checked ? 'dark' : 'light');
});
```

### 4. Inconsistent Social Icon Implementation

**Issue**: Some pages use inline SVG for social icons, others use `<img>` tags.

**Impact**: Makes batch updates difficult.

**Recommendation**: When editing footer, standardize on `<img>` tags (easier to manage).


### 5. SVG Logo Is Decorative

**Current state**: The logo SVG in the header has `aria-hidden="true"`.

**Why**: The logo is decorative; the "Home" link provides the semantic meaning.

**Do not change**: Screen readers skip the SVG (correctly) and announce "Home" from the link.

### 7. No Image Optimization

**Current state**: Images are served at full size without optimization.

**Impact**: Larger than necessary file sizes, slower loads on mobile.

**Future improvement**: Add responsive images with `srcset` and optimize WebP quality.

**For now**: If adding new images:
1. Convert to WebP format
2. Resize to reasonable dimensions (max 1200px wide for photos)
3. Use quality setting around 80-85%

---

## Testing & Validation

### HTML Validation

Run pages through the [W3C HTML Validator](https://validator.w3.org/):

```bash
# Using validator.nu API
curl -H "Content-Type: text/html; charset=utf-8" \
     --data-binary @index.html \
     https://validator.nu/?out=gnu
```

**Common issues to check**:
- Unclosed tags
- Duplicate IDs
- Invalid ARIA attributes
- Missing alt text on images

### CSS Validation

Run CSS through [W3C CSS Validator](https://jigsaw.w3.org/css-validator/):

```bash
curl "https://jigsaw.w3.org/css-validator/validator?uri=https://yourdomain.com/assets/css/styles.css"
```

### Accessibility Testing

1. **Keyboard navigation**:
   - Tab through all interactive elements
   - Verify focus indicators are visible
   - Test skip link (first Tab press on page load)
   - Ensure Enter/Space work on buttons

2. **Screen reader testing**:
   - macOS: VoiceOver (Cmd+F5)
   - Windows: NVDA (free) or JAWS
   - Verify navigation landmarks are announced
   - Check image alt text is meaningful

3. **Color contrast**:
   - Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Test both light and dark themes
   - Minimum ratio: 4.5:1 for normal text, 3:1 for large text

4. **Automated testing**:
   - Use [axe DevTools](https://www.deque.com/axe/devtools/) browser extension
   - Use [Lighthouse](https://developers.google.com/web/tools/lighthouse) in Chrome DevTools

### Responsive Design Testing

Test at these breakpoints:
- **Mobile**: 375px, 414px (iPhone SE, iPhone Pro Max)
- **Tablet**: 768px, 980px
- **Desktop**: 1200px, 1440px, 1920px

**Use Chrome DevTools Device Mode**:
1. Open DevTools (F12)
2. Click device icon (Ctrl+Shift+M)
3. Test different viewport sizes
4. Check both portrait and landscape

### Browser Testing

Minimum test matrix:
- **Chrome** (latest): Primary target
- **Firefox** (latest): Check `:has()` support
- **Safari** (latest): Check WebP images and CSS features
- **Edge** (latest): Should match Chrome (Chromium-based)

**Older browsers**: Site should degrade gracefully (content readable, layout intact, even if theme toggle doesn't work).

### Performance Testing

1. **Lighthouse audit** (in Chrome DevTools):
   - Target: 95+ Performance score
   - Target: 100 Accessibility score
   - Target: 100 Best Practices score
   - Target: 100 SEO score

2. **WebPageTest**:
   - Test at [webpagetest.org](https://www.webpagetest.org/)
   - Check Time to First Byte (TTFB)
   - Check First Contentful Paint (FCP)
   - Check Largest Contentful Paint (LCP)

3. **File size check**:
   ```bash
   # Check total page weight
   du -sh assets/

   # Check individual files
   ls -lh assets/css/styles.css
   ls -lh assets/img/profile-photo.webp
   ```

**Target metrics**:
- Total page weight: <200KB (currently achievable)
- CSS: <20KB
- Images: <100KB each after compression

### Pre-deployment Checklist

Before pushing changes:

- [ ] All HTML files have updated header/footer (if changed)
- [ ] All links work (no 404s)
- [ ] Images have alt text
- [ ] Page titles are descriptive and unique
- [ ] Dark theme looks good
- [ ] Mobile layout works (<640px width)
- [ ] No console errors in browser DevTools
- [ ] Run Lighthouse audit (scores 90+)
- [ ] Test keyboard navigation
- [ ] Verify skip link works

### Post-deployment Verification

After Cloudflare Pages deploys:

1. **Test the live site**: Visit the URL
2. **Check caching**: Verify CSS/images load from cache on second visit
3. **Test from mobile device**: Real mobile, not just DevTools
4. **Check social sharing**: Paste URL in Twitter/LinkedIn to see preview card

---

## Quick Reference: File Locations

| Item | Path |
|------|------|
| CSS (all styles) | `/assets/css/styles.css` |
| Social icons | `/assets/icons/*.svg` |
| Profile photo | `/assets/img/profile-photo.webp` |
| Favicon | `/assets/img/favicon.svg` |
| Homepage | `/index.html` |
| About page | `/about.html` |
| Contact page | `/contact.html` |
| Projects index | `/projects/index.html` |
| Individual project | `/projects/{name}.html` |
| Prior projects | `/projects/prior/{name}.html` |
| Posts index | `/posts/index.html` |

---

## Questions to Ask Before Modifying

1. **Does this require JavaScript?** → If yes, reconsider if there's a CSS-only approach
2. **Does this require a build step?** → If yes, it violates the architecture principle
3. **Does this add external dependencies?** → If yes, justify why it's worth the maintenance cost
4. **Does this work in dark mode?** → Always test both themes
5. **Does this work on mobile?** → Always test responsive behavior
6. **Does this affect all pages?** → If modifying header/footer, update all HTML files

---

## Contact for Agents

If you encounter something unexpected or need clarification that isn't in this document, note it for the human maintainer. This documentation should be kept up-to-date as the codebase evolves.

**Documentation version**: 1.0 (2025-11-10)
