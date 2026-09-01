import { Booking } from '../types';

export const exportBookingsToCSV = (bookings: Booking[]) => {
  if (!bookings || bookings.length === 0) return;

  const headers = [
    'Booking ID',
    'Customer Name',
    'Customer Email',
    'Customer Phone',
    'Vehicle Make',
    'Vehicle Model',
    'Vehicle Year',
    'License Plate',
    'Service Name',
    'Service Category',
    'Mechanic Name',
    'Status',
    'Amount ($)',
    'Payment Status',
    'Address',
    'Date'
  ];

  const rows = bookings.map((b) => [
    `"${b.bookingId}"`,
    `"${b.customerName}"`,
    `"${b.customerEmail || ''}"`,
    `"${b.customerPhone || ''}"`,
    `"${b.vehicle.make}"`,
    `"${b.vehicle.model}"`,
    b.vehicle.year,
    `"${b.vehicle.licensePlate}"`,
    `"${b.serviceName}"`,
    `"${b.serviceCategory}"`,
    `"${b.mechanicName}"`,
    `"${b.status}"`,
    b.amount,
    `"${b.paymentStatus}"`,
    `"${b.location?.address || ''}"`,
    `"${new Date(b.createdAt).toISOString()}"`
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `instant_mechanic_bookings_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
