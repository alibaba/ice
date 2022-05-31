import * as fs from 'fs';
import { createHash } from 'crypto';

export async function getFileHash(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    fs.createReadStream(file)
      .on('error', (err) => reject(err))
      .on('data', (data) => hash.update(data))
      .on('close', () => resolve(hash.digest('hex')));
  });
}