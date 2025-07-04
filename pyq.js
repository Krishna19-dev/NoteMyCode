// PYQ Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get all paper cards
    const paperCards = document.querySelectorAll('.paper-card');
    
    // Add click event listeners to each paper card
    paperCards.forEach(card => {
        card.addEventListener('click', function() {
            handleDownload(this);
        });
        
        // Add keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDownload(this);
            }
        });
        
        // Make cards focusable for keyboard navigation
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Download question paper');
    });
    
    // Smooth scroll for back to top button
    const backToTopBtn = document.querySelector('.back-to-top a');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add hover effects enhancement
    addHoverEffects();
    
    // Initialize download statistics
    initializeDownloadStats();
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize filters
    initializeFilters();
});

/**
 * Handle download functionality
 * @param {HTMLElement} card - The clicked paper card
 */
function handleDownload(card) {
    const downloadUrl = card.getAttribute('data-download');
    const paperType = card.getAttribute('data-paper');
    const year = card.getAttribute('data-year');
    
    if (!downloadUrl || !paperType || !year) {
        console.error('Missing download data attributes');
        showNotification('Error: Missing download information', 'error');
        return;
    }
    
    // Add downloading state
    card.classList.add('downloading');
    
    // Log download attempt
    console.log(`Downloading: ${paperType} (${year})`);
    console.log(`Download URL: ${downloadUrl}`);
    
    // Simulate download process
    setTimeout(() => {
        // Try to download the file
        if (downloadUrl.startsWith('assets/')) {
            // Real download attempt
            downloadFile(downloadUrl, `${paperType}_${year}.pdf`);
        } else {
            // Fallback for demo purposes
            showNotification(`Download started: ${paperType} (${year})`, 'success');
        }
        
        // Remove downloading state
        card.classList.remove('downloading');
        
        // Update download statistics
        updateDownloadStats(paperType, year);
        
    }, 800); // Simulate processing time
}

/**
 * Download file function
 * @param {string} url - File URL
 * @param {string} filename - Desired filename
 */
function downloadFile(url, filename) {
    try {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification(`Download started: ${filename}`, 'success');
        
    } catch (error) {
        console.error('Download failed:', error);
        showNotification('Download failed. Please try again.', 'error');
    }
}

/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${getNotificationColor(type)};
        color: white;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0.2rem;
        border-radius: 3px;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.8';
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Get notification icon based on type
 * @param {string} type - Notification type
 * @returns {string} Font Awesome icon class
 */
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

/**
 * Get notification color based on type
 * @param {string} type - Notification type
 * @returns {string} CSS color value
 */
function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'info': return '#17a2b8';
        default: return '#17a2b8';
    }
}

/**
 * Add enhanced hover effects
 */
function addHoverEffects() {
    const paperCards = document.querySelectorAll('.paper-card');
    
    paperCards.forEach(card => {
        let hoverTimeout;
        
        card.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 100);
        });
    });
}

/**
 * Initialize download statistics
 */
function initializeDownloadStats() {
    // This would typically connect to a backend service
    // For now, we'll use memory storage for demo purposes
    if (!window.downloadStats) {
        window.downloadStats = {};
    }
}

/**
 * Update download statistics
 * @param {string} paperType - Type of paper (MST, End-Sem)
 * @param {string} year - Year of the paper
 */
function updateDownloadStats(paperType, year) {
    try {
        if (!window.downloadStats) {
            window.downloadStats = {};
        }
        
        const key = `${paperType}_${year}`;
        window.downloadStats[key] = (window.downloadStats[key] || 0) + 1;
        window.downloadStats.lastDownload = new Date().toISOString();
        
        console.log('Download stats updated:', window.downloadStats);
    } catch (error) {
        console.error('Failed to update download stats:', error);
    }
}

/**
 * Get download statistics (for future use)
 * @returns {Object} Download statistics
 */
function getDownloadStats() {
    try {
        return window.downloadStats || {};
    } catch (error) {
        console.error('Failed to get download stats:', error);
        return {};
    }
}

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Add focus ring for keyboard navigation
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('paper-card')) {
            focusedElement.style.outline = '2px solid var(--primary-color)';
            focusedElement.style.outlineOffset = '2px';
        }
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.classList.contains('paper-card')) {
        e.target.style.outline = 'none';
    }
});

// Error handling for missing files
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT') {
        console.warn('Resource failed to load:', e.target.src || e.target.href);
    }
});

/**
 * Performance optimization - lazy loading for large lists
 */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.classList.add('loaded');
                    
                    // Add staggered animation
                    const cards = Array.from(document.querySelectorAll('.paper-card'));
                    const index = cards.indexOf(card);
                    card.style.animationDelay = `${index * 0.1}s`;
                    
                    observer.unobserve(card);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Observe all paper cards
        document.querySelectorAll('.paper-card').forEach(card => {
            observer.observe(card);
        });
    }
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
    // Create search container if it doesn't exist
    const pyqHeader = document.querySelector('.pyq-header');
    if (pyqHeader && !document.querySelector('.search-container')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="pyq-search" placeholder="Search papers by year or type..." autocomplete="off">
                <button class="search-clear" id="search-clear" style="display: none;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add search styles
        searchContainer.style.cssText = `
            margin-top: 2rem;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        `;
        
        pyqHeader.appendChild(searchContainer);
        
        // Add search functionality
        const searchInput = document.getElementById('pyq-search');
        const searchClear = document.getElementById('search-clear');
        
        searchInput.addEventListener('input', handleSearch);
        searchClear.addEventListener('click', clearSearch);
    }
}

/**
 * Handle search functionality
 * @param {Event} e - Input event
 */
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const searchClear = document.getElementById('search-clear');
    const yearSections = document.querySelectorAll('.year-section');
    
    // Show/hide clear button
    searchClear.style.display = searchTerm ? 'block' : 'none';
    
    if (!searchTerm) {
        // Show all sections and cards
        yearSections.forEach(section => {
            section.style.display = 'block';
            const cards = section.querySelectorAll('.paper-card');
            cards.forEach(card => card.style.display = 'flex');
        });
        return;
    }
    
    // Filter sections and cards
    yearSections.forEach(section => {
        const year = section.querySelector('.year-header h2').textContent.toLowerCase();
        const cards = section.querySelectorAll('.paper-card');
        let hasVisibleCards = false;
        
        cards.forEach(card => {
            const paperType = card.getAttribute('data-paper').toLowerCase();
            const paperYear = card.getAttribute('data-year').toLowerCase();
            const cardText = card.textContent.toLowerCase();
            
            if (year.includes(searchTerm) || 
                paperType.includes(searchTerm) || 
                paperYear.includes(searchTerm) || 
                cardText.includes(searchTerm)) {
                card.style.display = 'flex';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        section.style.display = hasVisibleCards ? 'block' : 'none';
    });
}

/**
 * Clear search functionality
 */
function clearSearch() {
    const searchInput = document.getElementById('pyq-search');
    const searchClear = document.getElementById('search-clear');
    
    searchInput.value = '';
    searchClear.style.display = 'none';
    
    // Show all sections and cards
    const yearSections = document.querySelectorAll('.year-section');
    yearSections.forEach(section => {
        section.style.display = 'block';
        const cards = section.querySelectorAll('.paper-card');
        cards.forEach(card => card.style.display = 'flex');
    });
    
    searchInput.focus();
}

/**
 * Initialize filters
 */
function initializeFilters() {
    // This could be expanded to add filter buttons for paper types
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All Papers</button>
            <button class="filter-btn" data-filter="mst">MST Papers</button>
            <button class="filter-btn" data-filter="endsem">End-Sem Papers</button>
        </div>
    `;
    
    const pyqHeader = document.querySelector('.pyq-header');
    if (pyqHeader) {
        pyqHeader.appendChild(filterContainer);
        
        // Add filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', handleFilter);
        });
    }
}

/**
 * Handle filter functionality
 * @param {Event} e - Click event
 */
function handleFilter(e) {
    const filterType = e.target.getAttribute('data-filter').toLowerCase();
    const filterButtons = document.querySelectorAll('.filter-btn');
    const paperCards = document.querySelectorAll('.paper-card');
    
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter cards
    paperCards.forEach(card => {
        const paperType = card.getAttribute('data-paper').toLowerCase();
        
        if (filterType === 'all' || paperType.includes(filterType.replace('-', ''))) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Hide empty sections
    const yearSections = document.querySelectorAll('.year-section');
    yearSections.forEach(section => {
        const visibleCards = section.querySelectorAll('.paper-card[style*="flex"]');
        section.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });
}

/**
 * Utility function to debounce search input
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
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

// Add loading animation for better UX
function showLoadingState() {
    const container = document.querySelector('.pyq-container');
    if (container) {
        container.classList.add('loading');
    }
}

function hideLoadingState() {
    const container = document.querySelector('.pyq-container');
    if (container) {
        container.classList.remove('loading');
    }
}

// Analytics tracking (placeholder for future implementation)
function trackDownload(paperType, year) {
    // This would integrate with analytics services
    console.log(`Analytics: Download tracked - ${paperType} ${year}`);
}

// Service worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}