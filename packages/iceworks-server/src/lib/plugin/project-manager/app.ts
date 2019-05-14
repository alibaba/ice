import storage from '../../storage';
import loadAdapter from '../../loadAdapter';

class ProjectManager {
  private projects;

  async ready() {
    const projectPaths = storage.get('projects');
    console.log('projectPaths:', projectPaths);
    this.projects = await Promise.all(
      projectPaths.map(async (projectPath) => {
        const project = loadAdapter({ path: projectPath });
        return project;
      })
    );
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectPath: string) {
    const project = this.projects.find(
      ({ project }) => project.folderPath === projectPath
    );

    console.log();
    console.log('projectInfo:', project);
    console.log();

    if (!project) {
      throw new Error('没有找到对应的项目');
    }

    return project;
  }

  getCurrent() {
    const projectPath = storage.get('project');
    return this.getProject(projectPath);
  }

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
