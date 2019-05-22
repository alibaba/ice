import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as rimraf from 'rimraf';
import * as mkdirp from 'mkdirp';
import * as upperCamelCase from 'uppercamelcase';
import * as kebabCase from 'kebab-case';
import scanDirectory from '../scanDirectory';
import getIceVersion from '../getIceVersion';
import getTarballURLByMaterielSource from '../getTarballURLByMaterielSource';
import { install as installDependency } from '../dependency';
import { IPageModule, IProject, IPage, ICreatePageParam, IMaterialBlock } from '../../../interface';

const rimrafAsync = util.promisify(rimraf);
const mkdirpAsync = util.promisify(mkdirp);

export default class Page implements IPageModule {
  public readonly projectPath: string;

  public readonly projectName: string;

  public readonly projectPackageJSON: any;

  public readonly path: string;

  constructor(project: IProject) {
    this.projectPath = project.path;
    this.projectName = project.name;
    this.projectPackageJSON = project.packageJSON;
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

  private async downloadAndExtractBlock(destDir: string, tarballURL: string): Promise<string[]> {
    return [''];
  }

  private async downloadBlocksToPage(blocks: IMaterialBlock[], pageName: string) {
    await Promise.all(
      blocks.map(async (block) => await this.downloadBlockToPage(block, pageName))
    );
  }

  private async installBlocksDependencies(blocks: IMaterialBlock[]) {
    // get all dependencies
    const dependenciesAll = {};
    blocks.forEach(({ dependencies }) => Object.assign(dependenciesAll, dependencies));

    // filter dependencies if already in project
    const filterDependencies = [];
    Object.keys(dependenciesAll).forEach((dep) => {
      if (!this.projectPackageJSON.dependencies.hasOwnProperty(dep)) {
        filterDependencies.push({
          [dep]: dependenciesAll[dep]
        });
      }
    });

    return await Promise.all(filterDependencies.map(async (dependency) => await installDependency(dependency)));
  }

  private async downloadBlockToPage(block: IMaterialBlock, pageName: string): Promise<string[]> {
    const componentsDir = path.join(
      this.path,
      pageName,
      'components'
    );
    mkdirp.sync(componentsDir);

    const iceVersion: string = getIceVersion(this.projectPackageJSON);
    const blockName: string = block.alias || upperCamelCase(block.name);

    let tarballURL: string;
    try {
      tarballURL = await getTarballURLByMaterielSource(block.source, iceVersion);
    } catch (error) {
      error.message = '请求区块 tarball 包失败';
      throw error;
    }

    try {
      return await this.downloadAndExtractBlock(
        path.join(componentsDir, blockName),
        tarballURL
      );
    } catch (error) {
      error.message = `解压区块${blockName}出错, 请重试`;
      if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
        error.message = `解压区块${blockName}超时，请重试`;
      }
      throw error;
    }
  }

  async getAll(): Promise<IPage[]> {
    return await this.scanPages(this.path);
  }

  async getOne(): Promise<any> { }

  async create(page: ICreatePageParam): Promise<any> {
    const { name, blocks, } = page;

    // create page dir
    const pageFolderName = upperCamelCase(name);
    const pageDir = path.join(this.path, pageFolderName);
    await mkdirpAsync(pageDir);

    const pageName = kebabCase(pageFolderName).replace(/^-/, '');

    if (fs.readdirSync(pageDir).length > 0) {
      const error: any = new Error(`${name} 页面已存在，不允许覆盖。`);
      error.code = 'DESTDIR_EXISTS_OVERRIDE';
      throw error;
    }

    // download blocks
    await this.downloadBlocksToPage(blocks, pageName);
    await this.installBlocksDependencies(blocks);

    // create page file

    // create layout

    // update routes.jsx

    // update menuConfig, routerConfig
  }

  async creates(): Promise<any> { }

  // TODO
  async delete(pageName: string): Promise<any> {
    await rimrafAsync(path.join(this.path, pageName));

    // TODO rewrite routerConfig.js

    // TODO rewrite router.js

    // TODO rewrite menuConfig.js
  }

  async update(): Promise<any> { }

  async getBlocks(): Promise<any> { }

  async createBlock(): Promise<any> { }

  async createBlocks(): Promise<any> { }
}