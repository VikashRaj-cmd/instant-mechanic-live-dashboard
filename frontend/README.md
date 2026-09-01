# 🖥️ Instant Mechanic Frontend Dashboard

The frontend application for the **Instant Mechanic Live Operations Dashboard**, built with **React 18**, **Vite**, **TypeScript**, **Tailwind CSS**, **Recharts**, and **Socket.io-client**.

---

## 🚀 Tech Stack & Features

- **Framework**: React 18 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism dark theme tokens
- **Real-Time Client**: Socket.io-client
- **Visual Analytics**: Recharts
- **Icons**: Lucide Icons
- **HTTP Client**: Axios

---

## 📁 Component Architecture

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Top bar with Socket connection status badge, search, theme toggle
│   │   ├── Sidebar.tsx       # Brand logo & tab navigation links
│   │   └── Layout.tsx        # Main application layout wrapper
│   ├── dashboard/
│   │   ├── MetricCard.tsx    # Reusable glassmorphic KPI metric card
│   │   ├── OverviewView.tsx  # 8 KPI metrics grid & live activity feed ticker
│   │   └── AnalyticsView.tsx # Recharts charts (Area, Bar, Donut, Horizontal Bar)
│   ├── bookings/
│   │   └── BookingsView.tsx  # Enterprise data table with search, filter, sort, pagination, CSV export
│   ├── mechanics/
│   │   └── MechanicsView.tsx # Mechanics fleet roster cards with duty status badges
│   ├── map/
│   │   └── LiveMapView.tsx   # Interactive geospatial live location map
│   ├── modals/
│   │   └── BookingDetailModal.tsx # Full booking metadata & diagnostic notes drawer
│   └── docs/
│       └── ApiDocsModal.tsx  # Swagger / OpenAPI documentation viewer
├── hooks/
│   └── useSocket.ts          # Real-time WebSockets hook listening to backend events
├── services/
│   └── api.ts                # Axios API service client
├── types/
│   └── index.ts              # TypeScript interface definitions
├── utils/
│   └── csvExport.ts          # One-click CSV export utility
├── index.css                 # Tailwind base styles & glassmorphic utilities
├── App.tsx                   # Main root view state manager
└── main.tsx                  # React DOM entry point
```

---

## ⚡ Local Development

```bash
cd frontend
npm install
npm run dev
```
The application will run on `http://localhost:3000`.

### Building for Production
```bash
npm run build
```
Creates an optimized production bundle in `dist/`.
