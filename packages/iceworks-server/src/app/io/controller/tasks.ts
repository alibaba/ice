const { ICEWORKS_TASK_DEV_DATA } = require('iceworks-events');

export default (app) => {
  return class TasksController extends app.Controller {
    async dev(ctx) {
      const { args, socket, logger } = ctx;
      const taskName = args[0];

      logger.info('[receive client message]:', taskName + ' : ' + process.pid);

      const tasksService = await ctx.requestContext.getAsync('tasksService');
      const result = await tasksService.dev();

      if (result.code === 0) {
        socket.emit(ICEWORKS_TASK_DEV_DATA, result.stdout);
      }
    }

    async build() {}

    async lint() {}
  };
};
