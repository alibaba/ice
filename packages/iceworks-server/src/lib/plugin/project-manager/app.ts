import * as EventEmitter from 'events';
import storage from '../../storage';
import Project from '../../adapter/project';
import getEnv from '../../getEnv';

class ProjectManager {
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
    const project = this.projects.find(({ folderPath }) => folderPath === projectFolderPath);
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

export default app => {
  app.projectManager = new ProjectManager();
  app.beforeStart(async () => {
    await app.projectManager.ready();
  });
};
