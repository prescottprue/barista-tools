/**
 * sendTestFiles commander component
 * To use add require('../cmds/deploy.js')(program) to your commander.js based node executable before program.parse
 */

const sendTestFiles = require('../lib/index').sendTestFiles;
const chalk = require('chalk');

/**
 * @name sendTestFiles
 * @description Deploy to Firebase only on build branches (master, stage, prod)
 * @param {String} only - Only flag can be passed to deploy only specified
 * targets (e.g hosting, storage)
 * @example <caption>Basic</caption>
 * # make sure FIREBASE_TOKEN env variable is set
 * npm i -g firebase-ci
 * firebase-ci deploy
 * @example <caption>Travis</caption>
 * after_success:
 *   - npm i -g firebase-ci
 *   - firebase-ci deploy
 */
module.exports = function (program) {
  program
    .command('sendTestFiles')
    .option(
      '-p --project',
      'Project within .firebaserc to use when creating config file. Defaults to "default" then to "master"'
    )
    .description(
      'Build configuration file based on settings in .firebaserc. Uses TRAVIS_BRANCH to determine project from .firebaserc to use for config (falls back to "default" then to "master").'
    )
    .action((directory, options) =>
      sendTestFiles(program.args[0], directory, options)
        .then(() => process.exit(0))
        .catch((err) => {
          console.log(chalk.red(`Error sending test files:\n${err.message}`)); // eslint-disable-line no-console
          process.exit(1);
          return Promise.reject(err);
        })
    );
};
