import { ICEWORKS_PROJECT_DEV_DATA } from 'iceworks-events';
import { StringDecoder } from 'string_decoder';

export default (app) => {
  const { projectClient, Controller } = app;

  return class ProjectController extends Controller {
    async devStart(ctx) {
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
          socket.emit(ICEWORKS_PROJECT_DEV_DATA, decoder.write(data));
        });
      }

      callback({
        error,
        data: project
      });
    }

    async devStop(ctx) {
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

      socket.emit(ICEWORKS_PROJECT_DEV_DATA, '\n\r已中止调试服务\n\r');

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
