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
    const nameErrors = ValidateUser.checkNameErrors(request.body);
    const emailAndPasswordErrors = ValidateUser.checkEmailAndPasswordErrors(request.body);

    const signupErrors = nameErrors.concat(emailAndPasswordErrors);

    const error = Validator.findErrors(signupErrors);

    if (error.length > 0) {
      return responseHelper.error(response, 400, error);
    }
    return next();
  }

  /**
   * collect all possible errors from firstname, lastname and password inputs
   * @param {Object} request
   * @return {String} errors
   */

  static checkNameErrors({
    first_name, last_name, password,
  }) {
    const errors = [];

    const firstNameError = Validator.validate(
      first_name, rules.empty, rules.validName, errorStrings.validFirstName,
    );
    errors.push(firstNameError);

    const lastnameError = Validator.validate(
      last_name, rules.empty, rules.validName, errorStrings.validLastName,
    );
    errors.push(lastnameError);

    if (!rules.passwordLength.test(password)) {
      const passwordError = errorStrings.passwordLength;
      errors.push(passwordError);
    }

    return errors;
  }

  /**
   * collect all possible errors from email and password inputs
   * @param {Object} request
   * @return {String} errors
   */

  static checkEmailAndPasswordErrors({ email, password }) {
    const errors = [];

    const emailError = Validator.validate(
      email, rules.empty, rules.validEmail, errorStrings.validEmail,
    );
    errors.push(emailError);

    if (!password || !rules.empty.test(password)) {
      const passwordEmptyError = errorStrings.passwordEmpty;
      errors.push(passwordEmptyError);
    }
    return errors;
  }
}

export default ValidateUser;
