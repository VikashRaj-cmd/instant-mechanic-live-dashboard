const { Server } = require('socket.io');
const inMemory = require('./inMemoryDataService');
const Booking = require('../models/Booking');

let io = null;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE']
    }
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    socket.emit('connection_established', {
      message: 'Connected to Instant Mechanic Live Engine',
      timestamp: new Date()
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });

  // Start Automated Live Status Simulator (Every 18 seconds)
  startLiveOperationsSimulator();

  return io;
};

const getIO = () => {
  return io;
};

// Background Live Operations Simulator
const startLiveOperationsSimulator = () => {
  setInterval(async () => {
    try {
      if (!io) return;

      const statusSequence = ['Pending', 'Assigned', 'Mechanic On The Way', 'In Progress', 'Completed'];

      // Attempt Mongoose DB or In-Memory
      let bookingToUpdate = null;
      let isDb = false;

      try {
        if (Booking.db.readyState === 1) {
          const activeBookings = await Booking.find({
            status: { $in: ['Pending', 'Assigned', 'Mechanic On The Way', 'In Progress'] }
          }).limit(20);

          if (activeBookings.length > 0) {
            const randomBk = activeBookings[Math.floor(Math.random() * activeBookings.length)];
            const currentIdx = statusSequence.indexOf(randomBk.status);
            const nextStatus = currentIdx !== -1 && currentIdx < statusSequence.length - 1
              ? statusSequence[currentIdx + 1]
              : 'Completed';

            randomBk.status = nextStatus;
            if (nextStatus === 'Completed') randomBk.completedAt = new Date();
            await randomBk.save();
            bookingToUpdate = randomBk.toObject();
            isDb = true;
          }
        }
      } catch (e) {
        // Fallback
      }

      if (!isDb) {
        const activeList = inMemory.BOOKINGS.filter(b =>
          ['Pending', 'Assigned', 'Mechanic On The Way', 'In Progress'].includes(b.status)
        );

        if (activeList.length > 0) {
          const randomBk = activeList[Math.floor(Math.random() * activeList.length)];
          const currentIdx = statusSequence.indexOf(randomBk.status);
          const nextStatus = currentIdx !== -1 && currentIdx < statusSequence.length - 1
            ? statusSequence[currentIdx + 1]
            : 'Completed';

          randomBk.status = nextStatus;
          if (nextStatus === 'Completed') randomBk.completedAt = new Date();
          bookingToUpdate = randomBk;
        }
      }

      if (bookingToUpdate) {
        io.emit('booking_status_updated', {
          booking: bookingToUpdate,
          message: `⚡ Live Dispatch: Booking #${bookingToUpdate.bookingId} status transitioned to '${bookingToUpdate.status}'`,
          timestamp: new Date()
        });
        console.log(`[Socket Simulator Broadcast] #${bookingToUpdate.bookingId} -> ${bookingToUpdate.status}`);
      }
    } catch (err) {
      console.warn('[Socket Simulator Error]:', err.message);
    }
  }, 18000); // 18 seconds
};

module.exports = {
  initSocket,
  getIO
};
