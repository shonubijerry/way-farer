import ResponseHelper from '../helpers/responseHelper';
import errorStrings from '../helpers/errorStrings';
import ValidateUser from '../middleware/ValidateUser';
import ValidateBus from '../middleware/validateBus';
import ValidateTrip from '../middleware/validateTrip';
import ValidateBooking from '../middleware/validateBooking';
import Auth from '../middleware/Auth';
import UsersController from '../controllers/usersController';
import BusController from '../controllers/busController';
import TripController from '../controllers/tripController';
import BookingController from '../controllers/bookingController';

/**
 * @fileOverview This file manages all routes in the application
 * @requires ../helpers/responseHelper
 * @requires ../helpers/errorStrings
 * @requires ../middleware/ValidateUser
 * @requires ../middleware/validateBooking
 * @requires ../middleware/Auth
 * @requires ../controllers/usersController
 * @requires ../controllers/bookingController
 * @param {object} app
 * @exports routes.js
 */

const routes = (app) => {
  const api = '/api/v1';
  app.post(`${api}/auth/signup`, ValidateUser.validateSignupFormData, UsersController.signup);
  app.post(`${api}/auth/signin`, ValidateUser.validateSigninFormData, UsersController.signin);
  app.post(`${api}/buses`, Auth.authenticateAdmin, ValidateBus.validateCreateBus, BusController.createBus);
  app.post(`${api}/trips`, Auth.authenticateAdmin, ValidateTrip.validateCreateTrip, TripController.createTrip);
  app.post(`${api}/bookings`, Auth.authenticateUser, ValidateBooking.validateCreateBooking, BookingController.createBooking);
  app.get(`${api}/buses`, Auth.authenticateUser, BusController.getBuses);
  app.get(`${api}/bookings`, Auth.authenticateUser, BookingController.getBookings);
  app.get(`${api}/bookings/:tripId/availableSeats`, Auth.authenticateUser, ValidateBooking.validateAvailableSeats, BookingController.getAvailableSeats);
  app.get(`${api}/trips`, Auth.authenticateUser, ValidateTrip.validateGetTrip, TripController.getTrips);
  app.patch(`${api}/trips/:tripId`, Auth.authenticateAdmin, ValidateTrip.validateCancelTrip, TripController.cancelTrip);
  app.delete(`${api}/bookings/:bookingId`, Auth.authenticateUser, ValidateBooking.validateDeleteBooking, BookingController.deleteBooking);
  app.get('/', (req, res) => ResponseHelper.success(res, 200, {
    message: 'Welcome to Way Farer',
    api_documentation: 'https://way-farer-shonubi.herokuapp.com/docs',
  }));
  // invalid url
  app.all('*', (req, res) => ResponseHelper.error(res, 404, errorStrings.pageNotFound));
};

export default routes;
