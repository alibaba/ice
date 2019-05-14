export default (app) => {
  return class ConfigurationController extends app.Controller {
    async settings(ctx) {
      const { args, requestContext } = ctx;
      const callback = args[args.length - 1];
      const { projectFolderPath } = args[0];
      const configurationService = await requestContext.getAsync(
        'configurationService'
      );

      let data = [];
      let error;

      try {
        data = await configurationService.settings(projectFolderPath);
      } catch (error) {
        error = error;
      }

      callback({ error, data });
    }
  };
};
