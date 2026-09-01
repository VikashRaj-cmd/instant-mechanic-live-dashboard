# 🚗 Instant Mechanic — Live Vehicle Service Operations Dashboard

[![Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://github.com/VikashRaj-cmd/instant-mechanic-live-dashboard)
[![Realtime](https://img.shields.io/badge/Realtime-Socket.io%20v4.7-emerald.svg)](https://socket.io)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

A modern, production-grade **Live Vehicle Service Operations Dashboard** built for **Instant Mechanic** to monitor real-time vehicle repair bookings, mechanic fleet availability, customer accounts, financial revenue analytics, and automated live dispatch status transitions.

---

## 📌 1. Project Overview

Instant Mechanic Live Operations Dashboard is designed for daily operational use by dispatchers, customer support leads, and service operations managers. It transforms raw service requests into an interactive, real-time command center.

### Core Capabilities
- **Overview KPIs**: 8 live operational metric cards (Total Bookings, Today's Bookings, Completed, Pending, Cancelled, Gross Revenue `$X,XXX`, Active Mechanics `18/25`, New Customers).
- **Visual Analytics**: Interactive Recharts visualizations (Bookings Over Time area chart, Revenue Over Time bar chart, Status Distribution donut chart, Service Category breakdown).
- **Enterprise Bookings Table**: Multi-field text search, status filters (`Pending`, `Assigned`, `Mechanic On The Way`, `In Progress`, `Completed`, `Cancelled`), category filters, multi-column sorting (Date, Amount), pagination, and interactive status mutation dropdowns.
- **Mechanics Fleet Roster**: Real-time duty status badges (`Available`, `On Duty`, `In Transit`, `Busy`, `Offline`), completed jobs count, star ratings out of 5.0, specialization tags, active task assignments, and location coordinates.
- **Best-in-Class Live Updates**: Powered by **Socket.io WebSockets** with an automated background dispatch simulator so booking status transitions (`Pending` → `Assigned` → `Mechanic On The Way` → `In Progress` → `Completed`) dynamically reflect across all connected operations screens without requiring page reloads.
- **Bonus Features**: Geospatial Live Location Mechanic Map, Booking Deep Detail modal drawer, One-Click Export to CSV, and interactive Swagger / OpenAPI 3.0 documentation view.

---

## 🛠️ 2. Tech Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS, Custom Glassmorphic Aesthetics, Dark Mode
- **Icons**: Lucide Icons
- **Data Visualizations**: Recharts
- **Real-time Gateway Client**: Socket.io-client (v4.7)
- **HTTP Client**: Axios
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB Atlas (Cloud M0 Cluster) via Mongoose ODM
- **Real-Time Gateway**: Socket.io WebSockets Server
- **Data Seeder Engine**: Custom seeder populating 550+ bookings, 60 customers, 25 mechanics, and 6 service categories
- **Hybrid Data Engine**: Automatic seamless fallback to in-memory dataset when cloud database is offline
- **Deployment**: AWS Free Tier (EC2) / Render / App Runner

---

## 🏗️ 3. System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│             Frontend Tier (React 18 + Vite + TS)            │
│       - Modern Operations Dashboard & Visual Analytics      │
│       - Socket.io Client for Real-Time Event Streaming      │
└──────────────────────────────┬──────────────────────────────┘
                               │
               HTTP REST / WebSockets (Port 5000)
                               │
┌──────────────────────────────▼──────────────────────────────┐
│           Backend API Tier (Node.js + Express.js)           │
│       - REST Controllers (/api/dashboard, /api/bookings)   │
│       - Socket.io Real-Time Dispatcher & Event Broadcaster  │
│       - Hybrid Engine: Mongoose ODM + In-Memory Fallback    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                         Mongoose Driver
                               │
┌──────────────────────────────▼──────────────────────────────┐
│             Database Tier (MongoDB Atlas Cloud)             │
│       - Schemas: Customer, Mechanic, Booking, Service       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 4. Local Setup & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**

### Step 1: Clone Repository
```bash
git clone https://github.com/VikashRaj-cmd/instant-mechanic-live-dashboard.git
cd instant-mechanic-live-dashboard
```

### Step 2: Backend Setup & Data Seeding
```bash
cd backend
npm install
npm run seed  # Seeds 550+ bookings & mechanics into MongoDB Atlas
npm run dev   # Starts backend REST API & WebSockets on http://localhost:5000
```

### Step 3: Frontend Setup & Execution
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev   # Starts React dashboard on http://localhost:3000
```

---

## 🔑 5. Environment Variables

### Backend Environment Variables (`/backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://mechanic_admin:<YOUR_PASSWORD>@cluster0.xxx.mongodb.net/instant_mechanic?retryWrites=true&w=majority
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3000
```

### Frontend Environment Variables (`/frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## 📡 6. Major API Documentation Endpoints

| Method | Endpoint | Description | Query / Path Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Returns summary KPI metrics & analytics dataset | None |
| `GET` | `/api/bookings` | Returns paginated list of vehicle service bookings | `page`, `limit`, `search`, `status`, `category`, `sortBy`, `sortOrder` |
| `GET` | `/api/bookings/:id` | Returns single booking detail by ID | `id` (Path param) |
| `PATCH` | `/api/bookings/:id/status` | Mutates booking status & broadcasts real-time WebSockets event | `status`, `mechanicName` |
| `GET` | `/api/mechanics` | Returns mechanic fleet roster & GPS coordinates | `None` |
| `GET` | `/api/customers` | Returns customer accounts directory | `None` |
| `GET` | `/api/services` | Returns service categories & pricing | `None` |

---

## ☁️ 7. Production Deployment

### Frontend Deployment (Vercel)
- **Deployment Platform**: Vercel
- **Build Settings**: Framework: Vite, Root Directory: `frontend`
- **Live URL**: `https://instant-mechanic-live-dashboard.vercel.app`

### Backend Deployment (AWS Free Tier / Render)
- **Deployment Platform**: AWS EC2 (t2.micro Ubuntu 22.04 LTS) / Render
- **Process Manager**: PM2 running Node.js server 24/7 on port 5000
- **Live API URL**: `http://YOUR_AWS_EC2_IP:5000/api`

---

## 🤖 8. AI Usage Statement

In accordance with assignment guidelines:
- **AI Tools Used**: Cursor, Claude, ChatGPT, Gemini.
- **What Was Generated / Accelerated**: Initial boilerplate scaffolding, dataset seeder generation scripts (550+ records), and Tailwind CSS layout polish.
- **What Was Custom Engineered**: Custom Socket.io real-time broadcast engine, automated background dispatch status simulator, hybrid database fallback engine, multi-parameter search/filter queries, TypeScript contracts, and deployment setups.

---

## 📄 Submission Details
- **Name**: Vikash Raj
- **GitHub Repository**: [https://github.com/VikashRaj-cmd/instant-mechanic-live-dashboard](https://github.com/VikashRaj-cmd/instant-mechanic-live-dashboard)
- **Live Vercel URL**: `https://instant-mechanic-live-dashboard.vercel.app`
- **Live Backend URL**: `http://YOUR_AWS_EC2_IP:5000/api`
