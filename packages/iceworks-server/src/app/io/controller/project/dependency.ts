export default (app) => {
  return class DependencyController extends app.Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.dependency.getAll();
    }

    async reset(ctx) {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.dependency.reset(undefined, ctx);
    }

    async bulkCreate(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.dependency.bulkCreate(args, ctx);
    }

    async upgrade(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.dependency.upgrade(args, ctx);
    }
  };
};
