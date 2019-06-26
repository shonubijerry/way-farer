import ResponseHelper from '../helpers/responseHelper';
import errorStrings from '../helpers/errorStrings';
import ValidateUser from '../middleware/ValidateUser';
import UsersController from '../controllers/usersController';

/**
 * @fileOverview This file manages all routes in the application
 * @requires ../helpers/responseHelper
 * @requires ../helpers/errorStrings
 * @requires ../middleware/ValidateUser
 * @param {object} app
 * @exports routes.js
 */

const routes = (app) => {
  const api = '/api/v1';
  app.post(`${api}/auth/signup`, ValidateUser.validateSignupFormData, UsersController.signup);
  app.get('/', (req, res) => ResponseHelper.success(res, 200, { message: 'Welcome to Way Farer' }));
  // invalid url
  app.all('*', (req, res) => ResponseHelper.error(res, 404, errorStrings.pageNotFound));
};

export default routes;
