export default (app) => {
  const { Controller } = app;

  return class ProjectController extends Controller {
    async list(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const callback = args[args.length - 1];

      let projects = [];
      let error;
      try {
        projects = await projectManager.getProjects();
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: projects,
      });
    }

    async getCurrent(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const callback = args[args.length - 1];

      let project: { projectName: string; projectPath: string };
      let error: any;

      try {
        project = await projectManager.getCurrent();
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: {
          projectName: project.projectName,
          projectPath: project.projectPath,
        },
      });
    }

    async setCurrent(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const { projectPath } = args[0];
      const callback = args[args.length - 1];

      let project = [];
      let error;
      try {
        project = await projectManager.setCurrent(projectPath);
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: project,
      });
    }
  };
};
