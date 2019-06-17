export default (app) => {
  return class MenuController extends app.Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.menu.getAll();
    }

    async bulkCreate(ctx) {
      const { args } = ctx;
      const { data, options } = args;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.menu.bulkCreate(data, options);
    }
  };
};
