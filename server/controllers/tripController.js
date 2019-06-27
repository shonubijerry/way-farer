import TripModel from '../model/tripModel';
import errorStrings from '../helpers/errorStrings';
import ResponseHelper from '../helpers/responseHelper';


const tripModel = new TripModel('trip');
const busModel = new TripModel('bus');

/**
* @fileOverview - class manages all trip logic
* @class - tripController
* @requires - ../model/tripsModel
* @requires - ../helpers/errorStrings
* @requires - ../helpers/responseHelper
* @exports - usersController.js
* */

class UsersController {
  /**
 * Create a trip
 * @param {object} req
 * @param {object} res
 */

  static async createTrip(req, res) {
    try {
      const busExists = await busModel.checkBusExists(req.body.bus_id);
      if (!busExists) {
        return ResponseHelper.error(res, 404, errorStrings.busNotFound);
      }
      const busScheduled = await tripModel.checkBusAvailability(req.body.bus_id);
      if (busScheduled) {
        return ResponseHelper.error(res, 409, errorStrings.busNotAvailable);
      }
      const newTrip = await tripModel.createTripQuery(req.body);
      if (!newTrip) {
        throw new Error(errorStrings.serverError);
      }
      return ResponseHelper.success(res, 201, newTrip);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
   * Get all trips (for users and admin)
   * @param {object} req
   * @param {object} res
   * @returns {object} an array of objects containing all trips
   */

  static async getTrips(req, res) {
    try {
      const trips = await tripModel.getTrips();
      return ResponseHelper.success(res, 200, trips);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }
}

export default UsersController;
