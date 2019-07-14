/* eslint-disable max-len */
import debug from 'debug';
import pool from '../../config/connection.db';

debug('app/seeder')('Seeding database...');

pool.query(`
INSERT INTO users (
  email, first_name, last_name, password
) VALUES
('adenekan2017@gmail.com', 'Adenekan', 'Quadri', '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki'),
('badmanga@yahoo.com', 'Gbenga', 'Badmus', '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki'),
('ciromalapai@hotmail.com', 'Lapai', 'Chiroma', '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki'), 
('janetpeters@live.com', 'Janet', 'Peters', '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki'), 
('mamoodd@gmail.com', 'Mamood', 'Daura', '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki');
INSERT INTO bus (
  number_plate, manufacturer, model, year, capacity
) VALUES
('XB212AAA', 'TATA', 'X403', '2005', 40),
('JB344KJA', 'TOYOTA', 'CRUISER', '2009', 44),
('CA555ABJ', 'FORD', 'ACE 3', '2015', 30),
('DD746KTU', 'TATA', 'X407', '2010', 44),
('AA492IKJ', 'TOYOTA', 'VALOR', '2010', 40);
INSERT INTO trip (
  bus_id, origin, destination, trip_date, fare, status
) VALUES
('3', 'Ikeja, Lagos', 'CMS, Lagos', '2020-07-30 04:00:40.000', 500.00, 'active'),
('3', 'Alausa, Lagos', 'Maryland, Lagos', '2020-07-30 04:00:40.000', 300.00, 'cancelled'),
('3', 'Garki, Abuja', 'Hilton Drive, Abuja', '2020-07-30 04:00:40.000', 1000.00, 'active'),
('3', 'Ikoyi, Lagos', 'Victoria Island, Lagos', '2018-07-30 04:00:40.000', 600.00, 'active');
INSERT INTO booking (
  trip_id, user_id, seat_number
) VALUES
('2', '4', 6),
('2', '5', 8),
('4', '6', 13),
('4', '2', 7),
('4', '5', 28),
('3', '3', 22),
('3', '4', 1);
`).then(() => {
  pool.end();
});
