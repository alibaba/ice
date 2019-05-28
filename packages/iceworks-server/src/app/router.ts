import { Application } from 'midway';

export default (app: Application) => {
  const { controller } = app.io;
  const { project } = controller;
  const logger = app.getLogger();

  const routers: [string, () => {}][] = [
    ['project.index.list', project.index.list],
    ['project.index.create', project.index.create],
    ['project.index.delete', project.index.delete],
    ['project.index.add', project.index.add],
    ['project.index.current', project.index.getCurrent],
    ['project.index.setCurrent', project.index.setCurrent],
    ['project.page.list', project.page.list],
    ['project.page.delete', project.page.delete],
    ['project.page.create', project.page.create],
    ['project.layout.list', project.layout.list],
    ['project.dependency.list', project.dependency.list],
    ['project.dependency.reset', project.dependency.reset],
    ['project.dependency.bulkCreate', project.dependency.bulkCreate],
    ['project.dependency.upgrade', project.dependency.upgrade],
    ['project.dev.start', project.dev.start],
    ['project.dev.stop', project.dev.stop],
    ['project.dev.settings', project.dev.settings],
    ['project.dev.detail', project.dev.detail],
    ['project.configuration.settings', project.configuration.settings],
  ];

  routers.forEach(([eventName, handle]) => {
    app.io.route(eventName, async function (this: any) {
      const { args } = this;
      const params = args[0];
      const callback = args[args.length - 1];

      try {
        this.args = params;
        const data = await handle.call(this);
        callback(null, data);
      } catch (error) {
        logger.error(error);
        callback({
          code: error.code,
          message: error.message
        });
      }
    });
  });
};

