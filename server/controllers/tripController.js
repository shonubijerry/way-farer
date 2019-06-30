import moment from 'moment';
import TripModel from '../model/tripModel';
import errorStrings from '../helpers/errorStrings';
import ResponseHelper from '../helpers/responseHelper';

const tripModel = new TripModel('trip');
const busModel = new TripModel('bus');

/**
* @fileOverview - class manages all trip logic
* @class - TripController
* @requires - ../model/tripsModel
* @requires - ../helpers/errorStrings
* @requires - ../helpers/responseHelper
* @exports - TripController
* */

class TripController {
  /**
 * Create a trip (for admin only)
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
      const created_on = moment().format('llll');
      const trip_date = moment(req.body.trip_date).format('llll');
      const newTrip = await tripModel.createTripQuery(req.body, trip_date, created_on);
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
      let trips = [];
      const { filter_by } = req.query;
      if (filter_by) {
        trips = await tripModel.getFilteredTrips(filter_by, req.body.filter_value);
        return ResponseHelper.success(res, 200, trips);
      }
      trips = await tripModel.getTrips();
      return ResponseHelper.success(res, 200, trips);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
   * Cancel a particular trip (admin only)
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */

  static async cancelTrip(req, res) {
    try {
      const cancelledTrip = await tripModel.cancelTrip(req.params.tripId);
      switch (cancelledTrip) {
        case 'no-trip': {
          return ResponseHelper.error(res, 404, errorStrings.noTrip);
        }
        case 'already-cancelled': {
          return ResponseHelper.error(res, 202, errorStrings.alreadyCancelled);
        }
        default: {
          cancelledTrip.message = 'Trip cancelled successfully';
          return ResponseHelper.success(res, 200, cancelledTrip);
        }
      }
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }
}

export default TripController;
