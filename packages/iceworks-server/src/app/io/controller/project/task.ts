export default (app) => {
  return class TaskController extends app.Controller {
    /**
     * run start task
     */
    async start(ctx) {
      const { args, logger } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      logger.info('start task');
      await project.task.start(args, ctx);
    }

    /**
     * run stop task
     */
    async stop(ctx) {
      const { args, logger } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      logger.info('stop task');
      await project.task.stop(args, ctx);
    }

    /**
     * task config
     */
    async getConf(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      const response = await project.task.getConf(args);
      return { conf: response };
    }

    async setConf(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.task.setConf(args);
    }
  };
};
