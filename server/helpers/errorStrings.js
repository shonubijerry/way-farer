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
  validOrigin: 'origin is not allowed to be empty',
  validDestination: 'destination is not allowed to be empty',
  validTripDate: 'trip_date must be a valid ISO 8601 date',
  validFare: 'fare must be a number',
  tripNotCanceled: 'Trip was not cancelled',
  alreadyCancelled: 'Trip already cancelled',
  noTrip: 'Trip not found',
  validtripId: 'Enter a valid trip id',

  notAllowed: 'You are forbidden from accessing this section of the app',
  sessionExpired: 'Session expired, login again',
  notAuthenticated: 'You must login to have access to this feature',
};

export default errorStrings;
