export default (app) => {
  return class RouterController extends app.Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.router.getAll();
    }

    async bulkCreate(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const { data, options } = args;
      const project = projectManager.getCurrent();
      return await project.router.bulkCreate(data, options);
    }
  };
};
