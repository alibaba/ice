/**
 * This file is mainly to define the public variables used in the test.
 */
import * as path from 'path';
import storage from '../../storage';

const tmpPath = path.join(__dirname, 'tmp');

const project = {
  type: 'react',
  name: '@icedesign/lite-scaffold',
  path: tmpPath,
  packagePath: path.join(tmpPath, 'package.json'),
  panels: [],
  adapter: {},
  getPackageJSON: () => { },
  setPackageJSON: () => { },
  getEnv: () => { },
};

export { project, storage };