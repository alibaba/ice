export default (app) => {
  return class DevController extends app.Controller {
    /**
     * run start task
     */
    async start(ctx) {
      const { socket, logger } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      logger.info('start dev server');

      project.dev.on('start.data', (data) => {
        socket.emit('project.index.start.data', data);
      });

      return await project.dev.start();
    }

    /**
     * run stop task
     */
    async stop(ctx) {
      const { socket, logger } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      logger.info('stop dev server');

      project.dev.on('stop.data', (data) => {
        socket.emit('project.index.stop.data', data);
      });

      return await project.dev.stop();
    }

    /**
     * dev settings
     */
    async settings() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.dev.getSettings();
    }
  };
};
