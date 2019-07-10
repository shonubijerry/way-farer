/**
 *   @fileOverview - errors strings
 *   @exports errorStrings
 * */

const errorStrings = {
  serverError: 'Oops! Looks like something broke',
  badRequest: 'Error! Bad request',
  pageNotFound: 'Oops! Page not found. Looks like you entered an invalid url',
  passwordEmpty: 'password is not allowed to be empty',
  passwordLength: 'password length must be at least 8 characters long',
  emailExists: 'Email address has already been registered',
  validName: 'Name field cannot be empty and must be only letters',
  validEmail: 'email must be a valid email',
  loginFailure: 'Could not login. Email and password do not match',
  validBusId: 'Enter a valid bus id',
  busNotAvailable: 'Bus has been scheduled for another trip',
  busNotFound: 'Bus not found',
  validPlateNumber: 'Enter a valid Nigeria number plate (XXX-XXX-XX)',
  nonEmptyManufacturer: 'manufacturer is not allowed to be empty',
  nonEmptyModel: 'model is not allowed to be empty',
  nonEmptyYear: 'year must be a number',
  validYear: 'year must be larger than or equal to 1970',
  validCapacity: 'capacity must be less than or equal to 400',
  validOrigin: 'origin is not allowed to be empty',
  validDestination: 'destination is not allowed to be empty',
  validTripDate: 'trip_date must be a valid ISO 8601 date',
  validFare: 'fare must be a number',
  tripNotCanceled: 'Trip was not cancelled',
  alreadyCancelled: 'Trip already cancelled',
  cancelledTrip: 'You cannot post booking for cancelled trip',
  pastTrip: 'You cannot post booking for past trip',
  tripNotFound: 'Trip not found',
  validTripId: 'Enter a valid trip id',
  validFilterValue: 'filter_value is not allowed to be empty',
  validBookingId: 'Enter a valid booking id',
  bookingNotFound: 'Booking not found',
  seatsOccupied: 'All seats on this trip are already booked',
  invalidSeatNumber: 'seat_number must be a number',
  availableSeatsAPI: 'Check available seats with GET /bookings/:tripId/availableSeats',

  notAllowed: 'You are forbidden from accessing this section of the app',
  sessionExpired: 'Session expired, login again',
  notAuthenticated: 'You must login to have access to this feature',
};

export default errorStrings;
