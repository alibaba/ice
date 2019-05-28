import { Application } from 'midway';

export default (app: Application) => {
  const { controller } = app.io;
  const { project } = controller;
  const logger = app.getLogger();

  const routers: [string, () => {}][] = [
    ['project.index.list', project.index.list],
    ['project.index.delete', project.index.delete],
    ['project.index.add', project.index.add],
    ['project.index.current', project.index.getCurrent],
    ['project.index.setCurrent', project.index.setCurrent],
    ['project.page.list', project.page.list],
    ['project.dependency.list', project.dependency.list],
    ['project.task.start', project.task.start],
    ['project.task.stop', project.task.stop],
    ['project.task.getSetting', project.task.getSetting],
    ['project.configuration.settings', project.configuration.settings],
  ];

  routers.forEach(([eventName, handle]) => {
    app.io.route(eventName, async function(this: any) {
      const { args } = this;
      const params = args[0];
      const callback = args[args.length - 1];

      try {
        this.args = params;
        const data = await handle.call(this);
        logger.info(eventName, data);
        callback(null, data);
      } catch (error) {
        logger.error(error);
        callback({
          code: error.code,
          message: error.message,
        });
      }
    });
  });
};
