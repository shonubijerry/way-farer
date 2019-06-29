import Joi from '@hapi/joi';
import errorStrings from '../helpers/errorStrings';
import rules from '../helpers/rules';
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

const validId = Joi.string().regex(rules.validUuid).required();

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
      trip_date: Joi.date().iso().greater(new Date().toLocaleString()).required(),
      fare: Joi.number().precision(2).required(),
    });

    const error = Validator.validateJoi(request.body, createTripSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 422, error);
  }

  /**
 * validate get trip query
 * @param {Object} request
 * @param {Object} response
 * @callback {Function} next
 * @return {Object} error
 */
  static validateGetTrip(request, response, next) {
    const { filter_by } = request.query;
    if (!filter_by) {
      return next();
    }
    if (filter_by !== 'origin' && filter_by !== 'destination') {
      return responseHelper.error(response, 404, errorStrings.pageNotFound);
    }
    const data = {
      filter_value: request.body.filter_value,
    };
    const getTripSchema = Joi.object().keys({
      filter_value: Joi.string().required(),
    });

    const error = Validator.validateJoi(data, getTripSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 422, error);
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
    return responseHelper.error(response, 422, error);
  }
}

export default ValidateTrip;
