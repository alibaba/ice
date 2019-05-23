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
      const response = await project.dev.start();

      project.dev.on('start.data', (data) => {
        socket.emit('project.dev.start.data', data);
      });

      return { status: response.status };
    }

    /**
     * run stop task
     */
    async stop(ctx) {
      const { socket, logger } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      logger.info('stop dev server');
      const response = await project.dev.stop();

      project.dev.on('stop.data', (data) => {
        socket.emit('project.dev.stop.data', data);
      });

      return { status: response.status };
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
