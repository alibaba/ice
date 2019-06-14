export default (app) => {
  return class DEFController extends app.Controller {
    async push(ctx) {
      const { socket, args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();

      project.def.on('push.data', (data) => {
        socket.emit('project.def.push.data', data);
      });

      project.def.on('push.exit', (code) => {
        socket.emit('project.def.push.exit', code);
      });

      return await project.def.push(args);
    }
  };
};
