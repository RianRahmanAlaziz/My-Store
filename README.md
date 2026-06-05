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

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS v4
* Axios
* React Select
* React Toastify
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

### Home Page

* Hero Banner
* Featured Products
* Trending Products
* Best Seller Products
* Promotional Sections

### Product Catalog

* Product Listing
* Category Filter
* Brand Filter
* Product Sorting
* Responsive Grid Layout
* Modern Search Experience

### Product Detail

* Product Images Gallery
* Product Information
* Brand & Category Badge
* Rating & Reviews
* Size Selection
* Color Selection
* Quantity Selector
* Related Products

### Shopping Cart

* Add Product to Cart
* Update Quantity
* Change Variant
* Remove Product
* Cart Summary

### Checkout

* Customer Information
* Shipping Information
* Order Summary
* Checkout Validation

### Wishlist

* Add to Wishlist
* Remove from Wishlist
* Wishlist Management

### Review & Rating (Planned)

* Customer Reviews
* Rating Summary
* Verified Purchase Badge

### User Account (Planned)

* Register
* Login
* Profile Management
* Order History

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

## 📂 Project Structure

```bash
my-store
├── app
│   ├── (main)
│   │   ├── cart
│   │   ├── catalog
│   │   ├── checkout
│   │   ├── product
│   │   ├── wishlist
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── auth
│   │   ├── login
│   │   ├── register
│   │   ├── layout.tsx
│   │   └── loading.tsx
│   │
│   ├── contexts
│   │   └── AuthContext.tsx
│   │
│   ├── globals.css
│   └── layout.tsx
│
├── components
│   ├── layout
│   └── ui
│
├── features
│   ├── auth
│   │   └── services
│   │       └── authService.ts
│   │
│   └── main
│       ├── home
│       │   ├── components
│       │   └── services
│       │
│       ├── product
│       │   ├── components
│       │   ├── helpers
│       │   └── services
│       │
│       ├── catalog
│       │   ├── components
│       │   ├── constants
│       │   ├── helpers
│       │   └── types
│       │
│       ├── cart
│       │   └── services
│       │
│       ├── wishlist
│       │   ├── components
│       │   ├── hooks
│       │   ├── services
│       │   └── types
│       │
│       ├── category
│       │   ├── components
│       │   └── services
│       │
│       └── brand
│           └── services
│
├── lib
│   ├── axios.ts
│   └── utils.ts
│
├── public
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
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
* [x] Checkout Page
* [x] Authentication
* [x] Wishlist

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
