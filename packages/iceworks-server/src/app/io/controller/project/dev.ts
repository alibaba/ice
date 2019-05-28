export default (app) => {
  return class DevController extends app.Controller {
    /**
     * 启动调试服务
     */
    async start(ctx) {
      const { socket } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      project.dev.on('data', (data) => {
        socket.emit('project.index.dev.data', data);
      });

      return await project.dev.start();
    }

    async stop() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      return await project.dev.stop();
    }

    /**
     * 调试服务配置项
     */
    async settings() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.dev.getSettings();
    }

    async detail() {
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return project.dev;
    }
  };
};
