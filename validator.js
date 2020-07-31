const errorMessages = require('./errorStates.json'); 

/**
 * Facilitates validation for request and response data.
 * If an error occurs at any point, it is placed inside the `error` property.
 * @constructor
 */
class Validator {

/**
 * Validates an array of urls. 
 * @constructor
 * @param {Array} urls - An array of string urls
 */
  validateURLS(urls){
    if (!Array.isArray(urls)) {
      return this.formatError(100);
    } else if (urls.find(url => url && typeof url !== 'string')) {
      return this.formatError(101);
    }
  }

  /**
   * Validates a promise's response. 
   * If successful, return the promise data. 
   * If unsuccessful, return an error message. 
   * @constructor
   * @param {Promise} promise - A promise that is attempted 
   */
  validatePromise(promise){
    return promise
      .then(data => data.map(dataItem => dataItem.data))
      .catch(data => this.formatError(102, {
        request: data.config,
        response: data.response && {
          status: data.response.status,
          text: data.response.statusText,
          headers: data.response.headers,
        },
      }));
  }

  /**
   * Receives an error code and generates an approrpiate error object 
   * @constructor
   * @param {Number} errorCode - An error code that matches from the available error states 
   * @param {Object} errorAdditionalInfo - Additional info that is appended to the error message
   */
  formatError(errorCode, errorAdditionalInfo=null) {
    this.error = {
      errorCode,
      errorMessage: errorCode && errorMessages[errorCode],
      errorAdditionalInfo: errorAdditionalInfo,
    };
    return this.error;
  }

}

module.exports = Validator;