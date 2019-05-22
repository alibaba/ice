export default (app) => {
  return class DependencyController extends app.Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.dependency.getAll();
    }

    async reset(ctx) {
      const { socket } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      project.dependency.on('data', (data) => {
        socket.emit('project.dependency.data', data);
      });

      project.dependency.on('exit', (code) => {
        socket.emit('project.dependency.exit', code);
      });

      return await project.dependency.reset();
    }
  };
};
