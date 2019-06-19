import * as EventEmitter from 'events';
import * as trash from 'trash';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as npmRunPath from 'npm-run-path';
import * as os from 'os';
import * as mv from 'mv';
import * as clone from 'lodash.clone';
import * as mkdirp from 'mkdirp';
import * as pathExists from 'path-exists';
import * as orderBy from 'lodash.orderby';
import * as arrayMove from 'array-move';
import camelCase from 'camelCase';
import storage from '../../storage';
import * as adapter from '../../adapter';
import { IProject, IMaterialScaffold, IPanel, IBaseModule } from '../../../interface';
import getTarballURLByMaterielSource from '../../getTarballURLByMaterielSource';
import downloadAndExtractPackage from '../../downloadAndExtractPackage';

const mkdirpAsync = util.promisify(mkdirp);
const accessAsync = util.promisify(fs.access);
const readdirAsync = util.promisify(fs.readdir);
const existsAsync = util.promisify(fs.exists);
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const mvAsync = util.promisify(mv);

const isWin = os.type() === 'Windows_NT';

// const settings = require('./services/settings');
// settings.get('registry')
const registry = 'https://registry.npm.taobao.org';

const packageJSONFilename = 'package.json';
const abcJSONFilename = 'abc.json';
const DEFAULT_TYPE = 'react';

class Project implements IProject {
  public readonly name: string;

  public readonly path: string;

  public readonly packagePath: string;

  public readonly type: string;

  public panels: IPanel[] = [];

  public adapter: {[name: string]: IBaseModule} = {};

  constructor(folderPath: string) {
    this.name = path.basename(folderPath);
    this.path = folderPath;
    this.packagePath = path.join(this.path, packageJSONFilename);
    this.type = this.getType();

    this.loadAdapter();
    this.assemblePanels();
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
    // https://github.com/sindresorhus/npm-run-path
    // Returns the augmented process.env object.
    const npmEnv = npmRunPath.env();

    // Merge process.env、npmEnv and custom environment variables
    const env = Object.assign({}, process.env, npmEnv, {
      // eslint-disable-next-line
      npm_config_registry: registry,
      // eslint-disable-next-line
      yarn_registry: registry,
      CLICOLOR: 1,
      FORCE_COLOR: 1,
      COLORTERM: 'truecolor',
      TERM: 'xterm-256color',
      ICEWORKS_IPC: 'yes',
    });

    const pathEnv = [process.env.PATH, npmEnv.PATH].filter(
      (p) => !!p
    );

    if (isWin) {
      // do something
    } else {
      pathEnv.push('/usr/local/bin');
      env.PATH = pathEnv.join(path.delimiter);
    }

    return env;
  }

  private loadAdapter() {
    for (const [name, Module] of Object.entries(adapter)) {
      const project: IProject = clone(this);
      delete project.adapter;

      const adapterModule = new Module({ project, storage });
      this.adapter[camelCase(name)] = adapterModule;

      const {title, description, cover} = adapterModule;
      this.panels.push({
        name,
        title,
        description,
        cover,
        isAvailable: true,
      });
    }
  }

  private assemblePanels() {
    this.resetPanelsByStore();
    this.savePanelsToStore();
  }

  private resetPanelsByStore() {
    const panelSettings = storage.get('panelSettings');
    const projectPanelSettings = panelSettings.find(({ project }) => project === this.path);
    
    if (projectPanelSettings) {
      const { panels } = projectPanelSettings;

      panels.forEach(({ name: settingName, isAvailable }, index) => {
        const panel: any = this.panels.find(({ name }) => settingName === name);
        if (panel) {
          panel.isAvailable = isAvailable;
          panel.index = index;
        }
      });

      this.panels = orderBy(this.panels, 'index');
    }
  }

  private savePanelsToStore() {
    const panelSettings = storage.get('panelSettings');
    const projectPanelSettings = panelSettings.find(({ project }) => project === this.path);
    const panels = this.panels.map(({name, isAvailable}) => ({name, isAvailable}));
    
    if (projectPanelSettings) {
      projectPanelSettings.panels = panels;
    } else {
      panelSettings.push({
        project: this.path,
        panels,
      });
    }

    storage.set('panelSettings', panelSettings);
  }

  public setPanel(params: {name: string; isAvailable: boolean;}): IPanel[] {
    const {name, isAvailable} = params;
    const panel = this.panels.find(({ name: settingName }) => settingName === name);
    if (panel) {
      panel.isAvailable = isAvailable;
      this.savePanelsToStore();
    }
    return this.panels;
  }

  public sortPanel(params: { oldIndex: number; newIndex: number; }): IPanel[] {
    const { oldIndex, newIndex } = params;
    this.panels = arrayMove(this.panels, oldIndex, newIndex);
    this.savePanelsToStore();
    return this.panels;
  }

  public toJSON() {
    const { name, path, panels } = this;
    return {
      name,
      path,
      panels,
    };
  }
}

interface ICreateParams {
  name: string;
  path: string;
  scaffold: IMaterialScaffold;
  forceCover?: boolean;
}

class ProjectManager extends EventEmitter {
  private projects;

  private async refresh(): Promise<Project[]> {
    return Promise.all(
      storage.get('projects').map(async (projectPath) => {
        return new Project(projectPath);
      })
    );
  }

  async ready() {
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
  public getProject(path: string) {
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
  public getCurrent() {
    const projectPath = storage.get('project');
    return this.getProject(projectPath);
  }

  /**
   * Add a project to project list
   */
  public async addProject(projectPath: string): Promise<void> {
    const projects = storage.get('projects');

    if (projects.indexOf(projectPath) === -1) {
      this.projects.push(new Project(projectPath));
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
      await accessAsync(targetPath, fs.constants.R_OK | fs.constants.W_OK);
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
   * generate project
   */
  private async generateProject(params: ICreateParams) {
    const { path: targetPath, scaffold, name } = params;
    const tarballURL = await getTarballURLByMaterielSource(scaffold.source);
    await downloadAndExtractPackage(targetPath, tarballURL);

    // rewrite pakcage.json
    const packageJSONPath = path.join(targetPath, packageJSONFilename);
    const packageJSON: any = JSON.parse((await readFileAsync(packageJSONPath)).toString());
    packageJSON.title = name;
    packageJSON.version = '1.0.0';
    delete packageJSON.homepage;
    await writeFileAsync(packageJSONPath, `${JSON.stringify(packageJSON, null, 2)}\n`, 'utf-8');

    // generate abc.json for alibaba user
    // TODO get information from App
    const isAlibaba = false;
    const abcJsonPath = path.join(targetPath, abcJSONFilename);
    if (isAlibaba && !await pathExists(abcJsonPath)) {
      await writeFileAsync(
        abcJsonPath,
        JSON.stringify({ name, type: 'iceworks', builder: '@ali/builder-iceworks' }, null, 2)
      );
    }

    //replace _gitignore to .gitignore
    const gitignoreFilename = 'gitignore';
    await mvAsync(path.join(targetPath, `_${gitignoreFilename}`), path.join(targetPath, `.${gitignoreFilename}`));
  }

  /**
   * Create a project by scaffold
   *
   * TODO create a project by custom scaffold
   */
  public async createProject(params: ICreateParams): Promise<void> {
    await this.createProjectFolder(params);
    await this.generateProject(params);
    await this.addProject(params.path);
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
  public setCurrent(path: string) {
    storage.set('project', path);
    return this.getProject(path);
  }
}

export default (app) => {
  app.projectManager = new ProjectManager();
  app.beforeStart(async () => {
    await app.projectManager.ready();
  });
};
