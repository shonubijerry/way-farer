/* eslint-disable max-len */
import debug from 'debug';
import pool from '../../config/connection.db';

debug('app/seeder')('Seeding database...');

pool.query(`
INSERT INTO users (
  id, email, first_name, last_name, password, is_admin, registered_on
) VALUES
('661b0c4b-1d4a-4e44-8b09-66e3554c045b', 'adenekan2017@gmail.com', 'Adenekan', 'Quadri', '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki', false, 'Fri, Mar 10, 2019 6:49 PM'),
('7f5393a0-a5ad-4194-ab8d-b837b0d9e1c5', 'badmanga@yahoo.com', 'Gbenga', 'Badmus', '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki', false, 'Fri, Mar 10, 2019 6:49 PM'),
('d56e5970-f169-453e-9646-939b15c3900a', 'ciromalapai@hotmail.com', 'Lapai', 'Chiroma', '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki', false, 'Fri, Mar 10, 2019 6:49 PM'), 
('8468bb44-68c7-4bee-8043-c944fe2d3ff3', 'janetpeters@live.com', 'Janet', 'Peters', '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki', false, 'Fri, Mar 10, 2019 6:49 PM'), 
('54ef67cc-f170-41e8-9495-1d7b051e38fd', 'mamoodd@gmail.com', 'Mamood', 'Daura', '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki', false, 'Fri, Mar 10, 2019 6:49 PM');
INSERT INTO bus (
  id, number_plate, manufacturer, model, year, capacity, created_on
) VALUES
('8502d3d7-9c27-4a3e-bcd0-b1ecf914e628', 'XB212AAA', 'TATA', 'X403', '2005', 40, 'Mon, Feb 28, 2019 6:49 PM'),
('4362d3d7-9c27-4a3e-bcd0-b1ecf914e436', 'JB344KJA', 'TOYOTA', 'CRUISER', '2009', 44, 'Mon, Feb 28, 2019 6:49 PM'),
('1232d3d7-9c27-4a3e-bcd0-b1ecf914e123', 'CA555ABJ', 'FORD', 'ACE 3', '2015', 30, 'Mon, Feb 28, 2019 6:49 PM'),
('2222d3d7-9c27-4a3e-bcd0-b1ecf914e222', 'DD746KTU', 'TATA', 'X407', '2010', 44, 'Mon, Feb 28, 2019 6:49 PM'),
('3332d3d7-9c27-4a3e-bcd0-b1ecf914e629', 'AA492IKJ', 'TOYOTA', 'VALOR', '2010', 40, 'Mon, Feb 28, 2019 6:49 PM');
INSERT INTO trip (
  id, bus_id, origin, destination, trip_date, fare, status, created_on
) VALUES
('aaac8272-4b57-423c-906f-3da93e823f49', '1232d3d7-9c27-4a3e-bcd0-b1ecf914e123', 'Ikeja, Lagos', 'CMS, Lagos', 'Sat, Feb 29, 2020 6:49 PM', 500.00, 'active', 'Mon, Feb 28, 2019 6:49 PM'),
('bbbc8272-4b57-423c-906f-3da93e823f49', '1232d3d7-9c27-4a3e-bcd0-b1ecf914e123', 'Alausa, Lagos', 'Maryland, Lagos', 'Sat, Feb 29, 2020 6:49 PM', 300.00, 'cancelled', 'Mon, Feb 28, 2019 6:49 PM'),
('ccc58272-4b57-423c-906f-3da93e823f49', '1232d3d7-9c27-4a3e-bcd0-b1ecf914e123', 'Garki, Abuja', 'Hilton Drive, Abuja', 'Sat, Feb 29, 2020 6:49 PM', 1000.00, 'active', 'Mon, Feb 28, 2019 6:49 PM'),
('dddc8272-4b57-423c-906f-3da93e823f49', '1232d3d7-9c27-4a3e-bcd0-b1ecf914e123', 'Ikoyi, Lagos', 'Victoria Island, Lagos', 'Sun, Jun 30, 2019 1:49 AM', 600.00, 'active', 'Mon, Feb 28, 2019 6:49 PM');
INSERT INTO booking (
  id, trip_id, user_id, seat_number, created_on
) VALUES
('abcc8272-4b57-423c-906f-3da93e823f66', 'bbbc8272-4b57-423c-906f-3da93e823f49', 'd56e5970-f169-453e-9646-939b15c3900a', 6, 'Mon, Feb 28, 2019 6:49 PM'),
('22cc8272-4b57-423c-906f-3da93e823f66', 'bbbc8272-4b57-423c-906f-3da93e823f49', '8468bb44-68c7-4bee-8043-c944fe2d3ff3', 8, 'Fri, Mar 10, 2019 6:49 PM'),
('33cc8272-4b57-423c-906f-3da93e823f66', 'dddc8272-4b57-423c-906f-3da93e823f49', '54ef67cc-f170-41e8-9495-1d7b051e38fd', 13, 'Sat, Jun 29, 2019 6:49 PM'),
('44cc8272-4b57-423c-906f-3da93e823f66', 'dddc8272-4b57-423c-906f-3da93e823f49', '661b0c4b-1d4a-4e44-8b09-66e3554c045b', 7, 'Sat, Jun 29, 2019 6:49 PM'),
('55cc8272-4b57-423c-906f-3da93e823f66', 'dddc8272-4b57-423c-906f-3da93e823f49', '8468bb44-68c7-4bee-8043-c944fe2d3ff3', 28, 'Tue, Apr 01, 2019 6:49 PM'),
('66cc8272-4b57-423c-906f-3da93e823f66', 'ccc58272-4b57-423c-906f-3da93e823f49', '7f5393a0-a5ad-4194-ab8d-b837b0d9e1c5', 22, 'Sat, Jun 29, 2019 6:49 PM'),
('77cc8272-4b57-423c-906f-3da93e823f66', 'ccc58272-4b57-423c-906f-3da93e823f49', 'd56e5970-f169-453e-9646-939b15c3900a', 1, 'Sat, Jun 29, 2019 6:49 PM');
`).then(() => {
  pool.end();
});
