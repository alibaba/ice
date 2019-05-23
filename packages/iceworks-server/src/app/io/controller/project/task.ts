export default (app) => {
  return class TaskController extends app.Controller {
    /**
     * run start task
     */
    async start(ctx) {
      const { socket, logger } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      logger.info('start task');
      const response = await project.task.start();

      project.task.on('start.data', (data) => {
        socket.emit('project.task.start.data', data);
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

      logger.info('stop task');
      const response = await project.task.stop();

      project.task.on('stop.data', (data) => {
        socket.emit('project.task.stop.data', data);
      });

      return { status: response.status };
    }

    /**
     * task setting
     */
    async setting() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.task.setting();
    }
  };
};
