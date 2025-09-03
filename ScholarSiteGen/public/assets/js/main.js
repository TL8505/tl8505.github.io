// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Get saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeToggleText(savedTheme);
  
  themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleText(newTheme);
  });
}

function updateThemeToggleText(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
  }
}

// Email Obfuscation
function initEmailObfuscation() {
  const obfuscatedEmails = document.querySelectorAll('.email-obfuscated');
  
  obfuscatedEmails.forEach(element => {
    const user = element.getAttribute('data-user');
    const domain = element.getAttribute('data-domain');
    
    if (user && domain) {
      const email = `${user}@${domain}`;
      element.innerHTML = `<a href="mailto:${email}">${email}</a>`;
    }
  });
}

// Publications Filtering and Search
function initPublicationsFiltering() {
  const typeFilter = document.getElementById('type-filter');
  const searchInput = document.getElementById('search-input');
  const publicationsList = document.getElementById('publications-list');
  
  if (!typeFilter || !searchInput || !publicationsList) return;
  
  const publications = Array.from(publicationsList.querySelectorAll('.publication'));
  
  function filterPublications() {
    const selectedType = typeFilter.value.toLowerCase();
    const searchTerm = searchInput.value.toLowerCase();
    
    publications.forEach(pub => {
      const pubType = pub.getAttribute('data-type')?.toLowerCase() || '';
      const pubText = pub.textContent.toLowerCase();
      
      const matchesType = !selectedType || pubType === selectedType;
      const matchesSearch = !searchTerm || pubText.includes(searchTerm);
      
      pub.style.display = matchesType && matchesSearch ? 'block' : 'none';
    });
    
    // Show/hide no results message
    const visiblePubs = publications.filter(pub => pub.style.display !== 'none');
    const noResultsMsg = publicationsList.querySelector('.no-results');
    
    if (visiblePubs.length === 0 && !noResultsMsg) {
      const message = document.createElement('div');
      message.className = 'no-results';
      message.innerHTML = '<p>No publications found matching your criteria.</p>';
      publicationsList.appendChild(message);
    } else if (visiblePubs.length > 0 && noResultsMsg) {
      noResultsMsg.remove();
    }
  }
  
  typeFilter.addEventListener('change', filterPublications);
  searchInput.addEventListener('input', debounce(filterPublications, 300));
}

// Citation Modal
function initCitationModal() {
  const modal = document.getElementById('citation-modal');
  const citationText = document.getElementById('citation-text');
  const copyButton = document.getElementById('copy-citation');
  const closeButton = modal?.querySelector('.modal-close');
  
  if (!modal || !citationText || !copyButton) return;
  
  // Open modal when citation button is clicked
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('citation-btn')) {
      const citation = e.target.getAttribute('data-citation');
      if (citation) {
        citationText.value = citation;
        modal.style.display = 'flex';
        citationText.focus();
        citationText.select();
      }
    }
  });
  
  // Close modal
  function closeModal() {
    modal.style.display = 'none';
  }
  
  closeButton?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
  
  // Copy citation to clipboard
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(citationText.value);
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy to Clipboard';
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      citationText.select();
      document.execCommand('copy');
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy to Clipboard';
      }, 2000);
    }
  });
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
}

// Skip to main content accessibility feature
function initSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    z-index: 1000;
    background: var(--color-primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
    skipLink.classList.remove('sr-only');
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
    skipLink.classList.add('sr-only');
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initEmailObfuscation();
  initPublicationsFiltering();
  initCitationModal();
  initSmoothScrolling();
  initSkipLink();
});

// Handle prefers-color-scheme
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Set initial theme if no saved preference
  if (!localStorage.getItem('theme')) {
    const initialTheme = mediaQuery.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeToggleText(initialTheme);
  }
  
  // Listen for changes
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateThemeToggleText(newTheme);
    }
  });
}