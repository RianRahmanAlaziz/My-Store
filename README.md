# 👟 Modern Shoes E-Commerce

A modern, responsive, and scalable e-commerce application for selling shoes built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

---

## 📖 Overview

Modern Shoes E-Commerce is a web application designed to provide a seamless online shopping experience for footwear products. The platform allows customers to browse products, search items, view detailed product information, manage shopping carts, and complete purchases efficiently.

The project follows a modern UI/UX approach inspired by premium brands such as Nike, Adidas, and New Balance, focusing on performance, responsiveness, and scalability.

---

## 🎯 Objectives

* Provide a modern and responsive shopping experience.
* Simplify product discovery through search and filtering.
* Improve customer engagement through reviews and ratings.
* Deliver a scalable architecture for future integrations such as payment gateways, inventory systems, and CMS management.

---

## 🛠 Tech Stack

### Frontend

* Next.js 15+
* TypeScript
* Tailwind CSS v4
* Lucide React Icons
* Motion

### State Management (Planned)

* Zustand

### Backend (Planned)

* Laravel 13
* PHP 8.3+
* MySQL
* Laravel Sanctum
* REST API
* Eloquent ORM

---

# ✨ Features

## Customer Features

### 🏠 Home Page

* Hero Banner
* Featured Products
* Trending Products
* Best Seller Products
* Promotional Sections
* Newsletter Subscription

### 📦 Product Catalog

* Product Listing
* Category Filter
* Brand Filter
* Product Sorting
* Responsive Grid Layout
* Modern Search Experience

### 🔍 Product Detail

* Product Images Gallery
* Product Information
* Brand & Category Badge
* Rating & Reviews
* Size Selection
* Color Selection
* Quantity Selector
* Related Products
* Add to Cart
* Buy Now

### 🛒 Shopping Cart

* View Cart Items
* Update Quantity
* Remove Product
* Order Summary
* Shipping Information
* Checkout Button

### ⭐ Review & Rating

* Customer Reviews
* Rating Summary
* Verified Purchase Badge

### 👤 User Account (Planned)

* Register
* Login
* Profile Management
* Order History
* Wishlist

---

## Admin Features (Planned)

### Product Management

* Create Product
* Update Product
* Delete Product
* Manage Categories
* Manage Brands
* Manage Product Images
* Manage Product Variants

### Order Management

* View Orders
* Update Order Status
* Process Orders
* Shipping Management

### Customer Management

* Customer List
* Customer Detail
* Order Tracking
* Customer Activity Monitoring

---

# 📂 Project Structure

```bash
src/
├── app/
│   ├── page.tsx
│   ├── catalog/
│   ├── cart/
│   ├── checkout/
│   └── product/
│       └── [slug]/
│           ├── page.tsx
│           └── ProductDetailClient.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Badge.tsx
│
├── data/
│   └── products.ts
│
├── lib/
│   └── utils.ts
│
└── app/globals.css
```

---

# 🚀 Getting Started

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build Production

```bash
npm run build
```

## Start Production Server

```bash
npm start
```

---

# 🗺 Development Roadmap

## Phase 1 – Frontend

* [x] Home Page
* [x] Catalog Page
* [x] Product Detail Page
* [x] Shopping Cart
* [ ] Checkout Page
* [ ] Authentication
* [ ] Wishlist

## Phase 2 – State Management

* [ ] Zustand Cart Store
* [ ] Persistent Cart
* [ ] User Session

## Phase 3 – Backend

* [x] Laravel API
* [x] Product CRUD
* [x] Category CRUD
* [x] Brand CRUD
* [ ] Order Management
* [ ] Customer Management

## Phase 4 – Production

* [ ] Payment Gateway
* [ ] Email Notifications
* [ ] SEO Optimization
* [ ] Analytics
* [ ] CMS Integration

---

# 👨‍💻 Author

**Rian Rahman Al Aziz**

Frontend & Backend Developer

Built with ❤️ using Next.js and Laravel.
