export default (app) => {
  return class DependencyController extends app.Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.dependency.getAll();
    }
  };
};
