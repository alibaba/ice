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
    async setRemote({ args }) {
      const { remoteUrl } = args;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.setRemote(remoteUrl);
    }
    async checkoutLocalBranch({ args }) {
      const { name } = args;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.checkoutLocalBranch(name);
    }
    async switchBranch({ args }) {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.switchBranch(args);
    }
    async getBranches() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.getBranches();
    }
    async pull({ args }) {
      const { branch } = args;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.pull(branch);
    }
    async push({ args }) {
      const { branch } = args;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.push(branch);
    }
  };
};
