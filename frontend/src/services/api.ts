import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchDashboardData = async () => {
  const response = await api.get('/dashboard');
  return response.data.data;
};

export const fetchBookings = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) => {
  const response = await api.get('/bookings', { params });
  return response.data;
};

export const updateBookingStatus = async (id: string, status: string, mechanicName?: string) => {
  const response = await api.patch(`/bookings/${id}/status`, { status, mechanicName });
  return response.data;
};

export const fetchMechanics = async () => {
  const response = await api.get('/mechanics');
  return response.data.data;
};

export const fetchCustomers = async () => {
  const response = await api.get('/customers');
  return response.data.data;
};
