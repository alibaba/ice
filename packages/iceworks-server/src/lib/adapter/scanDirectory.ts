import * as path from 'path';
import * as fs from 'fs';
import * as pathExists from 'path-exists';
import * as util from 'util';
import junk from 'junk';
const readdirAsync = util.promisify(fs.readdir);

export default async (dirPath: string): Promise<string[]> => {
  if (!pathExists.sync(dirPath)) {
    return [];
  }

  return (await readdirAsync(dirPath)).filter((file: string) => {
    const stats = fs.lstatSync(path.join(dirPath, file));
    return junk.not(file) && stats.isDirectory();
  });
};
