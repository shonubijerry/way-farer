/**
 *    @fileOverview Class to hold general validation methods
 *    @class Validator
 *    @exports Validator
 */

class Validator {
  /**
   * check if data validation produces any errors
   * @param {Object} request
   * @return {boolean} false
   */
  static findErrors(errors) {
    const error = [];
    errors.map((item) => {
      if (item !== '') {
        error.push(item);
      }
      return error;
    });
    return error;
  }


  /**
   * collect all possible errors
   * @param {string} input form input
   * @param {string} emptyRule RegExp pattern to match empty input
   * @param {string} validRule RegExp pattern to match valid input
   * @param {String} errorString error message to return
   * @param {Object} errors
   */

  static validate(input, emptyRule, validRule, errorString) {
    let error = '';
    if (!input || !emptyRule.test(input) || !validRule.test(input)) {
      error = errorString;
    }
    return error;
  }
}
export default Validator;
