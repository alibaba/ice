import * as EventEmitter from 'events';
import * as trash from 'trash';
import * as path from 'path';
import * as fs from 'fs';
import * as npmRunPath from 'npm-run-path';
import * as os from 'os';
import * as clone from 'lodash.clone';
import camelCase from 'camelCase';
import storage from '../../storage';
import * as adapter from '../../adapter';
import { IProject } from '../../../interface';

const isWin = os.type() === 'Windows_NT';

// const settings = require('./services/settings');
// settings.get('registry')
const registry = 'https://registry.npm.taobao.org';

class Project implements IProject {
  public readonly name: string;

  public readonly path: string;

  private readonly packageJSONFilename = 'package.json';

  constructor(folderPath: string) {
    this.name = path.basename(folderPath);
    this.path = folderPath;

    this.loadAdapter();
  }

  public getPackageJSON() {
    const pakcagePath = path.join(this.path, this.packageJSONFilename);
    return JSON.parse(fs.readFileSync(pakcagePath).toString());
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
    const adapterModuleKeys = Object.keys(adapter);
    for (const [key, Module] of Object.entries(adapter)) {

      let project: IProject = clone(this);
      for (const moduleKey of adapterModuleKeys) {
        if (project[moduleKey]) {
          delete project[moduleKey];
        }
      }

      this[camelCase(key)] = new Module(project);
    }
  }
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

  async addProject(projectPath: string): Promise<Project[]> {
    const projects = storage.get('projects');

    if (projects.indexOf(projectPath) === -1) {
      projects.push(projectPath);
      storage.set('projects', projects);
    }

    storage.set('project', projectPath);
    this.projects = await this.refresh();

    return this.projects;
  }

  async deleteProject(params: { projectPath: string, deleteFiles?: boolean }): Promise<Project[]> {
    const { projectPath, deleteFiles } = params;
    const newProjects = storage.get('projects').filter((path) => path !== projectPath);
    storage.set('projects', newProjects);

    if (deleteFiles) {
      await trash(projectPath);
    }

    // reset project if deleted current project
    const currentProjectPath = storage.get('project');
    if (currentProjectPath === projectPath) {
      storage.set('project', newProjects[0] || '');
    }

    this.projects = await this.refresh();

    return this.projects;
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
