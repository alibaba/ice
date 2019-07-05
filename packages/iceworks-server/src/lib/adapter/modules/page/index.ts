import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as util from 'util';
import * as ejs from 'ejs';
import * as prettier from 'prettier';
import * as rimraf from 'rimraf';
import * as _ from 'lodash';
import * as mv from 'mv';
import * as mkdirp from 'mkdirp';
import * as upperCamelCase from 'uppercamelcase';
import * as kebabCase from 'kebab-case';
import scanDirectory from '../../../scanDirectory';
import getIceVersion from '../../utils/getIceVersion';
import getTarballURLByMaterielSource from '../../../getTarballURLByMaterielSource';
import downloadAndExtractPackage from '../../../downloadAndExtractPackage';
import { install as installDependency } from '../dependency';
import { IPageModule, IProject, IPage, ICreatePageParam, IMaterialBlock, IContext, IProjectBlock } from '../../../../interface';

const rimrafAsync = util.promisify(rimraf);
const mkdirpAsync = util.promisify(mkdirp);
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const lstatAsync = util.promisify(fs.lstat);
const mvAsync = util.promisify(mv);

const loadTemplate = async () => {
  const fileName = 'template.jsx';
  const filePath = path.join(__dirname, `${fileName}.ejs`);
  const fileStr = await readFileAsync(filePath, 'utf-8');
  const compile = ejs.compile(fileStr);
  return {
    compile,
    filePath,
    fileName,
  };
};

export default class Page implements IPageModule {
  public readonly project: IProject;
  public readonly storage: any;

  public readonly path: string;
  private readonly componentDirName: string = 'components';

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.path = path.join(this.project.path, 'src', 'pages');
  }

  private async scanPages(dirPath: string): Promise<IPage[]> {
    const subDirectories = await scanDirectory(dirPath);
    const pages = await Promise.all(subDirectories.map(async(dir) => {
      const pagePath = path.join(dirPath, dir);
      const { atime, birthtime, ctime, mtime } = await lstatAsync(pagePath);
      const blocks = await this.getBlocks(dir);
      return {
        name: path.basename(pagePath),
        path: pagePath,
        atime,
        birthtime,
        ctime,
        mtime,
        blocks,
      };
    }));
    return pages;
  }

  private async downloadBlocksToPage(blocks: IMaterialBlock[], pageName: string, ctx: IContext) {
    return await Promise.all(
      blocks.map(async (block) => await this.downloadBlockToPage(block, pageName, ctx))
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

  private async downloadBlockToPage(block: IMaterialBlock, pageName: string, ctx: IContext): Promise<void> {
    const { i18n } = ctx;
    const projectPackageJSON = this.project.getPackageJSON();
    const componentsDir = path.join(
      this.path,
      pageName,
      this.componentDirName
    );
    await mkdirpAsync(componentsDir);

    const iceVersion: string = getIceVersion(projectPackageJSON);
    const blockName: string = block.alias || upperCamelCase(block.name);

    let tarballURL: string;
    try {
      tarballURL = await getTarballURLByMaterielSource(block.source, iceVersion);
    } catch (error) {
      error.message = i18n.format('baseAdapter.page.download.requestError');
      throw error;
    }

    const blockDir = path.join(componentsDir, blockName);
    const blockTempDir = path.join(os.tmpdir(), blockName);
    try {
      await downloadAndExtractPackage(
        blockTempDir,
        tarballURL
      );

      await mkdirpAsync(blockDir);
      await mvAsync(path.join(blockTempDir, 'src'), blockDir);
    } catch (error) {
      error.message = i18n.format('baseAdapter.page.download.tarError', {blockName});
      if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
        error.message = i18n.format('baseAdapter.page.download.tarTimeOut', {blockName});
      }
      throw error;
    }
  }

  async getAll(): Promise<IPage[]> {
    const pages = await this.scanPages(this.path);
    return _.orderBy(pages, 'name', 'asc');
  }

  async getOne(): Promise<any> { }

  async create(page: ICreatePageParam, ctx: IContext): Promise<any> {
    const { name, blocks } = page;
    const { socket, i18n } = ctx;

    // create page dir
    socket.emit('adapter.page.create.status', { text: i18n.format('baseAdapter.page.create.createMenu'), percent: 10 });
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
    socket.emit('adapter.page.create.status', { text: i18n.format('baseAdapter.page.create.download'), percent: 40 });
    await this.downloadBlocksToPage(blocks, pageName, ctx);

    // install block dependencies
    socket.emit('adapter.page.create.status', { text: i18n.format('baseAdapter.page.create.installDep'), percent: 80 });
    await this.installBlocksDependencies(blocks, ctx);

    // create page file
    socket.emit('adapter.page.create.status', { text: i18n.format('baseAdapter.page.create.createFile'), percent: 90 });
    const template = await loadTemplate();
    const fileContent = template.compile({
      blocks: blocks.map((block) => {
        const blockFolderName = block.alias || upperCamelCase(block.name);
        const blockClassName = upperCamelCase(block.alias || block.name);

        return {
          ...block,
          className: blockClassName,
          relativePath: `./${this.componentDirName}/${blockFolderName}`,
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
  }

  async bulkCreate(): Promise<any> { }

  async delete(params: {name: string}): Promise<any> {
    const { name } = params;
    await rimrafAsync(path.join(this.path, name));
  }

  public async getBlocks(name: string): Promise<IProjectBlock[]> {
    const pagePath = path.join(this.path, name);
    const blocksPath = path.join(pagePath, this.componentDirName);
    const blockDirectroies = await scanDirectory(blocksPath);
    const blocks = blockDirectroies.map((blockDir) => {
      return {
        name: blockDir,
        path: path.join(blocksPath, blockDir),
      };
    });
    return blocks;
  }

  async addBlocks(params: {blocks: IMaterialBlock[]; name?: string; }, ctx: IContext): Promise<void> {
    const {blocks, name} = params;
    await this.downloadBlocksToPage(blocks, name, ctx);
  }

  async addBlock(params: {block: IMaterialBlock, name?: string; }, ctx: IContext): Promise<void> {
    const {block, name} = params;
    await this.downloadBlockToPage(block, name, ctx);
  }

  async update(): Promise<any> { }
}
