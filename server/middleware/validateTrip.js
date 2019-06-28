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
  static createTripForm(request, response, next) {
    const createTripSchema = Joi.object().keys({
      bus_id: validId.error(new Error(errorStrings.validBusId)),
      origin: Joi.string().required(),
      destination: Joi.string().required(),
      trip_date: Joi.date().iso().required(),
      fare: Joi.number().precision(2).required(),
    });

    const error = Validator.validateJoi(request.body, createTripSchema);
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
  static cancelTripParam(request, response, next) {
    const cancelTripSchema = Joi.object().keys({
      tripId: validId.error(new Error(errorStrings.validtripId)),
    });

    const error = Validator.validateJoi({ tripId: request.params.tripId }, cancelTripSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 422, error);
  }
}

export default ValidateTrip;
