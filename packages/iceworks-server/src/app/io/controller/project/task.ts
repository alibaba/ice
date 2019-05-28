export default (app) => {
  return class TaskController extends app.Controller {
    /**
     * run start task
     */
    async start(ctx) {
      const { socket, args, logger } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      logger.info('start task');
      await project.task.start(args);

      const { command } = args;
      const onEventName = `start.data.${command}`;
      const emitEventName = `project.task.start.data.${command}`;
      project.task.on(onEventName, (data) => {
        socket.emit(emitEventName, data);
      });
    }

    /**
     * run stop task
     */
    async stop(ctx) {
      const { socket, args, logger } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      logger.info('stop task');
      await project.task.stop(args);

      const { command } = args;
      const onEventName = `stop.data.${command}`;
      const emitEventName = `project.task.stop.data.${command}`;
      project.task.on(onEventName, (data) => {
        socket.emit(emitEventName, data);
      });
    }

    /**
     * task setting
     */
    async setting(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      const response = await project.task.setting(args);
      return { setting: response };
    }
  };
};
