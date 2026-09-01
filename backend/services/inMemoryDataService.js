// In-Memory Data Store & Dynamic Engine for instant execution
const FIRST_NAMES = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Sam', 'Chris', 'Pat', 'Casey', 'Riley', 'Dakota', 'Marcus', 'Sophia', 'Ethan', 'Olivia', 'Liam', 'Emma', 'Noah', 'Ava', 'Jackson', 'Isabella'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];
const VEHICLES = [
  { make: 'Toyota', model: 'Camry', year: 2022 },
  { make: 'Honda', model: 'Civic', year: 2021 },
  { make: 'Ford', model: 'F-150', year: 2023 },
  { make: 'Tesla', model: 'Model 3', year: 2023 },
  { make: 'BMW', model: '3 Series', year: 2020 },
  { make: 'Chevrolet', model: 'Silverado', year: 2022 }
];

const SERVICES = [
  { _id: 'srv-1', name: 'Emergency Roadside Repair', category: 'Emergency Repair', basePrice: 150 },
  { _id: 'srv-2', name: 'Full Engine Computer Diagnostic', category: 'Engine Diagnostic', basePrice: 110 },
  { _id: 'srv-3', name: 'Synthetic Oil & Filter Service', category: 'Oil & Filter Service', basePrice: 85 },
  { _id: 'srv-4', name: 'Brake Pad & Rotor Replacement', category: 'Brake System', basePrice: 240 },
  { _id: 'srv-5', name: '12V Battery Testing & Replacement', category: 'Battery & Electrical', basePrice: 175 },
  { _id: 'srv-6', name: 'Tire Rotation & Wheel Balancing', category: 'Tire & Wheel', basePrice: 95 }
];

const MECHANICS = [
  { _id: 'mech-1', name: 'Carlos Rodriguez', email: 'carlos@instantmechanic.com', phone: '+1 (415) 555-0192', status: 'On Duty', jobsCompleted: 142, rating: 4.9, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Carlos', location: { address: 'Financial District, SF', lat: 37.7946, lng: -122.3999 } },
  { _id: 'mech-2', name: 'David Chen', email: 'david@instantmechanic.com', phone: '+1 (415) 555-0184', status: 'In Transit', jobsCompleted: 98, rating: 4.8, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=David', location: { address: 'Mission District, SF', lat: 37.7599, lng: -122.4148 } },
  { _id: 'mech-3', name: 'Robert Taylor', email: 'robert@instantmechanic.com', phone: '+1 (415) 555-0177', status: 'Available', jobsCompleted: 185, rating: 5.0, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Robert', location: { address: 'SOMA, SF', lat: 37.7785, lng: -122.3956 } },
  { _id: 'mech-4', name: 'James Miller', email: 'james@instantmechanic.com', phone: '+1 (415) 555-0163', status: 'Busy', jobsCompleted: 110, rating: 4.7, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=James', location: { address: 'Downtown Oakland', lat: 37.8044, lng: -122.2712 } },
  { _id: 'mech-5', name: 'Emily Watson', email: 'emily@instantmechanic.com', phone: '+1 (415) 555-0155', status: 'Available', jobsCompleted: 76, rating: 4.9, avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Emily', location: { address: 'Palo Alto', lat: 37.4419, lng: -122.1430 } }
];

let CUSTOMERS = [];
let BOOKINGS = [];

function generateInitialData() {
  if (BOOKINGS.length > 0) return;

  // Generate 50 Customers
  for (let i = 1; i <= 50; i++) {
    const fn = FIRST_NAMES[i % FIRST_NAMES.length];
    const ln = LAST_NAMES[i % LAST_NAMES.length];
    const name = `${fn} ${ln}`;
    CUSTOMERS.push({
      _id: `cust-${i}`,
      name,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`,
      phone: `+1 (415) 555-${1000 + i}`,
      address: `${100 + i} Market Street, San Francisco, CA`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      totalBookings: 0,
      joinedAt: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000)
    });
  }

  // Generate 550 Bookings
  const statuses = ['Pending', 'Assigned', 'Mechanic On The Way', 'In Progress', 'Completed', 'Cancelled'];
  const now = Date.now();

  for (let i = 1; i <= 550; i++) {
    const cust = CUSTOMERS[i % CUSTOMERS.length];
    const srv = SERVICES[i % SERVICES.length];
    const mech = MECHANICS[i % MECHANICS.length];
    const veh = VEHICLES[i % VEHICLES.length];
    
    let status;
    let createdAt;
    
    if (i <= 15) {
      // Today's bookings
      status = statuses[i % statuses.length];
      createdAt = new Date(now - (i * 30 * 60 * 1000));
    } else if (i <= 500) {
      // Historical past completed/cancelled
      status = (i % 8 === 0) ? 'Cancelled' : 'Completed';
      createdAt = new Date(now - (i * 7 * 60 * 60 * 1000));
    } else {
      // Active pending / assigned
      status = (i % 2 === 0) ? 'Pending' : 'Assigned';
      createdAt = new Date(now - (i * 10 * 60 * 1000));
    }

    cust.totalBookings += 1;

    BOOKINGS.push({
      _id: `bk-${i}`,
      bookingId: `BK-${10000 + i}`,
      customer: cust._id,
      customerName: cust.name,
      customerPhone: cust.phone,
      customerEmail: cust.email,
      vehicle: {
        make: veh.make,
        model: veh.model,
        year: veh.year,
        licensePlate: `CA${700 + i}XY`
      },
      service: srv._id,
      serviceName: srv.name,
      serviceCategory: srv.category,
      mechanic: status !== 'Pending' && status !== 'Cancelled' ? mech._id : null,
      mechanicName: status !== 'Pending' && status !== 'Cancelled' ? mech.name : 'Unassigned',
      status,
      amount: srv.basePrice + (i % 5) * 15,
      paymentStatus: status === 'Cancelled' ? 'Refunded' : (status === 'Pending' ? 'Pending' : 'Paid'),
      location: {
        address: cust.address,
        lat: mech.location.lat + (Math.random() - 0.5) * 0.03,
        lng: mech.location.lng + (Math.random() - 0.5) * 0.03
      },
      notes: `Service request for ${veh.year} ${veh.make} ${veh.model}`,
      createdAt,
      scheduledAt: createdAt,
      completedAt: status === 'Completed' ? new Date(createdAt.getTime() + 45 * 60 * 1000) : null
    });
  }
}

generateInitialData();

module.exports = {
  BOOKINGS,
  CUSTOMERS,
  MECHANICS,
  SERVICES
};
