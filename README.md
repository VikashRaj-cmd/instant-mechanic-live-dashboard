# 🚗 Instant Mechanic - Live Operations Dashboard

A modern, production-grade **Live Vehicle Service Operations Dashboard** built for **Instant Mechanic** to monitor bookings, active mechanics, customer fleets, real-time revenue analytics, and live service transitions.

---

## 📌 Project Overview
Instant Mechanic Live Operations Dashboard is designed for daily use by operations managers, dispatchers, and support teams. It provides real-time visibility into vehicle repair bookings, active mechanic availability, automated job status tracking, and revenue metrics without requiring page reloads.

Key Highlights:
- **Real-Time Live Updates**: Powered by WebSockets (Socket.io) for instantaneous status updates across all connected clients.
- **Enterprise Visual Analytics**: Interactive charts for bookings, revenue trends, status distribution, and service category breakdown.
- **Advanced Bookings Management**: Search, multi-criteria filtering, multi-column sorting, pagination, and quick status mutations.
- **Mechanic Fleet Roster**: Live duty status tracking, job completion metrics, and location visualizer.
- **Production-Grade MERN Architecture**: Scalable Node.js/Express backend paired with MongoDB Atlas online database and a high-performance React + TypeScript frontend.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 / Vite with TypeScript
- **Styling**: Tailwind CSS, Lucide Icons, Modern SaaS UI Components
- **State & Data Visualizations**: Recharts / Chart.js, Custom Hooks
- **Real-time Client**: Socket.io-client
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Real-time Gateway**: Socket.io WebSockets Engine
- **Data Generator**: Custom Seeder (500+ Bookings, 50+ Customers, 20+ Mechanics)
- **Deployment**: AWS EC2 / Render / Cloud Hosting

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│              Frontend (React + TypeScript)                  │
│       - Modern Operations Dashboard & Analytics UI          │
│       - Socket.io Client for Real-time Event Streaming     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                      HTTP REST / WebSockets
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                Backend API (Node.js + Express)              │
│       - REST Controllers (/api/dashboard, /api/bookings)   │
│       - Socket.io Real-Time Dispatcher & Event Broadcaster  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                         Mongoose ODM
                               │
┌──────────────────────────────▼──────────────────────────────┐
│              Database (MongoDB Atlas Cloud)                 │
│       - Customers, Mechanics, Bookings, Services Schemas    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas Account or Local MongoDB instance

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/instant-mechanic-live-dashboard.git
cd instant-mechanic-live-dashboard
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run seed  # Populates database with 500+ realistic bookings & mechanics
npm run dev   # Runs Express API server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev   # Runs React dashboard on http://localhost:3000
```

---

## 🔑 Environment Variables

### Backend (`/backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/instant_mechanic?retryWrites=true&w=majority
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3000
```

### Frontend (`/frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## 📡 API Documentation Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Returns summary KPI metrics and chart analytics dataset |
| `GET` | `/api/bookings` | Returns paginated, searchable, and filtered bookings |
| `GET` | `/api/bookings/:id` | Returns single booking detail |
| `PATCH` | `/api/bookings/:id/status` | Updates booking status & broadcasts real-time WebSocket event |
| `GET` | `/api/mechanics` | Returns list of all mechanics, duty status, and current jobs |
| `GET` | `/api/customers` | Returns customer directory |
| `GET` | `/api/services` | Returns service categories and pricing breakdown |

---

## ☁️ Deployment

- **Frontend**: Deployed on **Vercel** with continuous deployment from GitHub main branch.
- **Backend**: Deployed on **AWS / Cloud Hosting** with WebSocket support enabled.
- **Database**: Hosted on **MongoDB Atlas (M0 Cloud Cluster)**.

---

## 🤖 AI Usage Statement

In accordance with the assignment guidelines:
- **AI Tools Used**: Cursor, Claude, ChatGPT, Gemini.
- **Purpose**: Architecture design, initial mock data generation algorithms, schema optimization, and responsive layout polish.
- **Custom Enhancements**: Fully engineered custom Socket.io real-time broadcast system, robust multi-param query filters for MongoDB, seed data engine, error boundary handling, and complete MERN separation.
