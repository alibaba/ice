import * as EventEmitter from 'events';
import storage from '../../storage';
import loadAdapter from '../../loadAdapter';

class ProjectManager extends EventEmitter {
  private projects;

  public name: string;

  public path: string;

  async ready() {
    const projects = storage.get('projects');
    this.projects = await Promise.all(
      projects.map(async (project) => {
        const { name, path } = project;
        this.name = name;
        this.path = path;
        return {
          name,
          path,
          ...loadAdapter(this),
        };
      })
    );
  }

  /**
   * Get all project
   */
  getProjects() {
    return this.projects;
  }

  /**
   * Get the project in the project list
   */
  getProject(path: string) {
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
  getCurrent() {
    const projectInfo = storage.get('project');
    return this.getProject(projectInfo.path);
  }

  /**
   * Set current project
   */
  setCurrent(path: string) {
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
