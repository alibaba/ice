import { StringDecoder } from 'string_decoder';

export default (app) => {
  const { Controller } = app;

  return class ProjectController extends Controller {
    async devStart(ctx) {
      const { projectClient } = app;
      const { args, socket } = ctx;
      const { projectFolderPath } = args[0];
      const callback = args[args.length - 1];

      let error;
      let project
      try {
        project = await projectClient.devStart(projectFolderPath);
      } catch(err) {
        error = err;
      }

      if (project) {
        project.on('dev:data', function(data) {
          const decoder = new StringDecoder('utf8');
          socket.emit('project.dev.data', decoder.write(data));
        });
      }

      callback({
        error,
        data: project
      });
    }

    async devStop(ctx) {
      const { projectClient } = app;
      const { args, socket } = ctx;
      const { projectFolderPath } = args[0];
      const callback = args[args.length - 1];

      let error;
      let project
      try {
        project = await projectClient.devStop(projectFolderPath);
      } catch(err) {
        error = err;
      }

      socket.emit('project.dev.data', '\n\r已中止调试服务\n\r');

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
