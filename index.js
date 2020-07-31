const axios = require('axios');
const Validator = require('./validator');
const validator = new Validator();

/**
 * Fetch an array of URLs which contain JSON data, and return their contents in a promise
 * @param {Array} urls - An array of string urls
 */
const requestMultipleUrls = (urls) => {
  return new Promise(async (resolve, reject) => {
    validator.validateURLS(urls);
    if (validator.error) {
      return reject({error: validator.error});
    }
  
    const promiseArray = Promise.all(urls.map(url => axios.get(url)));
    const validatePromise = await validator.validatePromise(promiseArray);
    if (validator.error) {
      return reject({error: validator.error});
    }

    resolve({result: validatePromise});
  });
}

module.exports = requestMultipleUrls;