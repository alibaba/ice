import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as rimraf from 'rimraf';
import scanDirectory from '../scanDirectory';
import { IPageModule, IProject, IPage } from '../../../interface';

const rimrafAsync = util.promisify(rimraf);

export default class Page implements IPageModule {
  public readonly projectPath: string;

  public readonly projectName: string;

  public readonly path: string;

  constructor(project: IProject) {
    this.projectPath = project.path;
    this.projectName = project.name;
    this.path = path.join(this.projectPath, 'src', 'pages');
  }

  private async scanPages(dirPath: string) {
    return (await scanDirectory(dirPath)).map(dir => {
      const fullPath = path.join(dirPath, dir);
      const { atime, birthtime, ctime, mtime } = fs.lstatSync(fullPath);
      return {
        name: path.basename(fullPath),
        path: fullPath,
        atime,
        birthtime,
        ctime,
        mtime,
      }
    });
  }

  async getAll(): Promise<IPage[]> {
    return await this.scanPages(this.path);
  }

  async getOne(): Promise<any> { }

  async create(): Promise<any> { }

  async creates(): Promise<any> { }

  // TODO
  async delete(pageName: string): Promise<any> {
    await rimrafAsync(path.join(this.path, pageName));
  }

  async update(): Promise<any> { }

  async getBlocks(): Promise<any> { }

  async createBlock(): Promise<any> { }

  async createBlocks(): Promise<any> { }
}