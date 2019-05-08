export default (app) => {
  return class DevController extends app.Controller {
    async settings(ctx) {
      const { args, requestContext } = ctx;
      const callback = args[args.length - 1];
      const { projectFolderPath } = args[0];
      const devService = await requestContext.getAsync('devService');

      let data = [];
      let error;

      try {
        data = await devService.getDevSettings(projectFolderPath);
      } catch (error) {
        error = error;
      }

      callback({ error, data });
    }
  };
};
