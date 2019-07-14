import TripModel from '../model/tripModel';
import BusModel from '../model/busModel';
import errorStrings from '../helpers/errorStrings';
import ResponseHelper from '../helpers/responseHelper';

const tripModel = new TripModel('trip');
const busModel = new BusModel('bus');

/**
* @fileOverview - class manages all trip logic
* @class - TripController
* @requires - ../model/tripsModel
* @requires - ../model/busModel
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
      const busExists = await busModel.checkBusExists('id', req.body.bus_id);
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
      let trips = [];
      const { origin, destination } = req.query;
      if (origin && destination) {
        trips = await tripModel.getTripsByTwoColumns(['origin', 'destination'], [origin, destination]);
        return ResponseHelper.success(res, 200, trips);
      }
      if (origin) {
        trips = await tripModel.getTripsBySingleColumn('origin', origin);
        return ResponseHelper.success(res, 200, trips);
      }
      if (destination) {
        trips = await tripModel.getTripsBySingleColumn('destination', destination);
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
          return ResponseHelper.error(res, 404, errorStrings.tripNotFound);
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
