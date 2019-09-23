/**
 * This file is mainly to define the public variables used in the test.
 */
import * as path from 'path';
import storage from '../../../src/lib/storage';

const tmpPath = path.join(__dirname, 'tmp');

export { storage, tmpPath };
