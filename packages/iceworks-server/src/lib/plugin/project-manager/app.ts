import * as EventEmitter from 'events';
import storage from '../../storage';
import Project from '../../adapter/project';
import getEnv from '../../getEnv';

class ProjectManager {
  private projects: Project[];

  private async refresh (): Promise<Project[]> {
    return await Promise.all(
      storage.get('projects').map(async (projectFolderPath) => {
        const project = new Project(projectFolderPath);
        return project;
      })
    );
  }

  async ready() {
    this.projects = await this.refresh();
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getProject(projectFolderPath: string): Project {
    const project = this.projects.find(
      ({ folderPath }) => folderPath === projectFolderPath
    );
    if (!project) {
      throw new Error('没有找到对应的项目');
    }

    return project;
  }

  getCurrent(): Project {
    const projectFolderPath = storage.get('project');
    return this.getProject(projectFolderPath);
  }

  setCurrent(projectFolderPath: string): Project {
    storage.set('project', projectFolderPath);
    return this.getProject(projectFolderPath);
  }

  async addProject(projectFolderPath: string): Promise<Project[]> {
    const projects = storage.get('projects');

    if (projects.indexOf(projectFolderPath) === -1) {
      projects.push(projectFolderPath);
      storage.set('projects', projects);
    }
    
    storage.set('project', projectFolderPath);
    this.projects = await this.refresh();

    return this.projects;
  }

  async deleteProject(projectFolderPath: string): Promise<Project[]> {
    const newProjects = storage.get('projects').filter((path) => path !== projectFolderPath);
    storage.set('projects', newProjects);

    const currentProjectFolderPath = storage.get('project');
    if (currentProjectFolderPath === projectFolderPath) {
      storage.set('project', newProjects[0] || '');
    }

    this.projects = await this.refresh();

    return this.projects;
  }

  async devStart(projectFolderPath: string): Promise<EventEmitter> {
    const project = this.getProject(projectFolderPath);
    return project.devStart(getEnv());
  }

  async devStop(projectFolderPath: string) {
    const project = this.getProject(projectFolderPath);
    return project.devStop();
  }

  async build() {}

  async lint() {}
}

export default (app) => {
  app.projectManager = new ProjectManager();
  app.beforeStart(async () => {
    await app.projectManager.ready();
  });
};
