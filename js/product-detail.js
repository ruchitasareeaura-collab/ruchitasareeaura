// ============================================
// PRODUCT DETAIL PAGE
// ============================================

let currentProduct = null;

document.addEventListener('DOMContentLoaded', () => {
    loadProductDetail();
    loadRelatedProducts();
});

function loadProductDetail() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = './shop.html';
        return;
    }

    currentProduct = getProductById(productId);

    if (!currentProduct) {
        window.location.href = './shop.html';
        return;
    }

    // Populate product details
    document.getElementById('product-name').textContent = currentProduct.name;
    document.getElementById('product-price').textContent = `₹${currentProduct.price}`;
    document.getElementById('product-original-price').textContent = `₹${currentProduct.originalPrice}`;
    
    const discount = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);
    document.getElementById('product-discount').textContent = `${discount}% OFF`;

    document.getElementById('product-fabric').textContent = currentProduct.fabric;
    document.getElementById('product-work').textContent = currentProduct.work;
    document.getElementById('product-occasion').textContent = currentProduct.occasion;
    document.getElementById('product-description').textContent = currentProduct.description;
    document.getElementById('product-care').textContent = currentProduct.care;

    // Set main image
    document.getElementById('main-product-image').src = currentProduct.images[0];
    document.getElementById('main-product-image').alt = currentProduct.name;

    // Create thumbnails
    createThumbnails();

    // Add to cart button
    document.getElementById('add-to-cart').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        cart.addItem(currentProduct.id, quantity);
    });

    // Wishlist button
    document.getElementById('wishlist-btn').addEventListener('click', () => {
        addToWishlist(currentProduct.id);
    });
}

function createThumbnails() {
    const thumbnailGallery = document.getElementById('thumbnail-gallery');
    thumbnailGallery.innerHTML = '';

    // Create thumbnails for each image
    currentProduct.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}" loading="lazy">`;
        
        thumbnail.addEventListener('click', () => {
            // Update main image
            document.getElementById('main-product-image').src = image;

            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });

        thumbnailGallery.appendChild(thumbnail);
    });
}

function loadRelatedProducts() {
    // Get related products (same category or fabric)
    const relatedProducts = products.filter(p => 
        (p.category === currentProduct.category || p.fabric === currentProduct.fabric) &&
        p.id !== currentProduct.id
    ).slice(0, 4);

    renderProducts(relatedProducts, 'related-products');
}

// ============================================
// QUANTITY SELECTOR
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', (e) => {
            const value = parseInt(e.target.value) || 1;
            e.target.value = Math.max(1, Math.min(5, value));
        });
    }
});
