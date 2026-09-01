# ⚙️ Instant Mechanic Backend API & WebSockets Engine

The backend API service for **Instant Mechanic Live Operations Dashboard**, built with **Node.js**, **Express.js**, **MongoDB Atlas (Mongoose ODM)**, and **Socket.io WebSockets Engine**.

---

## 🚀 Tech Stack & Features

- **Runtime**: Node.js & Express.js
- **Database**: MongoDB Atlas Cloud (M0 Free Tier) via Mongoose
- **Real-Time Gateway**: Socket.io Engine (v4.7)
- **Data Generator**: Custom Seeder script (`seed.js`) generating 550+ bookings, 60 customers, 25 mechanics, and 6 service categories
- **Hybrid Data Engine**: Automatic fallback to in-memory dataset when database is unconfigured or offline

---

## 📁 Architecture & Directory Structure

```text
backend/
├── config/
│   └── db.js                 # MongoDB Atlas Mongoose connection module
├── controllers/
│   ├── dashboardController.js# Computes KPI metrics & analytics datasets
│   ├── bookingController.js  # Search, filter, sort, paginated query handlers
│   ├── mechanicController.js # Fleet roster query handlers
│   ├── customerController.js # Customer database query handlers
│   └── serviceController.js  # Service category list handlers
├── models/
│   ├── Customer.js           # Mongoose Customer Schema
│   ├── Mechanic.js           # Mongoose Mechanic Schema
│   ├── Service.js            # Mongoose Service Schema
│   └── Booking.js            # Mongoose Booking Schema
├── routes/
│   ├── dashboardRoutes.js    # /api/dashboard route definition
│   ├── bookingRoutes.js      # /api/bookings route definition
│   ├── mechanicRoutes.js     # /api/mechanics route definition
│   ├── customerRoutes.js     # /api/customers route definition
│   └── serviceRoutes.js      # /api/services route definition
├── services/
│   ├── socketService.js      # Socket.io gateway & live status dispatch simulator
│   └── inMemoryDataService.js# Fallback dataset engine for zero-downtime execution
├── seed.js                   # Database seeder engine
├── server.js                 # Main HTTP server entry point
└── package.json
```

---

## ⚡ Local Setup & Execution

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Seed Database (500+ Records)
```bash
npm run seed
```

### 3. Start Backend Server
```bash
npm run dev
```
Starts backend API and WebSockets server on `http://localhost:5000`.

---

## 📡 REST API Endpoints

- `GET /api/dashboard`: KPI metrics & analytics dataset
- `GET /api/bookings`: Paginated bookings list with search, status filters, and sorting
- `GET /api/bookings/:id`: Single booking detail
- `PATCH /api/bookings/:id/status`: Mutates status and broadcasts Socket.io live event
- `GET /api/mechanics`: Fleet roster & GPS coordinates
- `GET /api/customers`: Customer list
- `GET /api/services`: Service categories list
