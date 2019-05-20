export default (app) => {
  const { Controller } = app;

  return class PageController extends Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.page.getAll();
    }
  };
};
