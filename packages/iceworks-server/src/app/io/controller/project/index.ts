import { StringDecoder } from 'string_decoder';

export default (app) => {
  const { Controller } = app;

  return class ProjectController extends Controller {
    async devStart(ctx) {
      const { projectManager } = app;
      const { args, socket } = ctx;
      const { projectFolderPath } = args[0];
      const callback = args[args.length - 1];

      let error;
      let project;
      try {
        project = await projectManager.devStart(projectFolderPath);
      } catch (err) {
        error = err;
      }

      console.log(error);

      if (project) {
        project.on('dev.data', function(data) {
          const decoder = new StringDecoder('utf8');
          socket.emit('project.index.dev.data', decoder.write(data));
        });
      }

      callback({
        error,
        data: project
      });
    }

    async devStop(ctx) {
      const { projectManager } = app;
      const { args, socket } = ctx;
      const { projectFolderPath } = args[0];
      const callback = args[args.length - 1];

      let error;
      let project;
      try {
        project = await projectManager.devStop(projectFolderPath);
      } catch (err) {
        error = err;
      }

      socket.emit('project.dev.data', '\n\r已中止调试服务\n\r');

      callback({
        error,
        data: project
      });
    }

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
        data: projects
      });
    }

    async getCurrent(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const callback = args[args.length - 1];

      let project = [];
      let error;
      try {
        project = await projectManager.getCurrent();
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: project
      });
    }

    async setCurrent(ctx) {
      const { projectManager } = app;
      const { args } = ctx;
      const { folderPath } = args[0];
      const callback = args[args.length - 1];

      let project = [];
      let error;
      try {
        project = await projectManager.setCurrent(folderPath);
      } catch (err) {
        error = err;
      }

      callback({
        error,
        data: project
      });
    }

    async build() {

    }

    async lint() {

    }
  };
};
