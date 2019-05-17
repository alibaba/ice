export default (app) => {
  const { Controller } = app;

  return class PageController extends Controller {
    async list(ctx) {
      const { args } = ctx;
      const callback = args[args.length - 1];
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      let pages = [];
      let error;

      try {
        pages = await project.page.getAll();
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: pages,
      });
    }

    async delete(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const pageName = args[0];
      const callback = args[args.length - 1];
      const project = projectManager.getCurrent();

      let error;
      try {
        await project.page.delete(pageName);
      } catch (err) {
        error = err;
      }

      callback({
        error,
      });
    }
  };
};
