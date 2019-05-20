export default (app) => {
  return class DevController extends app.Controller {
    /**
     * run start task
     */
    async start(ctx) {
      const { socket, logger } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      logger.info('启动调试服务');

      project.dev.on('data', (data) => {
        logger.info('调试服务日志', data);
        socket.emit('project.index.dev.data', data);
      });

      const result = await project.dev.start();

      logger.info('调试服务启动成功:', result);

      return result;
    }

    /**
     * run stop task
     */
    async stop() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();

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
