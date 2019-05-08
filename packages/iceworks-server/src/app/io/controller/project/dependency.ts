export default (app) => {
  return class DependencyController extends app.Controller {
    async list(ctx) {
      const { args } = ctx;
      const { projectFolderPath } = args[0];
      const callback = args[args.length - 1];

      let dependencies = [];
      let error;
      const dependencyService = await ctx.requestContext.getAsync('dependencyService');

      try {
        dependencies = await dependencyService.getAll(projectFolderPath);
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: dependencies
      });
    }
  };
};
