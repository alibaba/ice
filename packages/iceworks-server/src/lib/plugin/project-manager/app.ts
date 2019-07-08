import * as EventEmitter from 'events';
import * as trash from 'trash';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as mv from 'mv';
import * as _ from 'lodash';
import * as mkdirp from 'mkdirp';
import * as pathExists from 'path-exists';
import * as arrayMove from 'array-move';
import * as rimraf from 'rimraf';
import { getAndExtractTarball, checkAliInternal } from 'ice-npm-utils';
import storage from '../../storage';
import { IProject, IMaterialScaffold, IPanel, IBaseModule, II18n } from '../../../interface';
import getTarballURLByMaterielSource from '../../getTarballURLByMaterielSource';

const mkdirpAsync = util.promisify(mkdirp);
const accessAsync = util.promisify(fs.access);
const readdirAsync = util.promisify(fs.readdir);
const existsAsync = util.promisify(fs.exists);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const mvAsync = util.promisify(mv);
const rimrafAsync = util.promisify(rimraf);

const packageJSONFilename = 'package.json';
const abcJSONFilename = 'abc.json';
const DEFAULT_TYPE = 'react';
const DEFAULT_ADAPTER = [
  'adapter-react-v1',
  'adapter-react-v2',
  'adapter-react-v3',
  'adapter-vue-v1'
];

class Project implements IProject {
  public readonly name: string;

  public readonly path: string;

  public readonly packagePath: string;

  public readonly type: string;

  public panels: IPanel[] = [];

  public adapter: {[name: string]: IBaseModule} = {};

  public adapterName: string;

  constructor(folderPath: string) {
    this.name = path.basename(folderPath);
    this.path = folderPath;
    this.packagePath = path.join(this.path, packageJSONFilename);
    this.type = this.getType();
  }

  public getType(): string {
    const { iceworks = {} } = this.getPackageJSON();
    const { type = DEFAULT_TYPE } = iceworks;
    return type;
  }

  public getPackageJSON() {
    return JSON.parse(fs.readFileSync(this.packagePath).toString());
  }

  public setPackageJSON(content) {
    return fs.writeFileSync(this.packagePath, `${JSON.stringify(content, null, 2)}\n`, 'utf-8');
  }

  public getEnv() {
    return process.env;
  }

  private interopRequire(id) {
    let mod;
    try {
      mod = require(id);
    } catch (error) {
      throw error;
    }

    return mod && mod.__esModule ? mod.default : mod;
  }

  public async loadAdapter(i18n: II18n) {
    // reset panels
    this.panels = [];

    const pkgContent = this.getPackageJSON();
    const adapterName = pkgContent.iceworks ? pkgContent.iceworks.adapter : null;
    if (adapterName && DEFAULT_ADAPTER.includes(adapterName)) {
      this.adapterName = adapterName;

      const getAdapter = this.interopRequire(`../../${adapterName}`);
      const adapter = await getAdapter(i18n);

      _.forEach(adapter, (config: IPanel, name) => {
        const project: IProject = _.clone(this);
        delete project.adapter;

        const Module = config.module;
        if (Module) {
          const adapterModule = new Module({ project, storage, i18n });
          const moduleName = name.toLowerCase();
          this.adapter[moduleName] = adapterModule;
        }

        this.panels.push({
          name,
          ..._.omit(config, 'module')
        });
      });

      this.initPanels();

      return this.toJSON();
    }

    return this.toJSON();
  }

  public async reloadAdapter(i18n: II18n) {
    const result = await this.loadAdapter(i18n);
    return result;
  }

  public async reloadAdapter(i18n: II18n) {
    const result = await this.loadAdapter(i18n);
    return result;
  }

  /**
   *  Get the panel of the current project from the cache and
   *  update the panel data according to the adapter.
   */
  private initPanels() {
    this.getPanels();
    this.savePanels();
  }

  private getPanels() {
    const panelSettings = storage.get('panelSettings');
    const projectPanelSettings = panelSettings.find(({ projectPath }) => projectPath === this.path);
    if (projectPanelSettings) {
      const { panels } = projectPanelSettings;

      panels.forEach(({ name: settingName, isAvailable }, index) => {
        const panel: any = this.panels.find(({ name }) => settingName === name);
        if (panel) {
          panel.isAvailable = isAvailable;
          panel.index = index;
        }
      });

      this.panels = _.orderBy(this.panels, 'index');
    }
  }

  private savePanels() {
    const panelSettings = storage.get('panelSettings');
    const projectPanelSettings = panelSettings.find(({ projectPath }) => projectPath === this.path);
    const panels = this.panels.map(({name, isAvailable}) => ({name, isAvailable}));

    if (projectPanelSettings) {
      projectPanelSettings.panels = panels;
    } else {
      panelSettings.push({
        projectPath: this.path,
        panels,
      });
    }

    storage.set('panelSettings', panelSettings);
  }

  public setPanel(params: {name: string; isAvailable: boolean; }): IPanel[] {
    const {name, isAvailable} = params;
    const panel = this.panels.find(({ name: settingName }) => settingName === name);
    if (panel) {
      panel.isAvailable = isAvailable;
      this.savePanels();
    }
    return this.panels;
  }

  public sortPanels(params: { oldIndex: number; newIndex: number; }): IPanel[] {
    const { oldIndex, newIndex } = params;
    this.panels = arrayMove(this.panels, oldIndex, newIndex);
    this.savePanels();
    return this.panels;
  }

  public toJSON() {
    const { name, path, panels, type, adapterName } = this;
    return {
      name,
      adapterName,
      path,
      type,
      panels,
    };
  }
}

interface ICreateParams {
  name: string;
  path: string;
  scaffold: IMaterialScaffold;
  forceCover?: boolean;
  appId?: string,
  changeId?: string,
}

class ProjectManager extends EventEmitter {
  private projects;
  private i18n: II18n;

  constructor(i18n: II18n) {
    super();
    this.i18n = i18n;
  }

  private async refresh(): Promise<Project[]> {
    return await Promise.all(
      storage.get('projects').map(async (projectPath) => {
        const project = new Project(projectPath);
        await project.loadAdapter(this.i18n);
        return project;
      })
    );
  }

  async ready() {
    await this.i18n.readLocales();
    this.projects = await this.refresh();
  }

  /**
   * Get all project
   */
  public getProjects(): Project[] {
    return this.projects;
  }

  /**
   * Get the project in the project list
   */
  public async getProject(path: string) {
    const project = this.projects.find(
      (currentItem) => currentItem.path === path
    );

    if (!project) {
      throw new Error('notfound project');
    }

    return project;
  }

  /**
   * Get current project
   */
  public async getCurrent() {
    const projectPath = storage.get('project');
    const project = await this.getProject(projectPath);
    return project;
  }

  /**
   * Add a project to project list
   */
  public async addProject(projectPath: string): Promise<void> {
    const projects = storage.get('projects');

    if (projects.indexOf(projectPath) === -1) {
      const project = new Project(projectPath);
      await project.loadAdapter(this.i18n);
      this.projects.push(project);
      projects.push(projectPath);
      storage.set('projects', projects);
    }

    storage.set('project', projectPath);
  }

  /**
   * Create folder for project
   */
  private async createProjectFolder(params: { path: string; forceCover?: boolean; }) {
    const { path: targetPath, forceCover } = params;

    if (!await pathExists(targetPath)) {
      await mkdirpAsync(targetPath);
    }

    // check read and write
    try {
      await accessAsync(targetPath, fs.constants.R_OK | fs.constants.W_OK); // tslint:disable-line
    } catch (error) {
      error.message = '当前路径没有读写权限，请更换项目路径';
      throw error;
    }

    // check folder files
    const files = await readdirAsync(targetPath);
    if (files.length) {
      const exited = await existsAsync(path.join(targetPath, packageJSONFilename));
      if (!exited) {
        if (!forceCover) {
          const error: any = new Error('当前文件夹不为空，不允许创建项目');
          error.code = 'HAS_FILES';
          throw error;
        }
      } else {
        const error: any = new Error('请导入该项目');
        error.code = 'LEGAL_PROJECT';
        throw error;
      }
    }
  }

  /**
   * Generate abc.json for alibaba user
   */
  private async generateAbcFile(projectDir: string, iceScriptsVersion: string) {
    // '^2.0.0' -> true
    const latestVersion = /^\^2\./.test(iceScriptsVersion);
  
    const abcData = {
      type: latestVersion ? 'ice-scripts' : 'iceworks',
      builder: latestVersion ? '@ali/builder-ice-scripts' : '@ali/builder-iceworks',
    };

    const abcJsonPath = path.join(projectDir, abcJSONFilename);
    await writeFileAsync(abcJsonPath, JSON.stringify(abcData, null, 2));
  }

  /**
   * Generate project
   */
  private async generateProject(params: ICreateParams) {
    const { path: targetPath, scaffold, name } = params;
    const tarballURL = await getTarballURLByMaterielSource(scaffold.source);
    await getAndExtractTarball(targetPath, tarballURL);

    await rimraf(path.join(targetPath, 'build'));

    // rewrite pakcage.json
    const packageJSONPath = path.join(targetPath, packageJSONFilename);
    const packageJSON: any = JSON.parse((await readFileAsync(packageJSONPath)).toString());

    delete packageJSON.files;
    delete packageJSON.publishConfig;
    if (packageJSON.buildConfig) {
      delete packageJSON.buildConfig.output;
      delete packageJSON.buildConfig.localization;
    }
    delete packageJSON.scaffoldConfig;
    delete packageJSON.homepage;
    delete packageJSON.scripts.screenshot;
    delete packageJSON.scripts.prepublishOnly;
    packageJSON.title = name;
    await writeFileAsync(packageJSONPath, `${JSON.stringify(packageJSON, null, 2)}\n`, 'utf-8');

    const isAlibaba = await checkAliInternal();
    if (isAlibaba ) {
      await this.generateAbcFile(targetPath, packageJSON.devDependencies['ice-scripts']);
    }
  }

  /**
   * Create a project by scaffold
   *
   * TODO create a project by custom scaffold
   */
  public async createProject(params: ICreateParams): Promise<void> {
    if (params.appId) {
      const generate = require('@ali/stark-biz-generator');
      generate({ appId: params.appId, changeId: params.changeId, targetDir: params.path })
    } else {
      await this.createProjectFolder(params);
      await this.generateProject(params);
      await this.addProject(params.path);
    }
  }

  /**
   * Delete a project in project list
   */
  public async deleteProject(params: { projectPath: string, deleteFiles?: boolean }): Promise<void> {
    const { projectPath, deleteFiles } = params;
    this.projects = this.projects.filter(({ path }) => path !== projectPath);
    const newProjects = storage.get('projects').filter((path) => path !== projectPath);
    storage.set('projects', newProjects);

    if (deleteFiles) {
      try {
        await trash(projectPath);
      } catch (error) {
        // TODO
      }
    }

    // reset project if deleted current project
    const currentProjectPath = storage.get('project');
    if (currentProjectPath === projectPath) {
      storage.set('project', newProjects[0] || '');
    }
  }

  /**
   * Set current project
   */
  public async setCurrent(path: string) {
    storage.set('project', path);
    const project = await this.getProject(path);
    return project;
  }
}

export default (app) => {
  app.beforeStart(async () => {
    app.projectManager = new ProjectManager(app.i18n);
    await app.projectManager.ready();
  });
};
