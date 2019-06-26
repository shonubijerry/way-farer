import debug from 'debug';
import Model from '../model';
import seed from './seed.db';

debug('app/seeder')('Seeding database...');

const userSeeder = new Model('users');
const busSeeder = new Model('bus');
const tripSeeder = new Model('trip');
const bookingSeeder = new Model('booking');

const seed1 = seed.user.forEach(async (element) => {
  await userSeeder.insert(
    'id, email, first_name, last_name, password, is_admin',
    '$1, $2, $3, $4, $5, $6',
    Object.values(element),
  );
});

const seed2 = seed.bus.forEach(async (element) => {
  await busSeeder.insert(
    'id, number_plate, manufacturer, model, year, capacity',
    '$1, $2, $3, $4, $5, $6',
    Object.values(element),
  );
});

const seed3 = seed.trip.forEach(async (element) => {
  await tripSeeder.insert(
    'id, bus_id, origin, destination, trip_date, fare, status',
    '$1, $2, $3, $4, $5, $6, $7',
    Object.values(element),
  );
});

const seed4 = seed.booking.forEach(async (element) => {
  await bookingSeeder.insert(
    'id, trip_id, user_id',
    '$1, $2, $3',
    Object.values(element),
  );
});

const tasks = [
  seed1,
  seed2,
  seed3,
  seed4,
];

export default tasks;
