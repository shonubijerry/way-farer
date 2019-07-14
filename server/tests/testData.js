/**
 * @fileOverview - This module holds test data
 * @exports - object
 */
const futute_date = new Date(Date.now() + 86900);
const past_date = new Date(Date.now() - 86900);
const trip = [
  { // element 0
    bus_id: '1', // valid trip details
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: futute_date.toISOString(),
    fare: 750,
  },
  { // element 1
    bus_id: '1-6655', // invalid bus_id
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: futute_date.toISOString(),
    fare: 750,
  },
  { // element 2
    bus_id: '1',
    origin: '', // empty origin
    destination: 'Ikeja, Lagos',
    trip_date: futute_date.toISOString(),
    fare: 750,
  },
  { // element 3
    bus_id: '1',
    origin: 'Ikeja, Lagos',
    destination: '', // empty destination
    trip_date: futute_date.toISOString(),
    fare: 750,
  },
  { // element 4
    bus_id: '1',
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: '2020-06-27T12:23-33', // invalid date
    fare: 750,
  },
  { // element 5
    bus_id: '1',
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: '', // empty date
    fare: 750,
  },
  { // element 6
    bus_id: '1',
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: futute_date.toISOString(),
    fare: 'fr4', // invalid fare
  },
  { // element 7
    bus_id: '1',
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: futute_date.toISOString(),
    fare: '', // empty fare
  },
  { // element 8
    bus_id: '3', // bus is already assigned to a trip
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: futute_date.toISOString(),
    fare: 750,
  },
  { // element 9
    bus_id: '12', // bus does not exist
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: futute_date.toISOString(),
    fare: 750,
  },
  { // element 10
    bus_id: '1',
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: past_date.toISOString(), // trip date is in the past 2020-01-27T12:23
    fare: 750,
  },
];

const bus = [
  { // element 0
    number_plate: 'KJA-675-WA', // valid bus details
    manufacturer: 'Toyota',
    model: 'Camrey',
    year: 1975,
    capacity: 40,
  },
  { // element 1
    number_plate: 'KJA-675-WAW', // invalid number plate
    manufacturer: 'Toyota',
    model: 'Camrey',
    year: 1975,
    capacity: 40,
  },
  { // element 2
    number_plate: '', // empty number plate
    manufacturer: 'Toyota',
    model: 'Camrey',
    year: 1975,
    capacity: 40,
  },
  { // element 3
    number_plate: 'KJA-675-WA',
    manufacturer: '', // empty manufacturer
    model: 'Camrey',
    year: 1975,
    capacity: 40,
  },
  { // element 4
    number_plate: 'KJA-675-WA',
    manufacturer: 'Toyota',
    model: '', // empty model
    year: 1975,
    capacity: 40,
  },
  { // element 5
    number_plate: 'KJA-675-WA',
    manufacturer: 'Toyota',
    model: 'Camrey',
    year: 1900, // invalid manufacture year
    capacity: 40,
  },
  { // element 6
    number_plate: 'KJA-675-WA',
    manufacturer: 'Toyota',
    model: 'Camrey',
    year: '', // empty manufacture year
    capacity: 40,
  },
  { // element 7
    number_plate: 'KJA-675-WA',
    manufacturer: 'Toyota',
    model: 'Camrey',
    year: 1975,
    capacity: 600, // invalid bus capacity
  },
  { // element 8
    number_plate: 'KJA-675-WA',
    manufacturer: 'Toyota',
    model: 'Camrey',
    year: 1975,
    capacity: 600, // empty bus capacity
  },
];

export default {
  trip, bus,
};
