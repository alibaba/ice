export default (app) => {
  return class DevController extends app.Controller {
    /**
     * 启动调试服务
     * @param ctx
     */
    async start(ctx) {
      const { args, socket } = ctx;
      const callback = args[args.length - 1];
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      let error;
      let result;

      try {
        result = await project.dev.start();

        project.dev.on('data', (data) => {
          socket.emit('project.index.dev.data', data);
        });
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: result,
      });
    }

    async stop(ctx) {
      const { args } = ctx;
      const callback = args[args.length - 1];
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      let error;
      let result;

      try {
        result = await project.dev.stop();
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: result,
      });
    }

    /**
     * 调试服务配置项
     * @param ctx
     */
    async settings(ctx) {
      const { args } = ctx;
      const callback = args[args.length - 1];

      const { projectManager } = app;
      const project = projectManager.getCurrent();

      let data = [];
      let error;

      try {
        data = await project.dev.getSettings();
      } catch (err) {
        error = err;
      }

      callback({ error, data });
    }

    async detail(ctx) {
      const { args } = ctx;
      const callback = args[args.length - 1];

      const { projectManager } = app;
      const project = projectManager.getCurrent();

      callback({
        error: null,
        data: project.dev
      });
    }
  };
};
