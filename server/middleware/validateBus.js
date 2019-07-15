import Joi from '@hapi/joi';
import errorStrings from '../helpers/errorStrings';
import rules from '../helpers/rules';
import Validator from '../helpers/Validator';
import responseHelper from '../helpers/responseHelper';


/**
 *    @fileOverview Class to validate bus request
 *    @class ValidateBus
 *    @requires @hapi/joi
 *    @requires ../helpers/errorStrings
 *    @requires ../helpers/responseHelper
 *    @exports ValidateBus
 */

const numberPlate = Joi.string().regex(rules.validPlateNumber).required();

class ValidateBus {
  /**
   * validate create bus form data
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */
  static validateCreateBus(request, response, next) {
    const createBusSchema = Joi.object().keys({
      number_plate: numberPlate.error(new Error(errorStrings.validPlateNumber)),
      manufacturer: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().integer().min(1970).required(),
      capacity: Joi.number().integer().min(1).max(400)
        .required(),
    });

    const error = Validator.validateJoi(request.body, createBusSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 400, error);
  }
}

export default ValidateBus;
