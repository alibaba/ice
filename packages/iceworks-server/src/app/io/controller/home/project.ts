export default (app) => {
  const { Controller } = app;

  return class ProjectController extends Controller {
    public async list() {
      const { projectManager } = app;
      const projects = await projectManager.getProjects();
      return projects.map((project) => project.toJSON());
    }

    public async create(ctx) {
      const { projectManager } = app;
      const { args } = ctx;

      await projectManager.createProject(args);
    }

    public async delete(ctx) {
      const { projectManager } = app;
      const { args } = ctx;

      await projectManager.deleteProject(args);
    }

    public async add(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const { projectPath } = args;
      await projectManager.addProject(projectPath);
    }

    public async getCurrent() {
      const { projectManager } = app;
      const project = await projectManager.getCurrent();

      return project.toJSON();
    }

    public async setCurrent(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const { path } = args;

      const project = await projectManager.setCurrent(path);
      return project.toJSON();
    }

    public async setPanel(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = await projectManager.getCurrent();
      return project.setPanel(args);
    }

    public async sortPanels(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = await projectManager.getCurrent();
      return project.sortPanels(args);
    }

    public async reloadAdapter() {
      const { projectManager } = app;
      const project = await projectManager.getCurrent();
      const result = await project.reloadAdapter();
      return result;
    }
  };
};
