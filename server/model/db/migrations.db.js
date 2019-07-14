import pool from '../../config/connection.db';

pool.query(`DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    password VARCHAR NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    registered_on TIMESTAMP NOT NULL DEFAULT NOW()
  );
  INSERT INTO users (
    email, first_name, last_name, password, is_admin
  ) VALUES
  ('shonubijerry@gmail.com', 'Sho', 'Korey', '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki', true);
  DROP TABLE IF EXISTS bus CASCADE;
  CREATE TABLE bus(
    id SERIAL PRIMARY KEY NOT NULL,
    number_plate VARCHAR(15) UNIQUE NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year VARCHAR(6) NOT NULL,
    capacity SMALLINT NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW()
  );
  DROP TABLE IF EXISTS trip CASCADE;
  DROP TYPE IF EXISTS status_enum CASCADE;
  CREATE TYPE status_enum AS ENUM ('active','cancelled');
  CREATE TABLE trip(
    id SERIAL PRIMARY KEY NOT NULL,
    bus_id SERIAL NOT NULL REFERENCES bus (id),
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    trip_date TIMESTAMP NOT NULL,
    fare NUMERIC(10, 2) NOT NULL,
    status status_enum DEFAULT 'active',
    created_on TIMESTAMP NOT NULL DEFAULT NOW()
  );
  DROP TABLE IF EXISTS booking CASCADE;
  CREATE TABLE booking(
    id SERIAL PRIMARY KEY NOT NULL,
    trip_id SERIAL NOT NULL  REFERENCES trip (id),
    user_id SERIAL NOT NULL  REFERENCES users (id),
    seat_number SMALLINT NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW()
  );
`).then(() => {
  pool.end();
});
