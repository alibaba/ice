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

    async delete(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const callback = args[args.length - 1];

      let projects = [];
      let error;
      try {
        projects = await projectManager.deleteProject(args[0]);
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: projects
      });
    }

    async add(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const { projectFolderPath } = args[0];
      const callback = args[args.length - 1];

      let projects = [];
      let error;
      try {
        projects = await projectManager.addProject(projectFolderPath);
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: projects
      });
    }

    async getCurrent(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const callback = args[args.length - 1];

      let project: { name: string; path: string };
      let error: any;

      try {
        project = await projectManager.getCurrent();
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: {
          name: project.name,
          path: project.path,
        },
      });
    }

    async setCurrent(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const { path } = args[0];
      const callback = args[args.length - 1];

      let project = [];
      let error;
      try {
        project = await projectManager.setCurrent(path);
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
