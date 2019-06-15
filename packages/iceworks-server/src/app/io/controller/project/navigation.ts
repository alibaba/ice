export default (app) => {
  return class NavigationController extends app.Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.navigation.getAll();
    }

    async setData(ctx) {
      const { args } = ctx;
      const { type, data } = args;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.navigation.setData(type, data);
    }

    async create(ctx) {
      const { args } = ctx;
      const { type, data } = args;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.navigation.create(type, data);
    }
  };
};
