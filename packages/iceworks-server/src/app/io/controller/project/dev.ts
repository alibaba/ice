import { StringDecoder } from 'string_decoder';

export default (app) => {
  return class DevController extends app.Controller {
    /**
     * 启动调试服务
     * @param ctx
     */
    async start(ctx) {
      const { projectManager } = app;
      const { args, socket } = ctx;
      const { projectPath } = args[0];
      const callback = args[args.length - 1];

      let error;
      let project;
      try {
        project = await projectManager.devStart(projectPath);
      } catch (err) {
        error = {
          message: err.message,
          success: false,
        };
      }

      if (project) {
        project.on('dev.data', function(data) {
          const decoder = new StringDecoder('utf8');
          socket.emit('project.index.dev.data', decoder.write(data));
        });
      }

      callback({
        error,
        data: project,
      });
    }

    /**
     * 停止调试服务
     * @param ctx
     */
    async stop(ctx) {
      const { projectManager } = app;
      const { args, socket } = ctx;
      const { projectPath } = args[0];
      const callback = args[args.length - 1];

      let error;
      let project;
      try {
        project = await projectManager.devStop(projectPath);
      } catch (err) {
        error = err;
      }

      socket.emit('project.dev.data', '\n\r已中止调试服务\n\r');

      callback({
        error,
        data: project,
      });
    }

    /**
     * 调试服务配置项
     * @param ctx
     */
    async settings(ctx) {
      const { args, requestContext } = ctx;
      const callback = args[args.length - 1];
      const devService = await requestContext.getAsync('devService');

      let data = [];
      let error;

      try {
        data = await devService.getDevSettings();
      } catch (error) {
        error = error;
      }

      callback({ error, data });
    }
  };
};
