# barista-tools

Command line library and tools to simplify communication with barista test running service.

## Installation

```sh
$ npm install barista-tools
```

## Usage

### Create Test Env File
Generate a JWT on behalf ot eh user associated with the TEST_UID provided. Test environment file, `cypress.env.json`,  is then built containing that JWT and other test config.

`barista createTestEnvFile`

### Send Test Files For Build
Sends list of test files within test/e2e/integration folder to associated container build on Barista

`barista sendTestFiles`

### Sending Test Results
Write results of test run to barista

`$(npm bin)/cypress run --reporter barista-reporter$TEST_ARGS; echo \"$?\" | sendResultToBarista`

## License

MIT
