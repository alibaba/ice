/**
 * This file is mainly to define the public variables used in the test.
 */
import * as path from 'path';
import * as fs from 'fs';
import storage from '../../storage';

const tmpPath = path.join(__dirname, 'tmp');
const packagePath = path.join(tmpPath, 'package.json');

const project = {
  type: 'react',
  name: '@icedesign/lite-scaffold',
  path: tmpPath,
  packagePath: packagePath,
  panels: [],
  adapter: {},
  getPackageJSON: () => { return JSON.parse(fs.readFileSync(packagePath).toString()) },
  setPackageJSON: (content) => { fs.writeFileSync(packagePath, `${JSON.stringify(content, null, 2)}\n`, 'utf-8') },
  getEnv: () => { },
};

export { project, storage, tmpPath };
