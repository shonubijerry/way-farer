# way-farer

[![Build Status](https://travis-ci.com/shonubijerry/way-farer.svg?branch=develop)](https://travis-ci.com/shonubijerry/way-farer)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7868b6f9a95ab5b862bd/test_coverage)](https://codeclimate.com/github/shonubijerry/way-farer/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/7868b6f9a95ab5b862bd/maintainability)](https://codeclimate.com/github/shonubijerry/way-farer/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/shonubijerry/way-farer/badge.svg?branch=develop)](https://coveralls.io/github/shonubijerry/way-farer?branch=develop)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


WayFarer is a public bus transportation booking server.

## Pivotal Tracker Project
https://www.pivotaltracker.com/n/projects/2358463

## Server side hosted on Heroku
https://way-farer-shonubi.herokuapp.com

## API documentation 
https://way-farer-shonubi.herokuapp.com/docs

## Table of Content
 * [Getting Started](#getting-started)

 * [Prerequisites for installation](#Prerequisites)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [ API End Points Test Using Postman](#api-end-points)

 * [Coding Style](#coding-style)
 
 * [Features](#features)
 
 * [Built With](#built-with)
 
 * [Author](#author)

 * [License](#lincense)

 * [Acknowledgement](#acknowledgement)

## Getting Started

### Prerequisites for installation
1. Node js
2. Express
3. Git

### Installation
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/shonubijerry/way-farer
```
2. Install dependencies 
```
e.g npm install.
```
3. Start the application by running the start script.
```
e.g npm start
```
4. Install postman to test all endpoints on port 3000.

### Run Test

```
e.g npm test
```

## API End Points Test Using Postman

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/v1/auth/signup</td>  <td>User signup</td></tr>

<tr><td>POST</td> <td>/api/v1/auth/signin</td>  <td>User signin</td></tr>

<tr><td>POST</td> <td>/api/v1/trips</td>  <td>Create a trip</td></tr>

<tr><td>POST</td> <td>/api/v1/bookings</td>  <td>Book a seat on a trip</td></tr>

<tr><td>POST</td> <td>/api/v1/buses</td>  <td>Create a bus</td></tr>

<tr><td>GET</td> <td>/api/v1/trips</td>  <td>View all trips</td></tr>

<tr><td>GET</td> <td>/api/v1/trips?origin=VALUE</td>  <td>Filter trips by origin</td></tr>

<tr><td>GET</td> <td>/api/v1/trips?destination=VALUE</td>  <td>Filter trips by destination</td></tr>

<tr><td>GET</td> <td>/api/v1/trips?origin=VALUE&destination=VALUE</td>  <td>Filter trips by origin and destination</td></tr>

<tr><td>GET</td> <td>/api/v1/bookings</td>  <td>View all bookings</td></tr>

<tr><td>GET</td> <td>/api/v1/buses</td>  <td>View all buses</td></tr>

<tr><td>PATCH</td> <td>/api/v1/trips/:tripId</td>  <td>Cancel a trip</td></tr>

<tr><td>DELETE</td> <td>/api/v1/bookings/:bookingId</td>  <td>Delete a booking</td></tr>

</table>


## Coding Style
* Airbnb style guide. 

## Features

### Users
* Users can sign up
* Users can login
* Users can book a seat on a trip.
* Users can delete their booking.
* Users can view buses.
* Users can view trips.
* Users can view a list of filtered trips based on origin.
* Users can view a list of filtered trips based on destination.
* Users can view a list of filtered trips based on origin and destination.
* Users can specify their seat numbers when making a booking.
* Users can view available seats

### Admin
* Admin can create a trip.
* Admin can cancel a trip.
* Admin can create a bus.
* Both Admin and Users can see all trips.
* View all bookings. An Admin can see all bookings, while user can see all of his/her bookings.
 

## Built With
* NodeJs-EXPRESS: Node.js is a javascript runtime built on Chrome's V8 javascript engine.


## Author
* Shonubi Oluwakorede

## License
This project is licensed under The MIT License (MIT) - see the LICENSE.md file for details.

## Acknowledgement
* Andela

