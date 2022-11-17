import * as path from 'path';
import * as fs from 'fs';
import { createHash } from 'crypto';
import fg from 'fast-glob';
import formatPath from './formatPath.js';

export async function getFileHash(file: string): Promise<string> {
  let filePath = formatPath(file);
  if (!path.extname(filePath)) {
    const patterns = [`${filePath}.{js,ts,jsx,tsx}`];
    filePath = fg.sync(patterns)[0];
  }
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    fs.createReadStream(filePath)
      .on('error', (err) => reject(err))
      .on('data', (data) => hash.update(data))
      .on('close', () => resolve(hash.digest('hex')));
  });
}