import * as EventEmitter from 'events';
import * as trash from 'trash';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as shellEnv from 'shell-env';
import * as pathKey from 'path-key';
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
const rimrafAsync = util.promisify(rimraf);

const packageJSONFilename = 'package.json';
const abcJSONFilename = 'abc.json';
const DEFAULT_TYPE = 'react';
const DEFAULT_ADAPTER = [
  'adapter-cra-v1',
  'adapter-react-v0',
  'adapter-react-v1',
  'adapter-react-v2',
  'adapter-react-v3',
  'adapter-vue-v1',
  'adapter-vue-v2',
];

interface ISimpleApp {
  logger: any;
  i18n: II18n;
}

class Project implements IProject {
  public readonly name: string;

  public readonly path: string;

  public readonly packagePath: string;

  public readonly type: string;

  public readonly language: string;

  public panels: IPanel[] = [];

  public adapter: {[name: string]: IBaseModule} = {};

  public adapterName: string;

  private app: ISimpleApp;

  constructor(folderPath: string, app: ISimpleApp) {
    this.name = path.basename(folderPath);
    this.path = folderPath;
    this.packagePath = path.join(this.path, packageJSONFilename);
    this.type = this.getType();
    this.language = this.getLanguage();
    this.app = app;
  }

  private getType(): string {
    const { iceworks = {} } = this.getPackageJSON();
    const { type = DEFAULT_TYPE } = iceworks;
    return type;
  }

  private getLanguage(): string {
    let language = 'js';
    if (fs.existsSync(path.join(this.path, 'tsconfig.json'))) {
      language = 'ts';
    }
    return language;
  }

  public getPackageJSON() {
    if (!fs.existsSync(this.packagePath)) {
      const error: any = new Error('Project\'s package.json file not found in local environment');
      throw error;
    }
    return JSON.parse(fs.readFileSync(this.packagePath).toString());
  }

  public setPackageJSON(content) {
    return fs.writeFileSync(this.packagePath, `${JSON.stringify(content, null, 2)}\n`, 'utf-8');
  }

  public getEnv() {
    const PATH = pathKey();

    const env = process.env;
    const shellEnvPath = shellEnv.sync().PATH;
    const shellEnvPathArr = (typeof shellEnvPath === 'string') ? shellEnvPath.split(path.delimiter) : [];
    shellEnvPathArr.unshift(path.join(this.path, 'node_modules', '.bin'));

    this.app.logger.info('env.pah:', env[PATH]);

    // for electron fallback
    const resourcesPath = process['resourcesPath']; // eslint-disable-line
    if (resourcesPath) {
      shellEnvPathArr.push(path.join(resourcesPath, 'bin'));
    }

    env[PATH] = shellEnvPathArr.join(path.delimiter);

    this.app.logger.info('setEnv.pah:', env[PATH]);

    // reset NODE_ENV
    // in egg.js: Generally, before deploying the application, dependencies will be installed with NODE_ENV=production or --production
    // which will exclude devDependencies because those used in development may increase the size of package released or even create pitfalls that you never expect.
    // Refs: https://github.com/eggjs/egg-scripts/blob/master/lib/cmd/start.js#L109
    env.NODE_ENV = 'development';

    return env;
  }

  private interopRequire(id) {
    let mod;
    try {
      mod = require(id); // eslint-disable-line
    } catch (error) {
      throw error;
    }

    return mod && mod.__esModule ? mod.default : mod; // eslint-disable-line
  }

  public async loadAdapter() {
    const i18n = this.app.i18n;
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
          ..._.omit(config, 'module'),
        });
      });

      this.initPanels();
    }

    return this.toJSON();
  }

  public async reloadAdapter() {
    const result = await this.loadAdapter();
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

  public setPanel(params: {name: string; isAvailable: boolean }): IPanel[] {
    const {name, isAvailable} = params;
    const panel = this.panels.find(({ name: settingName }) => settingName === name);
    if (panel) {
      panel.isAvailable = isAvailable;
      this.savePanels();
    }
    return this.panels;
  }

  public sortPanels(params: { oldIndex: number; newIndex: number }): IPanel[] {
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
  appId?: string;
  changeId?: string;
}

class ProjectManager extends EventEmitter {
  private projects = [];

  private app: ISimpleApp;

  constructor(app: ISimpleApp) {
    super();
    this.app = app;
  }

  private async refresh() {
    const projects = storage.get('projects').map(projectPath => {
      if (fs.existsSync(projectPath) && fs.existsSync(`${projectPath}/package.json`)) {
        return { projectPath, exists: true };
      }
      return { projectPath, exists: false };
    });
    this.projects = await this.createProjects(projects.filter(({ exists }) => exists));
    // Delete projects that do not exist in local environment
    projects.forEach(({ projectPath, exists }) => {
      if (!exists) {
        this.deleteProject({ projectPath, deleteFiles: false });
      }
    });
  }

  private async createProjects(projects: []): Promise<Project[]> {
    return await Promise.all(
      projects.map(async ({ projectPath }) => {
        const project = new Project(projectPath, this.app);
        await project.loadAdapter();
        return project;
      })
    );
  }

  public async ready() {
    await this.app.i18n.readLocales();
    this.refresh();
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

    if (project) {
      return project;
    }
  }

  /**
   * Get current project
   */
  public async getCurrent() {
    const projectPath = storage.get('project');
    if (!fs.existsSync(projectPath)) {
      const error: any = new Error('Project not found in local environment');
      throw error;
    }
    const project = await this.getProject(projectPath);
    return project;
  }

  /**
   * Add a project to project list
   */
  public async addProject(projectPath: string): Promise<void> {
    const projects = storage.get('projects');

    if (projects.indexOf(projectPath) === -1) {
      const project = new Project(projectPath, this.app);
      await project.loadAdapter();
      this.projects.push(project);
      projects.push(projectPath);
      storage.set('projects', projects);
    }

    storage.set('project', projectPath);
  }

  /**
   * Create folder for project
   */
  private async createProjectFolder(params: { path: string; forceCover?: boolean }) {
    const { path: targetPath, forceCover } = params;

    if (!await pathExists(targetPath)) {
      await mkdirpAsync(targetPath);
    }

    // check read and write
    try {
      await accessAsync(targetPath, fs.constants.R_OK | fs.constants.W_OK); // eslint-disable-line
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
    const { path: targetPath, scaffold } = params;
    const tarballURL = await getTarballURLByMaterielSource(scaffold.source);
    await getAndExtractTarball(targetPath, tarballURL);
  }

  /**
   * Format project
   */
  private async formatProject(params: ICreateParams) {
    const { path: targetPath, name } = params;
    await rimrafAsync(path.join(targetPath, 'build'));

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
    if (isAlibaba) {
      await this.generateAbcFile(targetPath, packageJSON.devDependencies['ice-scripts']);
    }
  }

  /**
   * Create a project by scaffold
   *
   * TODO create a project by custom scaffold
   */
  public async createProject(params: ICreateParams): Promise<void> {
    const { appId, changeId, path: targetPath } = params;
    await this.createProjectFolder(params);

    if (appId) {
      const generate = require('@ali/stark-biz-generator');  // eslint-disable-line
      await generate({ appId, changeId, targetDir: targetPath });

    } else {
      await this.generateProject(params);
    }

    await this.formatProject(params);
    await this.addProject(targetPath);
  }

  /**
   * Delete a project in project list
   */
  public async deleteProject(params: { projectPath: string; deleteFiles?: boolean }): Promise<void> {
    const { projectPath, deleteFiles } = params;
    this.projects = this.projects.filter(({ path }) => path !== projectPath);

    // remove project at storage
    const newProjects = storage.get('projects').filter((path) => path !== projectPath);
    storage.set('projects', newProjects);

    // remove project panel settings
    const newPanelSettings = storage.get('panelSettings').filter(({projectPath: project}) => project !== projectPath);
    storage.set('panelSettings', newPanelSettings);

    // delete project files
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
    app.projectManager = new ProjectManager({ i18n: app.i18n, logger: app.logger });
    await app.projectManager.ready();
  });
};
