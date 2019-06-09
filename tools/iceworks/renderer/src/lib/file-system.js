import fs from 'fs';
import pathExists from 'path-exists';
import junk from 'junk';
import { promisify } from 'util';

const readdirAsync = promisify(fs.readdir);
export const lstatAsync = promisify(fs.lstat);

export const readdirSync = (targetPath) => {
  if (pathExists.sync(targetPath)) {
    return fs.readdirSync(targetPath).filter(junk.not);
  }
  return [];
};

export const readdir = async (targetPath) => {
  if (await pathExists(targetPath)) {
    const files = await readdirAsync(targetPath);
    return files.filter(junk.not);
  }
  return [];
};
