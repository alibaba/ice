import * as path from 'path';
import * as fs from 'fs';
import * as EventEmitter from 'events';
import * as pathExists from 'path-exists';
import * as util from 'util';
import junk from 'junk';
import { IProjectPage } from '../../../interface';

export default class Page extends EventEmitter {
  public readonly projectPath: string;

  constructor(options) {
    super();
    this.projectPath = options.projectPath;
  }

  async getPages(): Promise<IProjectPage[]> {
    console.log('getPages/projectPath:', this.projectPath);
    const pages = readPages(path.join(this.projectPath, 'src', 'pages'));
    console.log('call getPages fn:', pages);
    return pages;
  }
}

/**
 * Get the list of pages for the current project
 * @param dirPath project directory path
 */
const readPages = async (dirPath) => {
  const readdirAsync = util.promisify(fs.readdir);

  const readdir = async (targetPath) => {
    if (pathExists.sync(targetPath)) {
      return (await readdirAsync(targetPath)).filter(junk.not);
    }
    return [];
  };

  const pages = [];
  const files = await readdir(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stats = fs.lstatSync(fullPath);
    if (stats.isDirectory()) {
      const { atime, birthtime, ctime, mtime } = stats;
      pages.push({
        name: path.basename(fullPath),
        fullPath,
        atime,
        birthtime,
        ctime,
        mtime,
      });
    }
  });

  return pages;
};
