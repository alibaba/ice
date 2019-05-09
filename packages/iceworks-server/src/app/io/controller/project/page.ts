export default (app) => {
  const { Controller } = app;

  return class PageController extends Controller {
    async list(ctx) {
      const { args } = ctx;
      const { projectPath } = args[0];
      const callback = args[args.length - 1];

      let pages = [];
      let error;
      const pageService = await ctx.requestContext.getAsync('pageService');

      try {
        pages = await pageService.getAll(projectPath);
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: pages,
      });
    }
  };
};
