# 🎀 Ruchita Saree Aura - Complete E-Commerce Website
## Deployment & Customization Guide

---

## 📁 Complete Directory Structure

```
ruchita-saree-aura/
│
├── 📄 HTML Pages (6 files)
│   ├── index.html              # Homepage with hero slider & featured products
│   ├── shop.html               # Shop page with filters & product grid
│   ├── product.html            # Product details page with image gallery
│   ├── about.html              # About us & brand story
│   ├── contact.html            # Contact form & Google Maps
│   └── checkout.html           # Order checkout & payment options
│
├── 📁 css/ (2 files)
│   ├── style.css               # Main stylesheet (desktop & tablet)
│   └── responsive.css          # Mobile-responsive styles
│
├── 📁 js/ (8 files)
│   ├── products.js             # Product data & cart management
│   ├── main.js                 # Global functionality & menu toggle
│   ├── slider.js               # Hero slider functionality
│   ├── cart.js                 # Shopping cart operations
│   ├── filters.js              # Shop page filtering & sorting
│   ├── product-detail.js       # Product page functionality
│   ├── contact.js              # Contact form handling
│   └── checkout.js             # Checkout form & order processing
│
├── 📁 images/ (9 files)
│   ├── hero-banner.jpg         # Hero section banner (1920x1080)
│   ├── saree-01.jpg to         # Product images (800x1200)
│   └── saree-08.jpg
│
├── 📄 README.md                # Quick start guide
├── 📄 DEPLOYMENT_GUIDE.md      # This file
└── 📄 .gitignore               # Git ignore file
```

---

## 🚀 Quick Start

### 1. **Local Testing**
```bash
cd ruchita-saree-aura
python3 -m http.server 8080
# Visit: http://localhost:8080
```

### 2. **Deploy to Web Hosting**
- Upload all files to your web hosting server
- Ensure `.htaccess` is configured for clean URLs (if needed)
- Test all pages on mobile and desktop

### 3. **Custom Domain**
- Update domain DNS settings
- Point to your hosting server
- Test all functionality

---

## 📝 Easy Customization Guide

### 1. **Update Product Prices & Details**
**File**: `js/products.js`

Find the products array and update:
```javascript
{
    id: 1,
    name: "রুচিতা প্রিমিয়াম জামদানি",
    price: 4500,              // ← Change price
    originalPrice: 5625,      // ← Change original price
    fabric: "১০০% খাঁটি সিল্ক", // ← Change fabric
    work: "সোনালি জরির কাজ",   // ← Change work description
}
```

### 2. **Change Contact Information**
**Files to update**: All HTML files (footer section)

Search for and replace:
```
Phone: +880 1885092595
Email: ruchitasaree0622@gmail.com
Address: Sekertek 10, Adabar Thana, Dhaka - 1207
```

### 3. **Update Shipping Charges**
**File**: `js/checkout.js`

```javascript
if (e.target.value === 'dhaka') {
    deliveryCharge = 80;      // ← Inside Dhaka charge
} else if (e.target.value === 'outside') {
    deliveryCharge = 120;     // ← Outside Dhaka charge
}
```

### 4. **Replace Product Images**
**Folder**: `images/`

- Drop new JPG files in the `/images/` folder
- Keep the same naming: `saree-01.jpg`, `saree-02.jpg`, etc.
- Images should be **800×1200 pixels** for best quality

### 5. **Change Hero Banner**
**File**: `images/hero-banner.jpg`

- Replace with your own image (1920×1080 pixels)

### 6. **Update Brand Colors**
**File**: `css/style.css`

```css
:root {
    --primary-color: #B30000;      /* Royal Red */
    --secondary-color: #D4AF37;    /* Light Golden */
    --accent-color: #8B4513;       /* Brown */
}
```

### 7. **Add New Products**
**File**: `js/products.js`

```javascript
{
    id: 9,
    name: "নতুন শাড়ির নাম",
    price: 3500,
    originalPrice: 4375,
    category: "জামদানি",
    fabric: "ফ্যাব্রিক বিবরণ",
    work: "কাজের বিবরণ",
    color: "রঙ",
    occasion: "অনুষ্ঠান",
    care: "যত্ন নির্দেশনা",
    description: "পণ্যের বিস্তারিত বর্ণনা",
    images: ["./images/saree-09.jpg"],
    stock: 10,
    rating: 5
}
```

### 8. **Update Social Media Links**
**All HTML files** (footer section)

```html
<a href="https://www.facebook.com/YOUR_PAGE" target="_blank">f</a>
<a href="https://www.instagram.com/YOUR_HANDLE" target="_blank">📷</a>
<a href="https://wa.me/YOUR_NUMBER" target="_blank">📱</a>
```

---

## 🎨 Design Customization

### **Font Changes**
All HTML files (head section):
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;600;700&display=swap" rel="stylesheet">
```

### **Logo Customization**
**File**: `css/style.css`

```css
.logo-ruchita {
    color: #B30000;           /* Royal Red */
    font-size: 28px;
    font-weight: 900;
}

.logo-saree-aura {
    color: #D4AF37;           /* Light Golden */
    font-size: 14px;
}
```

---

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1024px
- **Large Mobile**: 600px - 768px
- **Mobile**: 480px - 600px
- **Small Mobile**: Below 480px

---

## 🐛 Troubleshooting

### **Images not loading?**
- Check image paths: `./images/saree-01.jpg`
- Verify image file names match exactly
- Ensure images are in `/images/` folder

### **Styles not applying?**
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file path in HTML head
- Verify CSS file is in `/css/` folder

### **JavaScript not working?**
- Open browser console (F12) for errors
- Check script paths in HTML
- Verify JS files are in `/js/` folder

### **Mobile layout broken?**
- Check viewport meta tag in HTML head
- Verify responsive.css is linked
- Test on actual mobile devices

---

## 📊 Page Features Overview

| Page | Features |
|------|----------|
| **index.html** | Hero slider, featured products, about preview, newsletter |
| **shop.html** | Product grid, sidebar filters, sorting, lazy loading |
| **product.html** | Image gallery, full description, related products |
| **checkout.html** | Order form, payment options, order summary |
| **about.html** | Brand story, mission, values |
| **contact.html** | Contact form, Google Maps, business info |

---

## ✅ Pre-Launch Checklist

- [ ] All pages tested on desktop & mobile
- [ ] Images optimized and properly sized
- [ ] Contact information updated
- [ ] Social media links verified
- [ ] Product prices confirmed
- [ ] Payment methods configured
- [ ] Shipping charges set correctly
- [ ] Forms tested and working
- [ ] Links checked (no 404 errors)
- [ ] Performance tested (page load < 3s)
- [ ] Backup created
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Live testing completed

---

## 🎉 Ready for Deployment!

Your Ruchita Saree Aura website is production-ready!

**Version**: 1.0  
**Status**: ✅ Production Ready  
**Last Updated**: May 2026

