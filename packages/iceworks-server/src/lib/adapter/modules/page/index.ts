import * as path from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as util from 'util';
import * as ejs from 'ejs';
import * as prettier from 'prettier';
import * as rimraf from 'rimraf';
import * as _ from 'lodash';
import * as mkdirp from 'mkdirp';
import * as upperCamelCase from 'uppercamelcase';
import * as uniqBy from 'lodash.uniqby';
import { getAndExtractTarball } from 'ice-npm-utils';
import scanDirectory from '../../../scanDirectory';
import getNpmClient from '../../../getNpmClient';
import goldlog from '../../../goldlog';
import getIceVersion from '../../utils/getIceVersion';
import getTarballURLByMaterielSource from '../../../getTarballURLByMaterielSource';
import { install as installDependency } from '../dependency';
import { IPageModule, IProject, IPage, ICreatePageParam, IMaterialBlock, IContext, IProjectBlock } from '../../../../interface';

const rimrafAsync = util.promisify(rimraf);
const mkdirpAsync = util.promisify(mkdirp);
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const lstatAsync = util.promisify(fs.lstat);

const loadTemplate = async (fileName: string, filePath: string) => {
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

  public readonly templateFileName: string;

  public readonly templateFilePath: string;

  public readonly prettierParseType: string;

  constructor(params: { project: IProject; storage: any }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.path = path.join(this.project.path, 'src', 'pages');
    this.templateFileName = 'template.jsx';
    this.templateFilePath = path.join(__dirname, `${this.templateFileName}.ejs`);
    this.prettierParseType = 'babel';
  }

  private async scanPages(dirPath: string): Promise<IPage[]> {
    const subDirectories = await scanDirectory(dirPath);
    const pages = await Promise.all(subDirectories.map(async (dir) => {
      const pagePath = path.join(dirPath, dir);
      const { atime, birthtime, ctime, mtime } = await lstatAsync(pagePath);
      const pageName = path.basename(dir);
      const blocks = await this.getBlocks(pageName);
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
          [packageName]: blocksDependencies[packageName],
        });
      }
    });

    return await Promise.all(filterDependencies.map(async (dependency) => {
      const [packageName, version]: [string, string] = Object.entries(dependency)[0];
      const [npmClient, registry] = await getNpmClient();
      return await installDependency({
        dependencies: [{ package: packageName, version }],
        npmClient,
        registry,
        isDev: false,
        project: this.project,
        namespace: 'page',
        ctx,
      });
    }));
  }

  private async downloadBlockToPage(block: IMaterialBlock, pageName: string, ctx: IContext): Promise<void> {
    const blockSourceNpm = block.source.npm;
    const { i18n, logger } = ctx;
    const projectPackageJSON = this.project.getPackageJSON();
    const componentsDir = path.join(
      this.path,
      pageName,
      this.componentDirName
    );
    await mkdirpAsync(componentsDir);
    await goldlog({
      namespace: 'adapter',
      module: 'page',
      action: 'downloadBlock',
      data: {
        block: blockSourceNpm,
      },
    });

    const iceVersion: string = getIceVersion(projectPackageJSON);
    const blockName: string = this.generateBlockName(block);

    let tarballURL: string;
    try {
      tarballURL = await getTarballURLByMaterielSource(block.source, iceVersion);
    } catch (error) {
      logger.error(error);
      error.message = `${i18n.format('baseAdapter.page.download.requestError', { blockSourceNpm })}，可手动克隆 ${block.repository}`;
      throw error;
    }

    const blockDir = path.join(componentsDir, blockName);
    const blockTempDir = path.join(componentsDir, `.${blockName}.temp`);
    try {
      await getAndExtractTarball(
        blockTempDir,
        tarballURL
      );
    } catch (error) {
      logger.error('getAndExtractTarball got error!');
      error.message = i18n.format('baseAdapter.page.download.tarError', { blockName, tarballURL });
      if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
        error.message = i18n.format('baseAdapter.page.download.tarTimeOut', { blockName, tarballURL });
      }
      throw error;
    }

    await fsExtra.move(path.join(blockTempDir, 'src'), blockDir);
    await rimrafAsync(blockTempDir);
  }

  private generateBlockName(block: { name: string }): string {
    return upperCamelCase(block.name);
  }

  private checkBlocksName(blocks: { name: string }[]): boolean {
    return uniqBy(blocks.map((block) => ({ name: this.generateBlockName(block) })), 'name').length !== blocks.length;
  }

  public async getAll(): Promise<IPage[]> {
    const pages = await this.scanPages(this.path);
    return _.orderBy(pages, 'name', 'asc');
  }

  public async create(page: ICreatePageParam, ctx: IContext): Promise<any> {
    const { name, blocks } = page;
    const { socket, i18n, logger } = ctx;

    // create page dir
    socket.emit('adapter.page.create.status', { text: i18n.format('baseAdapter.page.create.createMenu'), percent: 10 });
    const pageName = upperCamelCase(name);
    const pageDir = path.join(this.path, pageName);
    await mkdirpAsync(pageDir);

    if (fs.readdirSync(pageDir).length > 0) {
      const error: any = new Error(`${name} 页面已存在，不允许覆盖。`);
      error.code = 'DESTDIR_EXISTS_OVERRIDE';
      throw error;
    }

    // add blocks
    socket.emit('adapter.page.create.status', { text: i18n.format('baseAdapter.page.create.download'), percent: 40 });
    try {
      await this.addBlocks({ blocks, name: pageName }, ctx);
    } catch (error) {
      logger.error('addBlocks got error!');
      await this.delete({ name: pageName });
      throw error;
    }

    // create page file
    socket.emit('adapter.page.create.status', { text: i18n.format('baseAdapter.page.create.createFile'), percent: 80 });

    const template = await loadTemplate(this.templateFileName, this.templateFilePath);
    const fileContent = template.compile({
      blocks: blocks.map((block) => {
        const blockName = this.generateBlockName(block);

        return {
          ...block,
          className: blockName,
          relativePath: `./${this.componentDirName}/${blockName}`,
        };
      }),
      className: pageName,
      pageName,
    });
    const fileName = template.fileName
      .replace(/template/g, 'index')
      .replace(/\.ejs$/g, '');
    const dist = path.join(pageDir, fileName);
    const rendered = prettier.format(
      fileContent,
      { singleQuote: true, trailingComma: 'es5', parser: this.prettierParseType }
    );

    await writeFileAsync(dist, rendered, 'utf-8');
    return pageName;
  }

  public async delete(params: { name: string }): Promise<any> {
    const { name } = params;
    await rimrafAsync(path.join(this.path, name));
  }

  public async getBlocks(name: string): Promise<IProjectBlock[]> {
    const pagePath = path.join(this.path, name);
    const blocksPath = path.join(pagePath, this.componentDirName);
    let blockDirectroies = [];
    try {
      blockDirectroies = await scanDirectory(blocksPath);
    } catch (err) {
      // ignore error
    }

    const blocks = blockDirectroies.map((blockDir) => {
      return {
        name: blockDir,
        path: path.join(blocksPath, blockDir),
      };
    });
    return blocks;
  }

  public async addBlocks(params: { blocks: IMaterialBlock[]; name?: string }, ctx: IContext): Promise<void> {
    const { blocks, name } = params;
    const { i18n } = ctx;

    const existBlocks = await this.getBlocks(name);
    if (this.checkBlocksName(existBlocks.concat(blocks))) {
      throw new Error(i18n.format('baseAdapter.page.blocks.exist'));
    }

    await this.downloadBlocksToPage(blocks, name, ctx);
    await this.installBlocksDependencies(blocks, ctx);
  }

  public async addBlock(params: { block: IMaterialBlock; name?: string }, ctx: IContext): Promise<void> {
    const { block, name } = params;
    await this.downloadBlockToPage(block, name, ctx);
    await this.installBlocksDependencies([block], ctx);
  }
}
