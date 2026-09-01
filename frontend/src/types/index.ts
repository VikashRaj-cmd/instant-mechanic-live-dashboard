export type BookingStatus =
  | 'Pending'
  | 'Assigned'
  | 'Mechanic On The Way'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin?: string;
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface Booking {
  _id: string;
  bookingId: string;
  customer: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  vehicle: Vehicle;
  service?: string;
  serviceName: string;
  serviceCategory: string;
  mechanic?: string;
  mechanicName: string;
  status: BookingStatus;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  location: Location;
  notes?: string;
  createdAt: string;
  scheduledAt?: string;
  completedAt?: string | null;
}

export interface Mechanic {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Available' | 'On Duty' | 'In Transit' | 'Busy' | 'Offline';
  jobsCompleted: number;
  rating: number;
  avatar: string;
  specialization: string;
  location: Location;
  currentBooking?: string | null;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  totalBookings: number;
  joinedAt: string;
}

export interface Service {
  _id: string;
  name: string;
  category: string;
  basePrice: number;
  estimatedMinutes: number;
  description: string;
  icon: string;
}

export interface OverviewStats {
  totalBookings: number;
  todaysBookings: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  inProgressBookings: number;
  totalRevenue: number;
  activeMechanics: number;
  totalMechanics: number;
  newCustomers: number;
  totalCustomers: number;
}

export interface AnalyticsData {
  bookingsOverTime: Array<{ month: string; bookings: number; revenue: number }>;
  statusBreakdown: Array<{ status: string; count: number; color: string }>;
  categoryBreakdown: Array<{ category: string; count: number }>;
}

export interface DashboardResponse {
  overview: OverviewStats;
  analytics: AnalyticsData;
}
