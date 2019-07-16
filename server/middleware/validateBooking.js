import Joi from '@hapi/joi';
import errorStrings from '../helpers/errorStrings';
import Validator from '../helpers/Validator';
import responseHelper from '../helpers/responseHelper';
import rules from '../helpers/rules';
import BookingController from '../controllers/bookingController';
import TripModel from '../model/tripModel';

const tripModel = new TripModel('trip');


/**
 *    @fileOverview Class to validate trip request body
 *    @class ValidateTrip
 *    @requires @hapi/joi
 *    @requires ../helpers/errorStrings
 *    @requires ../helpers/responseHelper
 *    @exports ValidateTrip
 */

const validId = Joi.number().min(1).required();

class ValidateBooking {
  /**
   * validate create booking form data
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */
  static async validateCreateBooking(request, response, next) {
    const createBookingSchema = Joi.object().keys({
      trip_id: validId.error(new Error(errorStrings.validTripId)),
      seat_number: Joi.number().min(1),
    });
    const { trip_id, seat_number } = request.body;
    if (!rules.validNumber.test(seat_number)) {
      const tripInfo = await tripModel.getTripInformationQuery(trip_id);
      if (!tripInfo) {
        return responseHelper.error(response, 404, errorStrings.tripNotFound);
      }
      const available_seats = await BookingController.checkSeatAvailablity(trip_id, tripInfo.capacity);
      [request.body.seat_number] = available_seats;
    }
    const error = Validator.validateJoi(request.body, createBookingSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 400, error);
  }

  /**
   * validate delete booking endpoint params
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */
  static validateDeleteBooking(request, response, next) {
    const deleteBookingSchema = Joi.object().keys({
      bookingId: validId.error(new Error(errorStrings.validBookingId)),
    });

    const error = Validator.validateJoi(request.params, deleteBookingSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 400, error);
  }

  /**
 * validate available seat numbers parameters
 * @param {Object} request
 * @param {Object} response
 * @callback {Function} next
 * @return {Object} error
 */
  static validateAvailableSeats(request, response, next) {
    const availableSeatsSchema = Joi.object().keys({
      tripId: validId.error(new Error(errorStrings.validTripId)),
    });

    const error = Validator.validateJoi({ tripId: request.params.tripId }, availableSeatsSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 400, error);
  }
}

export default ValidateBooking;
