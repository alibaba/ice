import { Application } from 'midway';

export default (app: Application) => {
  const { controller } = app.io;

  const { project, material } = controller;
  const logger = app.getLogger();

  const routers: [string, () => {}][] = [
    ['project.index.list', project.index.list],
    ['project.index.create', project.index.create],
    ['project.index.delete', project.index.delete],
    ['project.index.add', project.index.add],
    ['project.index.current', project.index.getCurrent],
    ['project.index.setCurrent', project.index.setCurrent],
    ['project.index.openFolder', project.index.openFolder],
    ['project.index.openEditor', project.index.openEditor],
    ['project.page.list', project.page.list],
    ['project.page.delete', project.page.delete],
    ['project.page.create', project.page.create],
    ['project.layout.list', project.layout.list],
    ['project.dependency.list', project.dependency.list],
    ['project.navigation.list', project.navigation.list],
    ['project.navigation.setData', project.navigation.setData],
    ['project.router.list', project.router.list],
    ['project.router.setData', project.router.setData],
    ['project.task.start', project.task.start],
    ['project.task.stop', project.task.stop],
    ['project.task.getSetting', project.task.getSetting],
    ['project.dependency.reset', project.dependency.reset],
    ['project.dependency.bulkCreate', project.dependency.bulkCreate],
    ['project.dependency.upgrade', project.dependency.upgrade],
    ['project.configuration.settings', project.configuration.settings],
    ['material.index.resource', material.index.resource],
    ['material.index.getOne', material.index.getOne],
    ['material.index.recommendScaffolds', material.index.getRecommendScaffolds],
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
