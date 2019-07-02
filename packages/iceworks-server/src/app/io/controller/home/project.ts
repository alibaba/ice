export default (app) => {
  const { Controller } = app;

  return class ProjectController extends Controller {
    async list() {
      const { projectManager } = app;
      const projects = await projectManager.getProjects();
      return projects.map((project) => project.toJSON());
    }

    async create(ctx) {
      const { projectManager } = app;
      const { args } = ctx;

      await projectManager.createProject(args);
    }

    async delete(ctx) {
      const { projectManager } = app;
      const { args } = ctx;

      await projectManager.deleteProject(args);
    }

    async add(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const { projectPath } = args;
      await projectManager.addProject(projectPath);
    }

    async getCurrent() {
      const { projectManager } = app;
      const project = await projectManager.getCurrent();

      return project.toJSON();
    }

    async setCurrent(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const { path } = args;

      const project = await projectManager.setCurrent(path);
      return project.toJSON();
    }

    async setPanel(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = await projectManager.getCurrent();
      return project.setPanel(args);
    }

    async sortPanels(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = await projectManager.getCurrent();
      return project.sortPanels(args);
    }
  };
};
