
/**
 * @fileOverview - This module holds dummy data to seed to database
 * @exports - users object
 */
const user = [
  {
    id: '661b0c4b-1d4a-4e44-8b09-66e3554c045b',
    email: 'adenekan2017@gmail.com',
    firstName: 'Adenekan',
    lastName: 'Quadri',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    isAdmin: false,
  },
  {
    id: '7f5393a0-a5ad-4194-ab8d-b837b0d9e1c5',
    email: 'badmanga@yahoo.com',
    firstName: 'Gbenga',
    lastName: 'Badmus',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    isAdmin: false,
  },
  {
    id: 'd56e5970-f169-453e-9646-939b15c3900a',
    email: 'ciromalapai@hotmail.com',
    firstName: 'Lapai',
    lastName: 'Chiroma',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    isAdmin: false,
  },
  {
    id: '8468bb44-68c7-4bee-8043-c944fe2d3ff3',
    email: 'janetpeters@live.com',
    firstName: 'Janet',
    lastName: 'Peters',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    isAdmin: false,
  },
  {
    id: '54ef67cc-f170-41e8-9495-1d7b051e38fd',
    email: 'mamoodd@gmail.com',
    firstName: 'Mamood',
    lastName: 'Daura',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    isAdmin: false,
  },

];


const bus = [
  {
    id: '8502d3d7-9c27-4a3e-bcd0-b1ecf914e628',
    number_plate: 'XB212AAA',
    manufacturer: 'TATA',
    model: 'X403',
    year: '2005',
    capacity: 40,
  },
  {
    id: '4362d3d7-9c27-4a3e-bcd0-b1ecf914e436',
    number_plate: 'JB344KJA',
    manufacturer: 'TOYOTA',
    model: 'CRUISER',
    year: '2009',
    capacity: 44,
  },
  {
    id: '1232d3d7-9c27-4a3e-bcd0-b1ecf914e123',
    number_plate: 'CA555ABJ',
    manufacturer: 'FORD',
    model: 'ACE 3',
    year: '2015',
    capacity: 30,
  },
  {
    id: '2222d3d7-9c27-4a3e-bcd0-b1ecf914e222',
    number_plate: 'DD746KTU',
    manufacturer: 'TATA',
    model: 'X407',
    year: '2010',
    capacity: 44,
  },
  {
    id: '3332d3d7-9c27-4a3e-bcd0-b1ecf914e629',
    number_plate: 'AA492IKJ',
    manufacturer: 'TOYOTA',
    model: 'VALOR',
    year: '2010',
    capacity: 40,
  },
];


const trip = [
  {
    id: 'aaac8272-4b57-423c-906f-3da93e823f49',
    bus_id: bus[0].id,
    origin: 'Ikeja, Lagos',
    destination: 'CMS, Lagos',
    trip_date: '2019-04-02',
    fare: 500.00,
    status: 'active',
  },
  {
    id: 'bbbc8272-4b57-423c-906f-3da93e823f49',
    bus_id: bus[2].id,
    origin: 'Alausa, Lagos',
    destination: 'Maryland, Lagos',
    trip_date: '2019-06-26',
    fare: 300.00,
    status: 'cancelled',
  },
  {
    id: 'ccc58272-4b57-423c-906f-3da93e823f49',
    bus_id: bus[3].id,
    origin: 'Garki, Abuja',
    destination: 'Hilton Drive, Abuja',
    trip_date: '2019-05-30',
    fare: 1000.00,
    status: 'active',
  },
  {
    id: 'dddc8272-4b57-423c-906f-3da93e823f49',
    bus_id: bus[2].id,
    origin: 'Ikoyi, Lagos',
    destination: 'Victoria Island, Lagos',
    trip_date: '2019-01-20',
    fare: 600.00,
    status: 'active',
  },
];


const booking = [
  {
    id: 'abcc8272-4b57-423c-906f-3da93e823f66',
    trip_id: trip[1].id,
    user_id: user[2].id,
  },
  {
    id: '22cc8272-4b57-423c-906f-3da93e823f66',
    trip_id: trip[1].id,
    user_id: user[3].id,
  },
  {
    id: '33cc8272-4b57-423c-906f-3da93e823f66',
    trip_id: trip[3].id,
    user_id: user[4].id,
  },
  {
    id: '44cc8272-4b57-423c-906f-3da93e823f66',
    trip_id: trip[3].id,
    user_id: user[0].id,
  },
  {
    id: '55cc8272-4b57-423c-906f-3da93e823f66',
    trip_id: trip[3].id,
    user_id: user[3].id,
  },
  {
    id: '66cc8272-4b57-423c-906f-3da93e823f66',
    trip_id: trip[2].id,
    user_id: user[1].id,
  },
  {
    id: '77cc8272-4b57-423c-906f-3da93e823f66',
    trip_id: trip[2].id,
    user_id: user[2].id,
  },
];

export default {
  user, bus, trip, booking,
};
