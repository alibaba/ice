export default (app) => {
  return class RouterController extends app.Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.router.getAll();
    }

    async setData(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.router.setData(args);
    }

    async create(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.router.create(args);
    }
  };
};
