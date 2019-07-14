import Joi from '@hapi/joi';
import errorStrings from '../helpers/errorStrings';
import Validator from '../helpers/Validator';
import responseHelper from '../helpers/responseHelper';


/**
 *    @fileOverview Class to validate trip request body
 *    @class ValidateTrip
 *    @requires @hapi/joi
 *    @requires ../helpers/errorStrings
 *    @requires ../helpers/responseHelper
 *    @exports ValidateTrip
 */

const validId = Joi.number().required();

class ValidateTrip {
  /**
   * validate create trip form data
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */
  static validateCreateTrip(request, response, next) {
    const createTripSchema = Joi.object().keys({
      bus_id: validId.error(new Error(errorStrings.validBusId)),
      origin: Joi.string().required(),
      destination: Joi.string().required(),
      trip_date: Joi.date().iso().greater(new Date()).required(),
      fare: Joi.number().required(),
    });
    const error = Validator.validateJoi(request.body, createTripSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 400, error);
  }

  /**
 * validate get trip query
 * @param {Object} request
 * @param {Object} response
 * @callback {Function} next
 * @return {Object} error
 */
  static validateGetTrip(request, response, next) {
    const { origin, destination } = request.query;
    if (!origin && !destination) {
      return next();
    }
    const data = {
      origin,
      destination,
    };
    const getTripSchema = Joi.object().keys({
      origin: Joi.string().min(3),
      destination: Joi.string().min(3),
    });

    const error = Validator.validateJoi(data, getTripSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 400, error);
  }

  /**
 * validate cancel trip parameters
 * @param {Object} request
 * @param {Object} response
 * @callback {Function} next
 * @return {Object} error
 */
  static validateCancelTrip(request, response, next) {
    const cancelTripSchema = Joi.object().keys({
      tripId: validId.error(new Error(errorStrings.validTripId)),
    });

    const error = Validator.validateJoi({ tripId: request.params.tripId }, cancelTripSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 400, error);
  }
}

export default ValidateTrip;
