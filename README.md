# multipleUrls

This package is able to
- fetch an array of URLs which contain JSON data
- return their contents in a promise

Example usage
```
const requestMultipleUrls = require('request-multiple-urls');
const urls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
];
requestMultipleUrls(urls).then(urlContent => {
  ...
});
```

Instalation:
`npm install --save https://github.com/arbughiu/multipleUrls.git`

Testing:
`npm test`

Documentation:
`npm docs`

Notes:
- requires node v10
- When testing on a local machine, CORS would have to be disabled for cross browser fetching. https://alfilatov.com/posts/run-chrome-without-cors/
