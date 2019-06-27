import ResponseHelper from '../helpers/responseHelper';
import errorStrings from '../helpers/errorStrings';
import ValidateUser from '../middleware/ValidateUser';
import ValidateTrip from '../middleware/validateTrip';
import Auth from '../middleware/Auth';
import UsersController from '../controllers/usersController';
import TripController from '../controllers/tripController';

/**
 * @fileOverview This file manages all routes in the application
 * @requires ../helpers/responseHelper
 * @requires ../helpers/errorStrings
 * @requires ../middleware/ValidateUser
 * @requires ../middleware/Auth
 * @requires ../controllers/usersController
 * @param {object} app
 * @exports routes.js
 */

const routes = (app) => {
  const api = '/api/v1';
  app.post(`${api}/auth/signup`, ValidateUser.validateSignupFormData, UsersController.signup);
  app.post(`${api}/auth/signin`, ValidateUser.validateSigninFormData, UsersController.signin);
  app.post(`${api}/trips`, Auth.authenticateAdmin, ValidateTrip.createTripForm, TripController.createTrip);
  app.get('/', (req, res) => ResponseHelper.success(res, 200, { message: 'Welcome to Way Farer' }));
  // invalid url
  app.all('*', (req, res) => ResponseHelper.error(res, 404, errorStrings.pageNotFound));
};

export default routes;
