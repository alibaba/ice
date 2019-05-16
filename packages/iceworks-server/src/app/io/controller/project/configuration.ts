export default (app) => {
  return class ConfigurationController extends app.Controller {
    async settings(ctx) {
      const { args } = ctx;
      const callback = args[args.length - 1];

      const { projectManager } = app;
      const project = projectManager.getCurrent();

      let data = [];
      let error;

      console.log(project.configuration);

      try {
        data = await project.configuration.getAll();
        console.log('=======>:', data);
      } catch (error) {
        error = error;
      }

      callback({ error, data });
    }
  };
};
