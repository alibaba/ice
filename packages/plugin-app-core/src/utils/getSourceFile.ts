import * as path from 'path';
import * as globby from 'globby';

export default (filePath: string, rootDir: string = process.cwd()) => {
  const globbyPattern = path.extname(filePath) ? filePath : `${filePath}.@((t|j)s?(x))`;
  const targetFiles = globby.sync(globbyPattern, {
    cwd: rootDir
  });

  return targetFiles[0] && path.join(rootDir, targetFiles[0]);
};