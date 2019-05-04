import * as EventEmitter from 'events';
import storage from '../../storage';
import Project from '../../adapter/project';
import getEnv from '../../getEnv';

class ProjectsClient {
  private projects: Project[];

  async ready() {
    const projectFolderPaths = storage.get('projects');
    this.projects = await Promise.all(projectFolderPaths.map(async (projectFolderPath) => {
      const project = new Project(projectFolderPath);
      return project;
    }));
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getProject(projectFolderPath: string): Project {
    return this.projects.find(({ folderPath }) => folderPath === projectFolderPath);
  }

  getCurrent(): Project {
    const projectFolderPath = storage.get('currentProject');
    return this.getProject(projectFolderPath);
  }

  setCurrent(projectFolderPath: string): Project {
    storage.set('currentProject', projectFolderPath);
    return this.getProject(projectFolderPath);
  }

  async devStart(projectFolderPath: string): Promise<EventEmitter> {
    const project = this.getProject(projectFolderPath);
    return await project.startDev(getEnv());
  }

  async devStop() {

  }

  async build() {}

  async lint() {}
}

export default app => {
  app.projectClient = new ProjectsClient();
  app.beforeStart(async () => {
    await app.projectClient.ready();
  });
};