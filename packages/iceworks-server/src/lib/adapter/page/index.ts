import * as path from 'path';
import * as fs from 'fs';
import * as pathExists from 'path-exists';
import * as util from 'util';
import junk from 'junk';
import { IPageModule, IProject } from '../../../interface';

export default class Page implements IPageModule {
  public readonly project: IProject;

  constructor(project: IProject) {
    this.project = project;
  }

  async getAll() {
    return readPages(path.join(this.project.path, 'src', 'pages'));
  }

  async getOne(): Promise<any> { }

  async create(): Promise<any> { }

  async creates(): Promise<any> { }

  async delete(): Promise<any> { }

  async update(): Promise<any> { }

  async getBlocks(): Promise<any> { }

  async createBlock(): Promise<any> { }

  async createBlocks(): Promise<any> { }
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
