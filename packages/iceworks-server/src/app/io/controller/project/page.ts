export default (app) => {
  const { Controller } = app;

  return class PageController extends Controller {
    async list(ctx) {
      const { args } = ctx;
      const callback = args[args.length - 1];

      let pages = [];
      let error;
      const pageService = await ctx.requestContext.getAsync('pageService');

      try {
        pages = await pageService.getAll();
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
