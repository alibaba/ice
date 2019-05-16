export default (app) => {
  return class DependencyController extends app.Controller {
    async list(ctx) {
      const { args } = ctx;
      const callback = args[args.length - 1];
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      let dependencies = [];
      let error;

      try {
        dependencies = await project.dependency.getAll();
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: dependencies,
      });
    }
  };
};
