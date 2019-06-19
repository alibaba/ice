export default (app) => {
  return class TodoController extends app.Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.todo.getList();
    }
  };
};
