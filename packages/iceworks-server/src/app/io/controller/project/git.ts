export default (app) => {
  return class GitController extends app.Controller {
    async getStatus() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.getStatus();
    }
    async init({ args }) {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.init(args);
    }
    async setRemote({ args }) {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.setRemote(args);
    }
    async checkoutLocalBranch({ args }) {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.checkoutLocalBranch(args);
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
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.pull(args);
    }
    async push({ args }) {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.push(args);
    }
    async addAndCommit({ args }) {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.addAndCommit(args);
    }
    async getLog({ args }) {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.git.getLog(args);
    }
  };
};
