#!/usr/bin/env node

const isString = require('lodash/isString');
const get = require('lodash/get');
const chalk = require('chalk');
const baristaApiUtils = require('../lib/baristaApiUtils');

const stdin = process.openStdin();

let data = '';

stdin.on('data', (chunk) => {
  data += chunk;
});

stdin.on('end', () => {
  if (!process.env.JOB_RUN_KEY) {
    /* eslint-disable no-console */
    console.log(
      chalk.red(
        'JOB_RUN_KEY not found within environment, exiting with error status'
      )
    );
    /* eslint-enable no-console */
    process.exit(1);
  }
  else {
    const useStage =
      isString(process.env.TEST_ARGS) &&
      process.env.TEST_ARGS.includes('useStage=true');
    const baristaApiInstance = baristaApiUtils.createBaristaApiInstance({ useStage });
    const runResult = data === '0' || data === 0 ? 'passed' : 'failed';
    console.log(`Writing status "${runResult}" to /runs/sendResult`); // eslint-disable-line no-console
    baristaApiInstance.post('/runs/sendResult', {
      jobRunKey: process.env.JOB_RUN_KEY || Date.now(),
      runResult
    })
    .then(() => {
      process.exit();
    })
    .catch((err) => {
      const errData = get(err, 'data', err.message || err);
      /* eslint-disable no-console */
      console.log(
        chalk.red(
          `Error writing status "${runResult}" to Barista API:`
        ),
        errData
      );
      /* eslint-enable no-console */
      process.exit(1);
    });
  }
});
