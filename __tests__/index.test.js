const requestMultipleUrls = require('./../index');

describe('requestMultipleUrls', () => {
  describe('it returns a promise', () => {
    test('on a valid request', () => {
      const promise = requestMultipleUrls(['https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json']);
      expect(promise instanceof Promise).toBe(true);
    })
    test('on an invalid request', async () => {
      const promise = requestMultipleUrls();
      expect(promise instanceof Promise).toBe(true);
      promise.catch(() => null);
    })
  })
})