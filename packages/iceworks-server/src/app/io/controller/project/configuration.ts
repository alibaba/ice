export default (app) => {
  return class ConfigurationController extends app.Controller {
    async getCLIConf() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.configuration.getCLIConf();
    }

    async setCLIConf(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      const response = await project.configuration.setCLIConf(args);
      return { success: response };
    }
  };
};
