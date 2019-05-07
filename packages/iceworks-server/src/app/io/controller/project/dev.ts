export default (app) => {
  return class DevController extends app.Controller {
    async settings(ctx) {
      const message = ctx.args[0];
      await ctx.socket.emit(
        'project.dev.settings.data',
        `Hi! I've got your message: ${message}`
      );
    }
  };
};
