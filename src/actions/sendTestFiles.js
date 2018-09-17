import glob from 'glob';
import path from 'path';
import chalk from 'chalk';
import { get } from 'lodash';
import { DEFAULT_TEST_FOLDER_PATH, DEFAULT_BASE_PATH } from '../constants';
import { createBaristaApiInstance } from '../baristaApiUtils';

const TEST_FOLDER_PATH = path.join(DEFAULT_BASE_PATH, DEFAULT_TEST_FOLDER_PATH);
const INTEGRATION_FOLDER_PATH = path.join(TEST_FOLDER_PATH, 'integration');

export default function sendTestFiles() {
  if (!process.env.BUILD_ID) {
    const buildIdNotFoundMsg = 'BUILD_ID not found within environment';
    return Promise.reject(new Error(buildIdNotFoundMsg));
  }

  // Load all folders within dist directory (mirrors layout of src)
  const filePaths = glob.sync(`${INTEGRATION_FOLDER_PATH}/**/**/*.spec.js`, {
    cwd: __dirname
  });
  // Map paths into filenames
  const files = filePaths.map(
    filePath => filePath && filePath.replace(`${INTEGRATION_FOLDER_PATH}/`, '')
  );
  console.log('Writing test files data to Barista API', files); // eslint-disable-line no-console
  const baristaApi = createBaristaApiInstance();

  return baristaApi.post('/builds/updateFiles', {
    files,
    buildId: process.env.BUILD_ID
  })
  .then(() => {
    console.log(chalk.blue('Files data successfully written to Barista API')); // eslint-disable-line no-console
  })
  .catch((err) => {
    const errData = get(err, 'data', err.message);

    /* eslint-disable no-console */
    console.error(
      'Error writing files list to Barista API:', errData
    );
    /* eslint-enable no-console */
    return Promise.reject(err);
  });
}
