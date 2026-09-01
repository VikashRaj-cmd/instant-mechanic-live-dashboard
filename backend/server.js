const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { initSocket } = require('./services/socketService');

// Route Imports
const dashboardRoutes = require('./routes/dashboardRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const mechanicRoutes = require('./routes/mechanicRoutes');
const customerRoutes = require('./routes/customerRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.io Real-Time Engine
initSocket(server);

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Database Connection
connectDB();

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Instant Mechanic Operations Backend API',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// Mount Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/mechanics', mechanicRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/services', serviceRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚗 Instant Mechanic Live Backend Running on Port ${PORT}`);
  console.log(`📡 REST API Base: http://localhost:${PORT}/api`);
  console.log(`⚡ WebSocket Engine: ws://localhost:${PORT}`);
  console.log(`===================================================`);
});
