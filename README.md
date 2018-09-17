# barista-tools
> Command line library and tools to simplify communication with barista test running service.
 
[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Installation

```bash
npm install barista-tools
```

## Usage

### Create Test Env File
Generate a JWT on behalf ot eh user associated with the TEST_UID provided. Test environment file, `cypress.env.json`,  is then built containing that JWT and other test config.

`barista createTestEnvFile`
Within scripts section of package.json:

  ```json
  "build:testConfig": "barista createTestEnvFile"
  ```

Then use in Dockerfile:

  ```Dockerfile
  # Build Test Config File (cypress.env.json)
  RUN npm run build:testConfig
  ```

### Send Test Files For Build
Sends list of test files within test/e2e/integration folder to associated container build on Barista

Within scripts section of package.json:

  ```json
  "build:testFiles": "barista sendTestFiles"
  ```

Then use in Dockerfile:

  ```Dockerfile
  # Send test file data to Barista REST API
  RUN npm run build:testFiles
  ```

### Sending Test Results
Write results of test run to barista

```bash
$(npm bin)/cypress run --reporter barista-reporter$TEST_ARGS; echo \"$?\" | $(npm bin)/sendResultToBarista
```

## License

MIT © [Prescott Prue](http://prue.io)

[npm-image]: https://img.shields.io/npm/v/barista-tools.svg?style=flat-square
[npm-url]: https://npmjs.org/package/barista-tools
[npm-downloads-image]: https://img.shields.io/npm/dm/barista-tools.svg?style=flat-square
[quality-image]: http://npm.packagequality.com/shield/barista-tools.svg?style=flat-square
[quality-url]: https://packagequality.com/#?package=barista-tools
[travis-image]: https://img.shields.io/travis/prescottprue/barista-tools/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/prescottprue/barista-tools
[daviddm-image]: https://img.shields.io/david/prescottprue/barista-tools.svg?style=flat-square
[daviddm-url]: https://david-dm.org/prescottprue/barista-tools
[coverage-image]: https://img.shields.io/codecov/c/github/prescottprue/barista-tools.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/prescottprue/barista-tools
[license-image]: https://img.shields.io/npm/l/barista-tools.svg?style=flat-square
[license-url]: https://github.com/prescottprue/barista-tools/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square
[code-style-url]: http://airbnb.io/javascript/