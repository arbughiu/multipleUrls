const errorMessages = require('./../errorStates.json'); 
const Validator = require('./../validator');

const URLS = ['URL.local', 'https://www.some.url.com'];

describe('validateURLS', () => {
  const validator = new Validator();

  test('returns no error if urls pass validation', () => {
    validator.validateURLS(URLS);
    expect(validator.error).toBe(undefined);
  });
  test('detects invalid argument (not an Array)', () => {
    [-1, 0, 1, true, false, Object, [], 'foo'].forEach(obj => {
      validator.validateURLS(obj);
      expect(validator.error.errorCode).toBe(100);
    });
  });
  test('detects an invalid item in the argument array', () => {
    [-1, 0, 1, true, false, Object, [], ''].forEach(obj => {
      validator.validateURLS([...URLS, obj]);
      expect(validator.error.errorCode).toBe(101);
    });
  });
});

describe('validatePromise', () => {
  const validator = new Validator();

  test('returns data from a valid promise', async () => {
    const data = [{data: 'test'}];
    const promise = new Promise(resolve => setTimeout(resolve(data)));
    const validatePromise = await validator.validatePromise(promise);
    expect(validator.error).toBe(undefined);
    expect(JSON.stringify(validatePromise)).toBe(JSON.stringify(data.map(dataItem => dataItem.data)));
  })

  test('returns an error from an invalid promise', async () => {
    const responseData = { data: 'test', request: {}, response: {status: 404} }
    const promise = new Promise((resolve, reject) => setTimeout(reject(responseData)));
    const validatePromise = await validator.validatePromise(promise);
    expect(validator.error.errorCode).toBe(102);
    expect(JSON.stringify(validatePromise.errorAdditionalInfo.response)).toBe(JSON.stringify(responseData.response));
  })
});

describe('formatError', () => {
  const validator = new Validator();

  test('returns an error message for the appropriate error code', () => {
    Object.keys(errorMessages).forEach(key => {
      const formattedError = validator.formatError(key);
      expect(formattedError.errorCode).toBe(key);
      expect(formattedError.errorMessage).toBe(errorMessages[key]);
    })
  })
});