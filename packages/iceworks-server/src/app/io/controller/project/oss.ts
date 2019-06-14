export default (app) => {
  return class OSSController extends app.Controller {
    async getConfig() {
      const { projectManager } = app;
      const currentProject = projectManager.getCurrent();
      return await currentProject.oss.getConfig();
    }
    async setConfig(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const currentProject = projectManager.getCurrent();
      return await currentProject.oss.setConfig(args);
    }
    async upload() {
      const { projectManager } = app;
      const currentProject = projectManager.getCurrent();
      return await currentProject.oss.upload();
    }
    async getBuckets() {
      const { projectManager } = app;
      const currentProject = projectManager.getCurrent();
      return await currentProject.oss.getBuckets();
    }
  };
};
