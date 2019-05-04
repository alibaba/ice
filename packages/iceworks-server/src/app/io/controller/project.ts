import { ICEWORKS_PROJECT_DEV_DATA } from 'iceworks-events';
import { StringDecoder } from 'string_decoder';

export default (app) => {
  return class ProjectController extends app.Controller {
    async devStart(ctx) {
      const { args, socket } = ctx;
      const { projectFolderPath } = args[0];
      const callback = args[args.length - 1];

      const projectService = await ctx.requestContext.getAsync('projectService');

      let error;
      try {
        const devEvent = await projectService.devStart(projectFolderPath);

        devEvent.on('data', function(data) {
          const decoder = new StringDecoder('utf8');
          socket.emit(ICEWORKS_PROJECT_DEV_DATA, decoder.write(data));
        });
      } catch(err) {
        error = err;
      }

      callback({
        error
      });
    }

    async devStop() {

    }

    async build() {

    }

    async lint() {

    }
  };
};
