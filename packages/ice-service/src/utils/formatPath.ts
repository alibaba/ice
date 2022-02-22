import * as path from 'node:path';

function formatPath(pathStr: string): string {
  return process.platform === 'win32' ? pathStr.split(path.sep).join('/') : pathStr;
}

export default formatPath;