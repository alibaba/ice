import * as path from 'path';
import * as fs from 'fs';
import * as pathExists from 'path-exists';
import * as util from 'util';
import * as junk from 'junk';
const readdirAsync = util.promisify(fs.readdir);
const lstatAsync = util.promisify(fs.lstat);
const accessAsync = util.promisify(fs.access);

/**
 * Given a directory, scan the directory below
 * 
 * @param directoryPath 
 */
export default async (directoryPath: string): Promise<string[]> => {
  if (!pathExists.sync(directoryPath)) {
    return [];
  }

  const files = await readdirAsync(directoryPath);
  let targetFiles = [];
  await Promise.all(files.map(async (filename: string) => {
    const targetPath = path.join(directoryPath, filename);
    const stats = await lstatAsync(targetPath);
    const isDirectory = stats.isDirectory() && junk.not(filename);

    if (isDirectory) {
      try {
        await accessAsync(targetPath, fs.constants.R_OK);
        targetFiles.push(filename);
      } catch (error) {
        // ...
      }
    }
  }));
  return targetFiles;
};
