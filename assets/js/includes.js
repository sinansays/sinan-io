/**
 * Ultra-lightweight vanilla JS include system
 * Loads header and footer HTML fragments in parallel
 * Adds current page highlighting to navigation
 */
(function() {
  'use strict';

  // Fetch header and footer in parallel for performance
  Promise.all([
    fetch('/includes/header.html').then(response => {
      if (!response.ok) throw new Error('Failed to load header');
      return response.text();
    }),
    fetch('/includes/footer.html').then(response => {
      if (!response.ok) throw new Error('Failed to load footer');
      return response.text();
    })
  ])
  .then(([headerHTML, footerHTML]) => {
    // Insert header content
    const header = document.getElementById('site-header');
    if (header) {
      header.innerHTML = headerHTML;
    }

    // Insert footer content
    const footer = document.getElementById('site-footer');
    if (footer) {
      footer.innerHTML = footerHTML;
    }

    // Highlight current page in navigation
    highlightCurrentPage();
  })
  .catch(error => {
    console.error('Error loading includes:', error);
    // Noscript fallback remains visible on error
  });

  /**
   * Highlights the current page in the navigation menu
   * Adds aria-current="page" attribute for accessibility
   */
  function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.site-nav a');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      // Check for exact match
      if (linkPath === currentPath) {
        link.setAttribute('aria-current', 'page');
      }
      // Check for section match (directories like /posts/ or /projects/)
      // But not for home page (/)
      else if (linkPath.endsWith('/') && linkPath !== '/' && currentPath.startsWith(linkPath)) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }
})();
