export default (app) => {
  return class DependencyController extends app.Controller {
    async list(ctx) {
      const { args } = ctx;
      const { projectPath } = args[0];
      const callback = args[args.length - 1];

      let dependencies = [];
      let error;
      const dependencyService = await ctx.requestContext.getAsync(
        'dependencyService'
      );

      try {
        dependencies = await dependencyService.getAll(projectPath);
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
