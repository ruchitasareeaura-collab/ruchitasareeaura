// ============================================
// SHOP PAGE FILTERS & SORTING
// ============================================

let activeFilters = {
    category: [],
    price: [],
    color: []
};

// ============================================
// INITIALIZE FILTERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Load initial products
    renderShopProducts(products);

    // Add filter listeners
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Add sort listener
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', applySort);
    }

    // Reset filters button
    const resetButtons = document.querySelectorAll('#reset-filters, #reset-filters-no-products');
    resetButtons.forEach(btn => {
        btn.addEventListener('click', resetFilters);
    });

    // Mobile filter toggle
    const filterToggle = document.getElementById('filter-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');

    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar && !sidebar.contains(e.target) && !filterToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Initialize lazy loading
    initializeLazyLoading();
});

// ============================================
// APPLY FILTERS
// ============================================

function applyFilters() {
    // Reset active filters
    activeFilters = {
        category: [],
        price: [],
        color: []
    };

    // Get all checked filters
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox:checked');
    filterCheckboxes.forEach(checkbox => {
        const filterType = checkbox.getAttribute('data-filter');
        const filterValue = checkbox.value;
        activeFilters[filterType].push(filterValue);
    });

    // Filter products
    filterProducts();
}

// ============================================
// FILTER PRODUCTS
// ============================================

function filterProducts() {
    let filteredProducts = [...products];

    // Apply category filter
    if (activeFilters.category.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            activeFilters.category.includes(product.category)
        );
    }

    // Apply price filter
    if (activeFilters.price.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return activeFilters.price.some(priceRange => {
                const [min, max] = priceRange.split('-').map(p => parseInt(p));
                if (max === undefined) {
                    // For "5000+" range
                    return product.price >= min;
                }
                return product.price >= min && product.price <= max;
            });
        });
    }

    // Apply color filter
    if (activeFilters.color.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            activeFilters.color.includes(product.color)
        );
    }

    // Render filtered products
    renderShopProducts(filteredProducts);
}

// ============================================
// RENDER SHOP PRODUCTS
// ============================================

function renderShopProducts(productsToRender) {
    const container = document.getElementById('shop-products');
    const noProducts = document.getElementById('no-products');

    if (!container) return;

    if (productsToRender.length === 0) {
        container.style.display = 'none';
        noProducts.style.display = 'block';
        return;
    }

    container.style.display = 'grid';
    noProducts.style.display = 'none';
    container.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy" width="800" height="1200">
                <div class="product-discount">-${discount}%</div>
            </div>
            <div class="product-body">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-fabric"><strong>ফ্যাব্রিক:</strong> ${product.fabric}</p>
                <p class="product-work"><strong>কাজ:</strong> ${product.work}</p>
                <div class="product-price-section">
                    <span class="product-price">৳${product.price}</span>
                    <span class="product-original-price">৳${product.originalPrice}</span>
                </div>
                <div class="product-rating">
                    <span class="stars">★★★★★</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">কার্টে যোগ করুন</button>
                    <button class="wishlist-btn" onclick="addToWishlist(${product.id})">♡</button>
                </div>
            </div>
        `;

        productCard.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                goToProduct(product.id);
            }
        });

        container.appendChild(productCard);
    });

    // Reinitialize lazy loading for new images
    initializeLazyLoading();
}

// ============================================
// APPLY SORT
// ============================================

function applySort() {
    const sortSelect = document.getElementById('sort-select');
    const sortValue = sortSelect.value;

    // Get currently filtered products
    let sortedProducts = [...products];

    // Apply current filters first
    if (activeFilters.category.length > 0) {
        sortedProducts = sortedProducts.filter(product =>
            activeFilters.category.includes(product.category)
        );
    }

    if (activeFilters.price.length > 0) {
        sortedProducts = sortedProducts.filter(product => {
            return activeFilters.price.some(priceRange => {
                const [min, max] = priceRange.split('-').map(p => parseInt(p));
                if (max === undefined) {
                    return product.price >= min;
                }
                return product.price >= min && product.price <= max;
            });
        });
    }

    if (activeFilters.color.length > 0) {
        sortedProducts = sortedProducts.filter(product =>
            activeFilters.color.includes(product.color)
        );
    }

    // Sort based on selection
    switch (sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'latest':
        default:
            sortedProducts.sort((a, b) => b.id - a.id);
    }

    renderShopProducts(sortedProducts);
}

// ============================================
// RESET FILTERS
// ============================================

function resetFilters() {
    // Uncheck all checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset active filters
    activeFilters = {
        category: [],
        price: [],
        color: []
    };

    // Reset sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.value = 'latest';
    }

    // Render all products
    renderShopProducts(products);

    // Close sidebar on mobile
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('active');
    }
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}
