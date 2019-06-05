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

      project.dependency.on('reset.data', (data) => {
        socket.emit('project.dependency.reset.data', data);
      });

      project.dependency.on('reset.exit', (code) => {
        socket.emit('project.dependency.reset.exit', code);
      });

      return await project.dependency.reset();
    }

    async bulkCreate(ctx) {
      const { socket, args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      project.dependency.on('install.data', (data) => {
        socket.emit('project.dependency.install.data', data);
      });

      project.dependency.on('install.exit', (code) => {
        socket.emit('project.dependency.install.exit', code);
      });

      return await project.dependency.bulkCreate(args);
    }

    async upgrade(ctx) {
      const { socket, args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      project.dependency.on('upgrade.data', (data) => {
        socket.emit('project.dependency.upgrade.data', data);
      });

      project.dependency.on('upgrade.exit', (code) => {
        socket.emit('project.dependency.upgrade.exit', code);
      });

      return await project.dependency.upgrade(args);
    }
  };
};
