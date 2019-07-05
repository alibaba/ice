import { Application } from 'midway';

export default (app: Application) => {
  const { controller } = app.io;

  const { material, home } = controller;
  const logger = app.getLogger();

  const routers: [string, () => {}][] = [
    ['home.project.list', home.project.list],
    ['home.project.create', home.project.create],
    ['home.project.delete', home.project.delete],
    ['home.project.add', home.project.add],
    ['home.project.current', home.project.getCurrent],
    ['home.project.setCurrent', home.project.setCurrent],
    ['home.project.setPanel', home.project.setPanel],
    ['home.project.sortPanels', home.project.sortPanels],

    ['material.index.resources', material.index.getResources],
    ['material.index.getOne', material.index.getOne],
    ['material.index.recommendScaffolds', material.index.getRecommendScaffolds],
    ['material.index.add', material.index.add],
    ['material.index.delete', material.index.delete],

    ['home.setting.workFolder', home.setting.getWorkFolder],
    ['home.setting.setWorkFolder', home.setting.setWorkFolder],
    ['home.setting.setLocale', home.setting.setLocale],
    ['home.setting.getLocale', home.setting.getLocale],
    ['home.setting.setTheme', home.setting.setTheme],
    ['home.setting.getTheme', home.setting.getTheme],
    ['home.setting.setEditor', home.setting.setEditor],
    ['home.setting.getEditor', home.setting.getEditor],
    ['home.setting.setUser', home.setting.setUser],
    ['home.setting.getUser', home.setting.getUser],

    ['home.system.getPath', home.system.getPath],
    ['home.system.openFolder', home.system.openFolder],
    ['home.system.openEditor', home.system.openEditor],
  ];

  routers.forEach(([eventName, handle]) => {
    app.io.route(eventName, async function(this: any) {
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
          message: error.message,
        });
      }
    });
  });
};
