import * as path from 'path';

function getSourceDir (entry: string): string {
  // entry: src/app -> srcDir: src
  // entry: client/app -> srcDir: client
  return path.dirname(entry);
}

export default getSourceDir;