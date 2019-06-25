import ResponseHelper from "../helpers/responseHelper";
import errorStrings from "../helpers/errorStrings";

/**
 * @fileOverview This file manages all routes in the application
 * @requires ../helpers/responseHelper
 * @requires ../helpers/errorStrings
 * @param {object} app
 * @exports routes.js
 */

const routes = (app) => {
  const api = '/api/v1';
  
  app.get('/', (req, res) => ResponseHelper.success(res, 200, { message: "Welcome to Way Farer" })); 
  // invalid url
  app.all('*', (req, res) => ResponseHelper.error(res, 404, errorStrings.pageNotFound));
};

export default routes;
