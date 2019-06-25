/**
 *    @fileOverview Class to hold response messages
 *    @class ResponseHelper
 *    @exports ResponseHelper
 */

class ResponseHelper {
  /**
     * success: prepare json response for API endpoint
     * @param {object} res response object
     * @param {Number} status success status code of response
     * @param {object} data Object data corresponding with success status code
     * @returns {object} json response object
    * */

  static success(res, status, message) {
    return res.status(status).json({
      status,
      data: message,
    });
  }

  /**
     * error: prepare json response for API endpoint
     * @param {object} res response object
     * @param {Number} status error status code of response
     * @param {object} error error message corresponding with status code
     * @returns {object} json response object
    * */

  static error(res, status, error) {
    return res.status(status).json({
      status,
      error,
    });
  }
}


export default ResponseHelper;
