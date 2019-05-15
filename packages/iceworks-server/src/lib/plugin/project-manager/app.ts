import * as EventEmitter from 'events';
import storage from '../../storage';
import loadAdapter from '../../loadAdapter';

class ProjectManager extends EventEmitter {
  private projects;

  public projectName: string;

  public projectPath: string;

  async ready() {
    const projects = storage.get('projects');
    this.projects = await Promise.all(
      projects.map(async (project) => {
        const { projectName, projectPath } = project;
        this.projectName = projectName;
        this.projectPath = projectPath;
        return {
          projectName,
          projectPath,
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
  getProject(projectPath: string) {
    const project = this.projects.find(
      (currentItem) => currentItem.projectPath === projectPath
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
    return this.getProject(projectInfo.projectPath);
  }

  /**
   * Set current project
   */
  setCurrent(projectPath: string) {
    storage.set('project', projectPath);
    return this.getProject(projectPath);
  }
}

export default (app) => {
  app.projectManager = new ProjectManager();
  app.beforeStart(async () => {
    await app.projectManager.ready();
  });
};
