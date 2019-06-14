export default (app) => {
  return class DEFController extends app.Controller {
    async push(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const project = projectManager.getCurrent();
      return await project.def.push(args,ctx);
    }
  };
};
