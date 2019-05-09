import * as EventEmitter from 'events';
import storage from '../../storage';
import Project from '../../adapter/project';
import getEnv from '../../getEnv';

class ProjectManager {
  private projects: Project[];

  async ready() {
    const projectPaths = storage.get('projects');
    this.projects = await Promise.all(
      projectPaths.map(async (projectPath) => {
        const project = new Project(projectPath);
        return project;
      })
    );
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getProject(projectPath: string): Project {
    const project = this.projects.find(
      ({ folderPath }) => folderPath === projectPath
    );

    if (!project) {
      throw new Error('没有找到对应的项目');
    }

    return project;
  }

  getCurrent(): Project {
    const projectPath = storage.get('project');
    return this.getProject(projectPath);
  }

  setCurrent(projectPath: string): Project {
    storage.set('project', projectPath);
    return this.getProject(projectPath);
  }

  async devStart(projectPath: string): Promise<EventEmitter> {
    const project = this.getProject(projectPath);
    return project.devStart(getEnv());
  }

  async devStop(projectPath: string) {
    const project = this.getProject(projectPath);
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
