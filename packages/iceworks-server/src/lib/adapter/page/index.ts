import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as ejs from 'ejs';
import * as prettier from 'prettier';
import * as rimraf from 'rimraf';
import * as mkdirp from 'mkdirp';
import * as upperCamelCase from 'uppercamelcase';
import * as kebabCase from 'kebab-case';
import scanDirectory from '../../scanDirectory';
import getIceVersion from '../getIceVersion';
import getTarballURLByMaterielSource from '../../getTarballURLByMaterielSource';
import downloadAndExtractPackage from '../../downloadAndExtractPackage';
import { install as installDependency } from '../dependency';
import { IPageModule, IProject, IPage, ICreatePageParam, IMaterialBlock, IContext } from '../../../interface';

const rimrafAsync = util.promisify(rimraf);
const mkdirpAsync = util.promisify(mkdirp);
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFileSync);

const loadTemplate = async () => {
  const fileName = 'template.js';
  const filePath = path.join(__dirname, `${fileName}.ejs`);
  const fileStr = await readFileAsync(filePath, 'utf-8');
  return {
    compile: ejs.compile(fileStr),
    filePath,
    fileName,
  };
};

export default class Page implements IPageModule {
  public readonly project: IProject;
  public readonly storage: any;

  public readonly path: string;

  constructor(params: {project: IProject; storage: any;}) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.path = path.join(this.project.path, 'src', 'pages');
  }

  private async scanPages(dirPath: string): Promise<IPage[]> {
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

  private async downloadBlocksToPage(blocks: IMaterialBlock[], pageName: string) {
    return await Promise.all(
      blocks.map(async (block) => await this.downloadBlockToPage(block, pageName))
    );
  }

  private async installBlocksDependencies(blocks: IMaterialBlock[], ctx: IContext) {
    const projectPackageJSON = this.project.getPackageJSON();
    // get all dependencies
    const blocksDependencies: { [packageName: string]: string } = {};
    blocks.forEach(({ dependencies }) => Object.assign(blocksDependencies, dependencies));

    // filter dependencies if already in project
    const filterDependencies: { [packageName: string]: string }[] = [];
    Object.keys(blocksDependencies).forEach((packageName) => {
      if (!projectPackageJSON.dependencies.hasOwnProperty(packageName)) {
        filterDependencies.push({
          [packageName]: blocksDependencies[packageName]
        });
      }
    });

    return await Promise.all(filterDependencies.map(async (dependency) => {
      const [packageName, version]: [string, string] = Object.entries(dependency)[0];
      return await installDependency([{ package: packageName, version }], false, this.project, ctx.socket, 'page');
    }));
  }

  private async downloadBlockToPage(block: IMaterialBlock, pageName: string): Promise<string[]> {
    const projectPackageJSON = this.project.getPackageJSON();
    const componentsDir = path.join(
      this.path,
      pageName,
      'components'
    );
    await mkdirpAsync(componentsDir);

    const iceVersion: string = getIceVersion(projectPackageJSON);
    const blockName: string = block.alias || upperCamelCase(block.name);

    let tarballURL: string;
    try {
      tarballURL = await getTarballURLByMaterielSource(block.source, iceVersion);
    } catch (error) {
      error.message = '请求区块 tarball 包失败';
      throw error;
    }

    try {
      return await downloadAndExtractPackage(
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

  async create(page: ICreatePageParam, ctx: IContext): Promise<any> {
    const { name, blocks } = page;

    // create page dir
    ctx.socket.emit('adapter.page.create.status', { text: '创建页面目录...', percent: 10 });
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
    ctx.socket.emit('adapter.page.create.status', { text: '正在下载区块...', percent: 40 });
    await this.downloadBlocksToPage(blocks, pageName);

    // install block dependencies
    ctx.socket.emit('adapter.page.create.status', { text: '正在安装区块依赖...', percent: 80 });
    await this.installBlocksDependencies(blocks, ctx);

    // create page file
    ctx.socket.emit('adapter.page.create.status', { text: '正在创建页面文件...', percent: 90 });
    const template = await loadTemplate();
    const fileContent = template.compile({
      blocks: blocks.map((block) => {
        const blockFolderName = block.alias || upperCamelCase(block.name);
        const blockClassName = upperCamelCase(block.alias || block.name);

        return {
          ...block,
          className: blockClassName,
          relativePath: `./components/${blockFolderName}`,
        };
      }),
      className: pageFolderName,
      pageName,
    });
    const fileName = template.fileName
      .replace(/template/g, 'index')
      .replace(/\.ejs$/g, '');
    const dist = path.join(pageDir, fileName);
    const rendered = prettier.format(
      fileContent,
      { singleQuote: true, trailingComma: 'es5', parser: 'babel' }
    );

    await writeFileAsync(dist, rendered, 'utf-8');

    // TODO update routes.jsx

    // TODO update menuConfig, routerConfig
  }

  async bulkCreate(): Promise<any> { }

  // TODO
  async delete(params: {pageName: string}): Promise<any> {
    const { pageName } = params;
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