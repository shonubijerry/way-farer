import Joi from '@hapi/joi';
import errorStrings from '../helpers/errorStrings';
import Validator from '../helpers/Validator';
import rules from '../helpers/rules';
import responseHelper from '../helpers/responseHelper';


/**
 *    @fileOverview Class to validate user login and signup forms submission
 *    @class ValidateUser
 *    @requires ../helpers/errorStrings
 *    @requires ../helpers/Validator
 *    @requires ../helpers/rules
 *    @requires ../helpers/responseHelper
 *    @exports ValidateUser
 */

class ValidateUser {
  /**
   * validate signup input form data
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */
  static validateSignupFormData(request, response, next) {
    const name = Joi.string().regex(rules.validName).required().error(new Error(errorStrings.validName));
    const password = Joi.string().min(8).required().strict();
    const email = Joi.string().email().lowercase().required();

    const createSignUpSchema = Joi.object().keys({
      first_name: name,
      last_name: name,
      password,
      email,
    });

    const error = Validator.validateJoi(request.body, createSignUpSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 422, error);
  }

  /**
   * validate email and password
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */

  static validateSigninFormData(request, response, next) {
    const password = Joi.string().required();
    const email = Joi.string().email().lowercase().required();

    const createSignUpSchema = Joi.object().keys({
      password,
      email,
    });

    const error = Validator.validateJoi(request.body, createSignUpSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 422, error);
  }
}

export default ValidateUser;
