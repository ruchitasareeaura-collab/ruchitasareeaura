// ============================================
// CHECKOUT PAGE
// ============================================

let deliveryCharge = 80;

document.addEventListener('DOMContentLoaded', () => {
    loadCartSummary();
    setupEventListeners();
    updateDeliveryCharge();
});

// ============================================
// LOAD CART SUMMARY
// ============================================

function loadCartSummary() {
    const cart = getCart();
    const summaryItems = document.getElementById('summary-items');
    summaryItems.innerHTML = '';

    let subtotal = 0;

    if (cart.length === 0) {
        summaryItems.innerHTML = '<p style="text-align: center; color: #999;">কার্টে কোন পণ্য নেই</p>';
        return;
    }

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;

            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.innerHTML = `
                <span class="summary-item-name">${product.name} x${item.quantity}</span>
                <span class="summary-item-price">৳${itemTotal}</span>
            `;
            summaryItems.appendChild(summaryItem);
        }
    });

    // Update subtotal
    document.getElementById('subtotal').textContent = `৳${subtotal}`;

    // Update total
    updateTotal(subtotal);
}

// ============================================
// UPDATE DELIVERY CHARGE
// ============================================

function updateDeliveryCharge() {
    const locationSelect = document.getElementById('location');
    
    locationSelect.addEventListener('change', (e) => {
        if (e.target.value === 'dhaka') {
            deliveryCharge = 80;
        } else if (e.target.value === 'outside') {
            deliveryCharge = 120;
        }
        
        document.getElementById('delivery-charge').textContent = `৳${deliveryCharge}`;
        
        // Update total
        const subtotal = parseInt(document.getElementById('subtotal').textContent.replace('৳', ''));
        updateTotal(subtotal);
    });
}

// ============================================
// UPDATE TOTAL
// ============================================

function updateTotal(subtotal) {
    const total = subtotal + deliveryCharge;
    document.getElementById('total').textContent = `৳${total}`;
}

// ============================================
// SETUP EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Payment method change
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const trxIdGroup = document.getElementById('trx-id-group');
    const trxIdInput = document.getElementById('trx-id');

    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            if (e.target.value === 'cod') {
                trxIdGroup.style.display = 'none';
                trxIdInput.removeAttribute('required');
            } else {
                trxIdGroup.style.display = 'block';
                trxIdInput.setAttribute('required', 'required');
            }
        });
    });

    // Confirm order button
    const confirmBtn = document.getElementById('confirm-order-btn');
    confirmBtn.addEventListener('click', submitOrder);
}

// ============================================
// SUBMIT ORDER
// ============================================

function submitOrder() {
    const form = document.getElementById('checkout-form');
    
    // Validate form
    if (!form.checkValidity()) {
        alert('অনুগ্রহ করে সব প্রয়োজনীয় তথ্য পূরণ করুন।');
        return;
    }

    // Get form data
    const fullName = document.getElementById('full-name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const location = document.getElementById('location').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const trxId = document.getElementById('trx-id').value || 'N/A';
    const notes = document.getElementById('notes').value || '';

    // Get cart data
    const cart = getCart();
    const subtotal = parseInt(document.getElementById('subtotal').textContent.replace('৳', ''));
    const total = parseInt(document.getElementById('total').textContent.replace('৳', ''));

    // Create order object
    const order = {
        id: 'ORD-' + Date.now(),
        date: new Date().toLocaleString('bn-BD'),
        customer: {
            name: fullName,
            phone: phone,
            address: address,
            location: location
        },
        items: cart,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        total: total,
        payment: {
            method: paymentMethod,
            trxId: trxId
        },
        notes: notes,
        status: 'pending'
    };

    // Save order (in real app, send to server)
    saveOrder(order);

    // Show success message
    alert(`অর্ডার সফলভাবে সম্পন্ন হয়েছে!\n\nঅর্ডার নম্বর: ${order.id}\n\nআমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।`);

    // Clear cart
    clearCart();

    // Redirect to home
    window.location.href = './index.html';
}

// ============================================
// SAVE ORDER
// ============================================

function saveOrder(order) {
    // Get existing orders
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Add new order
    orders.push(order);
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Log order (in real app, send to server)
    console.log('Order saved:', order);
}

// ============================================
// CART FUNCTIONS
// ============================================

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}
