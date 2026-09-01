const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Customer = require('./models/Customer');
const Mechanic = require('./models/Mechanic');
const Service = require('./models/Service');
const Booking = require('./models/Booking');

dotenv.config();

let MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/instant_mechanic';
if (MONGO_URI.includes('cluster0.xxx.mongodb.net')) {
  console.log('[Seeder Notice] Default placeholder MONGO_URI detected. Attempting connection to local MongoDB: mongodb://127.0.0.1:27017/instant_mechanic');
  MONGO_URI = 'mongodb://127.0.0.1:27017/instant_mechanic';
}


// Sample Data Lists
const FIRST_NAMES = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Sam', 'Chris', 'Pat', 'Casey', 'Riley', 'Dakota',
  'Avery', 'Reese', 'Quinn', 'Skyler', 'Cameron', 'Logan', 'Elliot', 'Peyton', 'Hayden', 'Devon',
  'Marcus', 'Sophia', 'Ethan', 'Olivia', 'Liam', 'Emma', 'Noah', 'Ava', 'Jackson', 'Isabella',
  'Aiden', 'Mia', 'Lucas', 'Harper', 'Benjamin', 'Evelyn', 'Elijah', 'Abigail', 'Oliver', 'Emily',
  'Sebastian', 'Elizabeth', 'Mateo', 'Sofia', 'Wyatt', 'Avery', 'Jack', 'Ella', 'Daniel', 'Scarlett',
  'Henry', 'Grace', 'Owen', 'Chloe', 'Alexander', 'Victoria', 'Caleb', 'Riley', 'Ryan', 'Aria'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

const VEHICLE_MAKES = [
  { make: 'Toyota', models: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'] },
  { make: 'Honda', models: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'] },
  { make: 'Ford', models: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Edge'] },
  { make: 'Chevrolet', models: ['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Suburban'] },
  { make: 'BMW', models: ['3 Series', '5 Series', 'X3', 'X5', 'M4'] },
  { make: 'Tesla', models: ['Model 3', 'Model Y', 'Model S', 'Model X'] },
  { make: 'Hyundai', models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe'] },
  { make: 'Subaru', models: ['Outback', 'Forester', 'Impreza', 'Crosstrek'] }
];

const SERVICES_DATA = [
  {
    name: 'Emergency Roadside Repair',
    category: 'Emergency Repair',
    basePrice: 150,
    estimatedMinutes: 45,
    description: 'Rapid on-site emergency vehicle troubleshooting and quick fix.',
    icon: 'AlertTriangle'
  },
  {
    name: 'Full Engine Computer Diagnostic',
    category: 'Engine Diagnostic',
    basePrice: 110,
    estimatedMinutes: 30,
    description: 'Comprehensive OBD-II scan, error code readout, and sensor check.',
    icon: 'Cpu'
  },
  {
    name: 'Synthetic Oil & Filter Service',
    category: 'Oil & Filter Service',
    basePrice: 85,
    estimatedMinutes: 35,
    description: 'Premium synthetic oil change, filter replacement, and fluid check.',
    icon: 'Droplet'
  },
  {
    name: 'Brake Pad & Rotor Replacement',
    category: 'Brake System',
    basePrice: 240,
    estimatedMinutes: 60,
    description: 'Front or rear ceramic brake pad installation with rotor resurfacing.',
    icon: 'Disc'
  },
  {
    name: '12V Battery Testing & Replacement',
    category: 'Battery & Electrical',
    basePrice: 175,
    estimatedMinutes: 25,
    description: 'Battery health test, terminal cleaning, and new battery installation.',
    icon: 'Zap'
  },
  {
    name: 'Tire Rotation & Wheel Balancing',
    category: 'Tire & Wheel',
    basePrice: 95,
    estimatedMinutes: 40,
    description: '4-wheel rotation, pressure calibration, and precision balancing.',
    icon: 'Circle'
  }
];

const MECHANIC_NAMES = [
  'Carlos Rodriguez', 'David Chen', 'Robert Taylor', 'James Miller', 'Emily Watson',
  'Michael Chang', 'Brian O\'Connor', 'Dmitri Volkov', 'Sarah Jenkins', 'Marcus Vance',
  'Anthony Rossi', 'Kevin Durant', 'Jason Statham', 'Rachel Green', 'Trevor Philips',
  'Victor Stone', 'Lara Croft', 'Nathan Drake', 'Bruce Wayne', 'Diana Prince',
  'Peter Parker', 'Tony Stark', 'Steve Rogers', 'Natasha Romanoff', 'Sam Wilson'
];

const BAY_AREA_LOCATIONS = [
  { address: 'Financial District, San Francisco, CA', lat: 37.7946, lng: -122.3999 },
  { address: 'Mission District, San Francisco, CA', lat: 37.7599, lng: -122.4148 },
  { address: 'SOMA, San Francisco, CA', lat: 37.7785, lng: -122.3956 },
  { address: 'Downtown Oakland, CA', lat: 37.8044, lng: -122.2712 },
  { address: 'Berkeley Central, CA', lat: 37.8715, lng: -122.2730 },
  { address: 'Downtown San Jose, CA', lat: 37.3382, lng: -121.8863 },
  { address: 'Palo Alto Tech Hub, CA', lat: 37.4419, lng: -122.1430 },
  { address: 'Mountain View, CA', lat: 37.3861, lng: -122.0839 }
];

const STATUSES = ['Pending', 'Assigned', 'Mechanic On The Way', 'In Progress', 'Completed', 'Cancelled'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const seedDatabase = async () => {
  try {
    console.log('[Seeder] Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('[Seeder] Connected to MongoDB Atlas.');

    // Clear existing collections
    await Customer.deleteMany({});
    await Mechanic.deleteMany({});
    await Service.deleteMany({});
    await Booking.deleteMany({});
    console.log('[Seeder] Cleared old collections.');

    // 1. Seed Services
    console.log('[Seeder] Creating Services...');
    const createdServices = await Service.insertMany(SERVICES_DATA);

    // 2. Seed 60 Customers
    console.log('[Seeder] Creating 60 Customers...');
    const customersData = [];
    for (let i = 0; i < 60; i++) {
      const fname = getRandomItem(FIRST_NAMES);
      const lname = getRandomItem(LAST_NAMES);
      const name = `${fname} ${lname}`;
      const email = `${fname.toLowerCase()}.${lname.toLowerCase()}${i}@example.com`;
      const phone = `+1 (${getRandomInt(415, 650)}) ${getRandomInt(200, 999)}-${getRandomInt(1000, 9999)}`;
      const locationObj = getRandomItem(BAY_AREA_LOCATIONS);
      
      const vMakeObj = getRandomItem(VEHICLE_MAKES);
      const vehicle = {
        make: vMakeObj.make,
        model: getRandomItem(vMakeObj.models),
        year: getRandomInt(2015, 2024),
        licensePlate: `${getRandomInt(5, 9)}${String.fromCharCode(65 + getRandomInt(0, 25))}${String.fromCharCode(65 + getRandomInt(0, 25))}${getRandomInt(100, 999)}`
      };

      customersData.push({
        name,
        email,
        phone,
        address: locationObj.address,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        vehicles: [vehicle],
        joinedAt: new Date(Date.now() - getRandomInt(1, 180) * 24 * 60 * 60 * 1000)
      });
    }
    const createdCustomers = await Customer.insertMany(customersData);

    // 3. Seed 25 Mechanics
    console.log('[Seeder] Creating 25 Mechanics...');
    const mechanicsData = [];
    const mechanicStatuses = ['Available', 'On Duty', 'In Transit', 'Busy', 'Offline'];
    
    for (let i = 0; i < MECHANIC_NAMES.length; i++) {
      const name = MECHANIC_NAMES[i];
      const email = `${name.toLowerCase().replace(/[^a-z]/g, '')}@instantmechanic.com`;
      const phone = `+1 (415) ${getRandomInt(500, 899)}-${getRandomInt(1000, 9999)}`;
      const loc = BAY_AREA_LOCATIONS[i % BAY_AREA_LOCATIONS.length];
      const status = mechanicStatuses[i % mechanicStatuses.length];

      mechanicsData.push({
        name,
        email,
        phone,
        status,
        jobsCompleted: getRandomInt(25, 240),
        rating: (Math.random() * 0.5 + 4.5).toFixed(1),
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
        specialization: getRandomItem(['Engine Specialist', 'Brake Systems & Transmission', 'EV & Electrical Expert', 'Master Auto Tech', 'Emergency Response']),
        location: {
          address: loc.address,
          lat: loc.lat + (Math.random() - 0.5) * 0.04,
          lng: loc.lng + (Math.random() - 0.5) * 0.04
        }
      });
    }
    const createdMechanics = await Mechanic.insertMany(mechanicsData);

    // 4. Seed 550+ Bookings
    console.log('[Seeder] Generating 550+ realistic Bookings across 180 days...');
    const bookingsData = [];
    const now = new Date();

    for (let i = 1; i <= 550; i++) {
      const customer = getRandomItem(createdCustomers);
      const vehicle = customer.vehicles[0];
      const service = getRandomItem(createdServices);
      const bookingId = `BK-${10000 + i}`;
      
      // Determine date distribution:
      // 15 bookings are TODAY
      // 480 bookings are past dates (last 180 days)
      // 55 bookings are recent active or future
      let bookingDate;
      let status;
      let mechanic = null;
      let mechanicName = 'Unassigned';

      if (i <= 15) {
        // Today's bookings
        bookingDate = new Date();
        bookingDate.setHours(getRandomInt(8, 18), getRandomInt(0, 59), 0);
        status = getRandomItem(['Pending', 'Assigned', 'Mechanic On The Way', 'In Progress', 'Completed', 'Cancelled']);
      } else if (i <= 510) {
        // Past bookings
        const daysAgo = getRandomInt(1, 180);
        bookingDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
        status = Math.random() > 0.1 ? 'Completed' : 'Cancelled';
      } else {
        // Active / Recent
        const hoursAgo = getRandomInt(1, 48);
        bookingDate = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
        status = getRandomItem(['Pending', 'Assigned', 'Mechanic On The Way', 'In Progress']);
      }

      if (status !== 'Pending' && status !== 'Cancelled') {
        const assignedMech = getRandomItem(createdMechanics);
        mechanic = assignedMech._id;
        mechanicName = assignedMech.name;
      }

      const amountMultiplier = (Math.random() * 0.4 + 0.9);
      const amount = Math.round(service.basePrice * amountMultiplier);
      const loc = getRandomItem(BAY_AREA_LOCATIONS);

      bookingsData.push({
        bookingId,
        customer: customer._id,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email,
        vehicle,
        service: service._id,
        serviceName: service.name,
        serviceCategory: service.category,
        mechanic,
        mechanicName,
        status,
        amount,
        paymentStatus: status === 'Cancelled' ? 'Refunded' : (status === 'Pending' ? 'Pending' : 'Paid'),
        location: {
          address: customer.address || loc.address,
          lat: loc.lat + (Math.random() - 0.5) * 0.02,
          lng: loc.lng + (Math.random() - 0.5) * 0.02
        },
        notes: `Customer requested ${service.name} for ${vehicle.year} ${vehicle.make} ${vehicle.model}.`,
        createdAt: bookingDate,
        scheduledAt: bookingDate,
        completedAt: status === 'Completed' ? new Date(bookingDate.getTime() + 45 * 60 * 1000) : null
      });
    }

    const createdBookings = await Booking.insertMany(bookingsData);
    console.log(`[Seeder] Successfully seeded ${createdBookings.length} Bookings!`);

    // Update customer totalBookings count
    for (const cust of createdCustomers) {
      const count = createdBookings.filter(b => b.customer.toString() === cust._id.toString()).length;
      await Customer.findByIdAndUpdate(cust._id, { totalBookings: count });
    }

    console.log('[Seeder] Finished seeding database successfully.');
    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
