export default (app) => {
  return class ConfigurationController extends app.Controller {
    async getCLIConf() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.configuration.getCLIConf();
    }
  };
};
