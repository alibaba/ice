import { Application } from 'midway';

export default (app: Application) => {
  const { controller } = app.io;

  const { project, material, home } = controller;
  const logger = app.getLogger();

  const routers: [string, () => {}][] = [
    ['project.index.list', project.index.list],
    ['project.index.create', project.index.create],
    ['project.index.delete', project.index.delete],
    ['project.index.add', project.index.add],
    ['project.index.current', project.index.getCurrent],
    ['project.index.setCurrent', project.index.setCurrent],
    ['project.index.setPanel', project.index.setPanel],
    ['project.index.sortPanel', project.index.sortPanel],
    ['project.git.status', project.git.status],
    ['project.git.init', project.git.init],
    ['project.git.setRemote', project.git.setRemote],
    ['project.git.checkoutLocalBranch', project.git.checkoutLocalBranch],
    ['project.git.switchBranch', project.git.switchBranch],
    ['project.git.branches', project.git.getBranches],
    ['project.git.pull', project.git.pull],
    ['project.git.push', project.git.push],
    ['project.git.addAndCommit', project.git.addAndCommit],
    ['project.git.getLog', project.git.getLog],
    ['project.def.push', project.def.push],
    ['project.page.list', project.page.list],
    ['project.page.delete', project.page.delete],
    ['project.page.create', project.page.create],
    ['project.layout.list', project.layout.list],
    ['project.dependency.list', project.dependency.list],
    ['project.task.start', project.task.start],
    ['project.task.stop', project.task.stop],
    ['project.task.getConf', project.task.getConf],
    ['project.task.setConf', project.task.setConf],
    ['project.dependency.reset', project.dependency.reset],
    ['project.dependency.bulkCreate', project.dependency.bulkCreate],
    ['project.dependency.upgrade', project.dependency.upgrade],
    ['project.configuration.getCLIConf', project.configuration.getCLIConf],
    ['project.configuration.setCLIConf', project.configuration.setCLIConf],

    ['project.oss.config', project.oss.getConfig],
    ['project.oss.setConfig', project.oss.setConfig],
    ['project.oss.getBuckets', project.oss.getBuckets],
    ['project.oss.upload', project.oss.upload],
    ['material.index.getResources', material.index.getResources],
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
