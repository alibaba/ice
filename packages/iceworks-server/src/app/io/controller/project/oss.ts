import storage from '../../../../lib/storage';

export default (app) => {
  return class OSSController extends app.Controller {
    async getConfig() {
      const { projectManager } = app;
      const { path } = projectManager.getCurrent();
      const oss = storage.get('oss');
      return oss.find(({ project }) => project === path) || {};
    }
    async setConfig(ctx) {
      const { args } = ctx;
      const { projectManager } = app;
      const { path } = projectManager.getCurrent();
      const oss = storage.get('oss');

      let newConfig;
      const projectOSS = oss.find(({ project }) => project === path);
      if (projectOSS) {
        // Change the prototype chain
        newConfig = Object.assign(projectOSS, args, { project: path });
      } else {
        newConfig = {...args, project: path};
        oss.push({...args, project: path});
      }
      
      storage.set('oss', oss);

      return newConfig;
    }
    async upload() {
      const { projectManager } = app;
      const currentProject = projectManager.getCurrent();
      const oss = storage.get('oss');
      const projectOSSConfig = oss.find(({ project }) => project === currentProject.path);

      return await currentProject.oss.upload(projectOSSConfig);
    }
    async getBuckets() {
      const { projectManager } = app;
      const currentProject = projectManager.getCurrent();
      const oss = storage.get('oss');
      const projectOSSConfig = oss.find(({ project }) => project === currentProject.path);
      
      return await currentProject.oss.getBuckets(projectOSSConfig);
    }
  };
};
