import * as path from 'path';
import * as fs from 'fs';
import * as pathExists from 'path-exists';
import * as util from 'util';
import * as junk from 'junk';
import * as _ from 'lodash';

const readdirAsync = util.promisify(fs.readdir);
const lstatAsync = util.promisify(fs.lstat);
const accessAsync = util.promisify(fs.access);

/**
 * Given a directory, scan the directory below
 *
 * @param directoryPath
 */
export default async (directoryPath: string): Promise<string[]> => {
  const isExist = await pathExists(directoryPath);
  if (!isExist) {
    throw new Error(`${directoryPath} is not exist.`);
  }

  const files = await readdirAsync(directoryPath);
  const targetFiles = [];
  await Promise.all(files.map(async (filename: string) => {
    const targetPath = path.join(directoryPath, filename);
    let stats;
    try {
      stats = await lstatAsync(targetPath);
    } catch (err) {
      console.warn('lstatAsync got error:', err);
    }

    const isDirectory = stats &&
      stats.isDirectory() &&
      junk.not(filename) &&
      filename.indexOf('.') !== 0;
    if (isDirectory) {
      try {
        await accessAsync(targetPath, fs.constants.R_OK);
        targetFiles.push(filename);
      } catch (error) {
        console.warn('accessAsync got error:', error);
      }
    }
  }));

  return _.orderBy(targetFiles);
};
