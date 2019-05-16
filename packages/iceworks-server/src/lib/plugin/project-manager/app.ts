import * as EventEmitter from 'events';
import * as path from 'path';
import camelCase from 'camelCase';
import storage from '../../storage';
import * as adapter from '../../adapter';
import { IProject } from '../../../interface';

class Project implements IProject {
  public readonly name: string;

  public readonly path: string;

  constructor(folderPath: string) {
    this.name = path.basename(folderPath);
    this.path = folderPath;
  }
}

class ProjectManager extends EventEmitter {
  private projects;

  async ready() {
    const projects = storage.get('projects');
    this.projects = await Promise.all(
      projects.map(async (projectFolderPath) => {
        const project = new Project(projectFolderPath);
        return this.connectAdapter(project);
      })
    );
  }

  /**
   * @param project the current project information
   */
  private connectAdapter(project: Project) {
    for (const [key, Module] of Object.entries(adapter)) {
      project[camelCase(key)] = new Module(project);
    }

    return project;
  }

  /**
   * Get all project
   */
  public getProjects() {
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
    const projectInfo = storage.get('project');
    return this.getProject(projectInfo.path);
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
