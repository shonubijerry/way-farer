import Joi from '@hapi/joi';
/**
 *    @fileOverview Class to hold general validation methods
 *    @class Validator
 *    @exports Validator
 */

class Validator {
  /**
   * validate data by checking it with a predefined Joi schema
   * @param {Object} data
   * @param {Object} schema
   * @param {Object} response
   * @param {Object} next
   * @callback {Function} next
   * @return {Object} error
   */
  static validateJoi(data, schema) {
    let error = '';
    const validationOptions = {
      allowUnknown: true, // allow unknown keys that will be ignored
      stripUnknown: true, // remove unknown keys from the validated data
    };
    Joi.validate(data, schema, validationOptions, (err) => {
      if (err) {
        error = err.details ? err.details[0].message.replace(/['"]/g, '') : err.message;
      }
    });
    return error;
  }
}
export default Validator;
