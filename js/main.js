// ============================================
// MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeSearch();
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header-container')) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function initializeSearch() {
    const searchBox = document.querySelector('.search-box');
    
    if (searchBox) {
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchBox.value.toLowerCase().trim();
                if (searchTerm) {
                    performSearch(searchTerm);
                }
            }
        });
    }
}

function performSearch(searchTerm) {
    // Filter products based on search term
    const results = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.fabric.toLowerCase().includes(searchTerm) ||
        product.work.toLowerCase().includes(searchTerm) ||
        product.occasion.toLowerCase().includes(searchTerm)
    );

    // Store search results in sessionStorage
    sessionStorage.setItem('searchResults', JSON.stringify(results));
    sessionStorage.setItem('searchTerm', searchTerm);

    // Redirect to shop page
    window.location.href = './shop.html?search=' + encodeURIComponent(searchTerm);
}

// ============================================
// LOAD SEARCH RESULTS ON SHOP PAGE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');

    if (searchTerm && document.getElementById('shop-products')) {
        const searchResults = JSON.parse(sessionStorage.getItem('searchResults') || '[]');
        
        if (searchResults.length > 0) {
            renderProducts(searchResults, 'shop-products');
            
            // Update page header
            const shopHeader = document.querySelector('.shop-header h2');
            if (shopHeader) {
                shopHeader.textContent = `Search Results for "${decodeURIComponent(searchTerm)}"`;
            }
        } else {
            const container = document.getElementById('shop-products');
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products found. Try a different search term.</p>';
        }
    }
});

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// ACTIVE NAV LINK
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format price
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

// Get URL parameter
function getUrlParameter(name) {
    const url = new URL(window.location);
    return url.searchParams.get(name);
}

// Debounce function
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

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Preload critical images
function preloadImages() {
    const images = [
        './images/saree-01.jpg',
        './images/saree-02.jpg',
        './images/saree-03.jpg',
        './images/saree-04.jpg'
    ];

    images.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Call preload on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImages);
} else {
    preloadImages();
}
