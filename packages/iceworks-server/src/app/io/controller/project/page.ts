export default (app) => {
  const { Controller } = app;

  return class PageController extends Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.page.getAll();
    }

    async delete({ args }) {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      await project.page.delete(args);
    }

    async create(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      await project.page.create(args, ctx);
    }
  };
};
