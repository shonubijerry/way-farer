/**
 * @fileOverview - This module holds test data
 * @exports - object
 */

const trip = [
  { // element 0
    bus_id: '8502d3d7-9c27-4a3e-bcd0-b1ecf914e628', // valid trip details
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: new Date(Date.now() + 86900),
    fare: 750,
  },
  { // element 1
    bus_id: '8502d3d7-9c27-4a3e-bcd0-b1ecf914e628-6655', // invalid bus_id
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: new Date(Date.now() + 86900),
    fare: 750,
  },
  { // element 2
    bus_id: '8502d3d7-9c27-4a3e-bcd0-b1ecf914e628',
    origin: '', // empty origin
    destination: 'Ikeja, Lagos',
    trip_date: new Date(Date.now() + 86900),
    fare: 750,
  },
  { // element 3
    bus_id: '8502d3d7-9c27-4a3e-bcd0-b1ecf914e628',
    origin: 'Ikeja, Lagos',
    destination: '', // empty destination
    trip_date: new Date(Date.now() + 86900),
    fare: 750,
  },
  { // element 4
    bus_id: '8502d3d7-9c27-4a3e-bcd0-b1ecf914e628',
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: '2020-06-27T12:23-33', // invalid date
    fare: 750,
  },
  { // element 5
    bus_id: '8502d3d7-9c27-4a3e-bcd0-b1ecf914e628',
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: '', // empty date
    fare: 750,
  },
  { // element 6
    bus_id: '8502d3d7-9c27-4a3e-bcd0-b1ecf914e628',
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: new Date(Date.now() + 86900),
    fare: 'fr4', // invalid fare
  },
  { // element 7
    bus_id: '8502d3d7-9c27-4a3e-bcd0-b1ecf914e628',
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: new Date(Date.now() + 86900),
    fare: '', // empty fare
  },
  { // element 8
    bus_id: '1232d3d7-9c27-4a3e-bcd0-b1ecf914e123', // bus is already assigned to a trip
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: new Date(Date.now() + 86900),
    fare: 750,
  },
  { // element 9
    bus_id: '1232d3d7-9c27-4a3e-bcd0-b1ecf914e173', // bus is already assigned to a trip
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: new Date(Date.now() + 86900),
    fare: 750,
  },
  { // element 10
    bus_id: '8502d3d7-9c27-4a3e-bcd0-b1ecf914e628',
    origin: 'Ikotun, Lagos',
    destination: 'Ikeja, Lagos',
    trip_date: new Date(Date.now() - 86900), // trip date is in the past 2020-01-27T12:23
    fare: 750,
  }, // 2020-01-27T12:23
];

export default {
  trip,
};
