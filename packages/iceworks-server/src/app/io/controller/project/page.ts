export default (app) => {
  const { Controller } = app;

  return class PageController extends Controller {
    async list() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.page.getAll();
    }

    async delete({ args }) {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      await project.page.delete(args);
    }

    async create(ctx) {
      const { args, socket } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      project.page.on('create.status', (data) => {
        socket.emit('project.page.create.status', data);
      });
      await project.page.create(args);
    }
  };
};
