export default (app) => {
  return class LayoutController extends app.Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.layout.getAll();
    }
  };
};
