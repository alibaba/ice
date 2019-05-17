export default (app) => {
  return class LayoutController extends app.Controller {
    async list(ctx) {
      const { args } = ctx;
      const callback = args[args.length - 1];
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      let layouts = [];
      let error;

      try {
        layouts = await project.layout.getAll();
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: layouts,
      });
    }
  };
};
