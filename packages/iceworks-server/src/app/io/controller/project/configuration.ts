export default (app) => {
  return class ConfigurationController extends app.Controller {
    async settings() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.configuration.getAll();
    }
  };
};
