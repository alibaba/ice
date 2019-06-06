export default (app) => {
  return class GitController extends app.Controller {
    async status() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.getStatus();
    }
    async init({ args }) {
      const { remoteUrl } = args;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.init(remoteUrl);
    }
  };
};
