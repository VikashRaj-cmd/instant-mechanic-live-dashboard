import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Booking } from '../types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 
  (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:5000` : 'http://localhost:5000');

export const useSocket = (onBookingUpdated?: (updatedBooking: Booking, message: string) => void) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastNotification, setLastNotification] = useState<{ message: string; timestamp: Date } | null>(null);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5
    });

    socket.on('connect', () => {
      console.log('[Socket] Connected to backend gateway:', socket.id);
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('[Socket] Disconnected from backend gateway');
      setIsConnected(false);
    });

    socket.on('booking_status_updated', (data: { booking: Booking; message: string; timestamp: string }) => {
      setLastNotification({
        message: data.message,
        timestamp: new Date()
      });

      if (onBookingUpdated) {
        onBookingUpdated(data.booking, data.message);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { isConnected, lastNotification };
};
