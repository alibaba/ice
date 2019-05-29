import * as path from 'path';
import * as fs from 'fs';
import * as pathExists from 'path-exists';
import * as util from 'util';
import junk from 'junk';
const readdirAsync = util.promisify(fs.readdir);

/**
 * Given a directory, scan the directory below
 * 
 * @param directoryPath 
 */
export default async (directoryPath: string): Promise<string[]> => {
  if (!pathExists.sync(directoryPath)) {
    return [];
  }

  return (await readdirAsync(directoryPath)).filter((file: string) => {
    const stats = fs.lstatSync(path.join(directoryPath, file));
    return junk.not(file) && stats.isDirectory();
  });
};
