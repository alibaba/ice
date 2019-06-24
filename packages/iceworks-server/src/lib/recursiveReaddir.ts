import { isBinaryFileSync } from 'isbinaryfile';
import * as junk from 'junk';
import * as fs from 'fs-extra';
import * as readdir from 'recursive-readdir';

function ignoreFile(filePath: string, stats: fs.Stats) {
  return junk.is(filePath) || (!stats.isDirectory() && isBinaryFileSync(filePath));
}

export default async function(filePath: string, ignores: string[] = []): Promise<string[]> {
  let combinedIgnores = ['node_modules', '.*', ignoreFile];
  if (Array.isArray(ignores)) {
    combinedIgnores = combinedIgnores.concat(ignores);
  }

  const files = await readdir(filePath, combinedIgnores);

  return files;
}
