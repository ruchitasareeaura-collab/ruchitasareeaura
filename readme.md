# Ruchita Saree Aura - E-commerce Website

A high-performance, lightweight, and fully responsive e-commerce website for **Ruchita Saree Aura** featuring premium handpicked sarees.

## 🌟 Features

- **Mobile-First Design**: 100% responsive across all devices (smartphones, tablets, desktops)
- **Lazy Loading**: Optimized image loading for fast performance
- **Hero Slider**: Automatic rotating banner with royal aesthetic
- **Product Grid**: Beautiful product showcase with filtering and sorting
- **Shopping Cart**: Add to cart functionality with local storage
- **Wishlist**: Save favorite products
- **Product Filters**: Filter by category, price, and color
- **Search Functionality**: Search products by name, fabric, or occasion
- **Product Details**: Comprehensive product information with image gallery
- **Contact Form**: Get in touch with the business
- **About Page**: Brand story and company values
- **Sticky Header**: Always-accessible navigation and cart
- **No Database Required**: File-based, easy to maintain

## 📁 Project Structure

```
ruchita-saree-aura/
├── index.html              # Homepage
├── shop.html               # Shop/Products page
├── product.html            # Product detail page
├── about.html              # About Us page
├── contact.html            # Contact page
├── css/
│   ├── style.css           # Main stylesheet with royal aesthetic
│   └── responsive.css      # Mobile-first responsive design
├── js/
│   ├── products.js         # Product data and rendering
│   ├── slider.js           # Hero slider functionality
│   ├── cart.js             # Shopping cart logic
│   ├── filters.js          # Product filtering and sorting
│   ├── product-detail.js   # Product detail page logic
│   ├── contact.js          # Contact form handling
│   └── main.js             # Global functionality
├── images/                 # Product images (800x1200px)
│   ├── saree-01.jpg
│   ├── saree-02.jpg
│   └── ... (8 images total)
└── README.md               # This file
```

## 🚀 Quick Start

### Option 1: Local Development
```bash
# Navigate to project directory
cd /home/ubuntu/ruchita-saree-aura

# Start a local server
python3 -m http.server 8080

# Open in browser
# http://localhost:8080
```

### Option 2: Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server -p 8080

# Open in browser
# http://localhost:8080
```

## 📝 Manual Customization Guide

### 1. Update Business Information

**File: `contact.html`**
- Replace `+91-XXXXXXXXXX` with your phone number
- Replace `info@ruchitasareaaura.com` with your email
- Update address and business hours

**File: `footer` (appears on all pages)**
- Update contact details in footer sections
- Modify return policy text if needed

### 2. Update Product Information

**File: `js/products.js`**

Each product object has these editable fields:
```javascript
{
    id: 1,
    name: "Product Name",           // Change product name
    fabric: "Fabric Type",          // Jamdani, Silk, Cotton, Blended
    work: "Color with Details",     // e.g., "Red with Gold Zari"
    color: "color-code",            // red, blue, green, gold, multicolor
    occasion: "Occasion",           // Wedding, Party, Casual, Festival
    price: 4500,                    // Current price in rupees
    originalPrice: 5500,            // Original price for discount calculation
    category: "jamdani",            // Category for filtering
    priceRange: "3000-5000",        // Price range for filtering
    images: ["./images/saree-01.jpg"], // Image path
    description: "Product description",
    care: "Care instructions"
}
```

**To add a new product:**
1. Add a new object to the `products` array in `js/products.js`
2. Ensure all fields are filled
3. Add corresponding image to `/images/` folder
4. Use naming convention: `saree-XX.jpg` (800x1200px)

### 3. Replace Product Images

**File: `/images/` folder**

- Replace image files while keeping the same names (`saree-01.jpg`, etc.)
- Image specifications:
  - **Dimensions**: 800×1200 pixels
  - **Format**: JPG
  - **File size**: Optimize for web (< 200KB recommended)
  - **Quality**: High-quality product photography

### 4. Update Prices

**File: `js/products.js`**

Find the product and update:
- `price`: Current selling price
- `originalPrice`: Original price (for discount percentage)

The discount percentage is automatically calculated.

### 5. Update About Us Content

**File: `about.html`**

Sections to customize:
- "Our Story" section
- "Our Mission" statement
- Collections description
- Values section

### 6. Update Google Maps Location

**File: `contact.html`**

Replace the Google Maps embed:
```html
<iframe src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"></iframe>
```

1. Go to Google Maps
2. Find your location
3. Click "Share" → "Embed a map"
4. Copy the embed code
5. Replace the existing iframe

### 7. Customize Colors (Royal Aesthetic)

**File: `css/style.css`**

CSS Variables at the top:
```css
:root {
    --primary-color: #8B4513;      /* Brown */
    --secondary-color: #D4AF37;    /* Gold */
    --accent-color: #4A235A;       /* Purple */
    --light-bg: #FFF8F0;           /* Light cream */
    --dark-text: #2C1810;          /* Dark brown */
}
```

Change these hex codes to customize the entire color scheme.

## 🛍️ Features Explained

### Hero Slider
- Automatically rotates every 5 seconds
- Pauses on hover
- Manual navigation with prev/next buttons
- Dot indicators for slide position

### Product Filtering
- **Category**: Jamdani, Silk, Cotton, Blended
- **Price Range**: ₹0-1000, ₹1000-3000, ₹3000-5000, ₹5000+
- **Color**: Red, Blue, Green, Gold, Multicolor
- Multiple filters can be applied simultaneously
- Reset button clears all filters

### Shopping Cart
- Add/remove products
- Adjust quantities
- Cart persists using browser localStorage
- Cart count displayed in header

### Search
- Search by product name, fabric, work, or occasion
- Results displayed on shop page
- Case-insensitive search

### Lazy Loading
- Images load only when visible in viewport
- Improves page performance
- All images set to 800×1200px for consistency

## 📊 Performance Optimization

- **Lazy Loading**: Images load on-demand
- **CSS Minification**: Optimized stylesheets
- **JavaScript Modularization**: Organized code structure
- **Local Storage**: No server calls for cart/wishlist
- **Responsive Images**: Optimized for all screen sizes
- **No External Dependencies**: Pure HTML/CSS/JavaScript

## 🔧 Troubleshooting

### Images Not Loading
- Check image file names match the paths in `products.js`
- Ensure images are in `/images/` folder
- Verify image format is JPG

### Filters Not Working
- Clear browser cache
- Check browser console for JavaScript errors
- Verify product data in `products.js` has correct category/price/color values

### Cart Not Persisting
- Check if localStorage is enabled in browser
- Clear browser cookies and try again

### Mobile Menu Not Working
- Ensure JavaScript files are loading (check browser console)
- Verify `main.js` is properly linked in HTML

## 📱 Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 SEO Recommendations

1. Add meta descriptions to each page
2. Update page titles with keywords
3. Add alt text to images
4. Use semantic HTML (already implemented)
5. Add structured data (JSON-LD) for products

## 🔐 Security Notes

- Contact form data stored in browser localStorage
- No sensitive data transmitted
- All processing happens client-side
- Consider adding backend validation for production

## 📞 Support & Maintenance

### Regular Updates
- Update product prices in `products.js`
- Add new products following the template
- Replace images as inventory changes
- Update contact information as needed

### Backup
- Regularly backup the entire project folder
- Keep a copy of product images
- Document any custom changes made

## 🎨 Customization Examples

### Change Primary Color to Purple
In `css/style.css`:
```css
--primary-color: #6B2D5C;
```

### Add New Product Category
In `js/products.js`:
1. Add new product with `category: "new-category"`
2. In `shop.html`, add new checkbox:
```html
<label><input type="checkbox" class="filter-checkbox" data-filter="category" value="new-category"> New Category</label>
```

### Modify Hero Slider Timing
In `js/slider.js`:
```javascript
setInterval(() => {
    nextSlide();
}, 5000); // Change 5000 to desired milliseconds
```

## 📄 License

This website is created for Ruchita Saree Aura. All rights reserved.

---

**Version**: 1.0  
**Last Updated**: May 2024  
**Created for**: Ruchita Saree Aura

For questions or support, contact: info@ruchitasareaaura.com
