export default (app) => {
  return class BuildController extends app.Controller {
    /**
     * run start task
     */
    async start(ctx) {
      const { socket, logger } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      logger.info('start build');
      const response = await project.build.start();

      project.build.on('start.data', (data) => {
        socket.emit('project.build.start.data', data);
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

      logger.info('stop build');
      const response = await project.build.stop();

      project.build.on('stop.data', (data) => {
        socket.emit('project.build.stop.data', data);
      });

      return { status: response.status };
    }
  };
};
