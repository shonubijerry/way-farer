import pool from '../../config/connection.db';

pool.query(`DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    id UUID NOT NULL UNIQUE PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    password VARCHAR NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false
  );
  DROP TABLE IF EXISTS bus CASCADE;
  CREATE TABLE bus(
    id UUID NOT NULL UNIQUE PRIMARY KEY,
    number_plate VARCHAR(15) UNIQUE NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year VARCHAR(6) NOT NULL,
    capacity SMALLINT NOT NULL
  );
  DROP TABLE IF EXISTS trip CASCADE;
  CREATE TABLE trip(
    id UUID NOT NULL UNIQUE PRIMARY KEY,
    bus_id UUID NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    trip_date VARCHAR(100) NOT NULL,
    fare NUMERIC(10, 2) NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'active'
  );
  DROP TABLE IF EXISTS booking CASCADE;
  CREATE TABLE booking(
    id UUID NOT NULL UNIQUE PRIMARY KEY,
    trip_id UUID NOT NULL,
    user_id UUID NOT NULL,
    seat_number SMALLINT NOT NULL,
    created_on DATE NOT NULL DEFAULT CURRENT_DATE
  );
`).then(() => {
  pool.end();
});
