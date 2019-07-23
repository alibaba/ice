import * as path from 'path';
import storage from '../../../../lib/storage';
import scanDirectory from '../../../../lib/scanDirectory';
import getNpmClient from '../../../../lib/getNpmClient';

export default (app) => {
  const { Controller, i18n, logger } = app;

  return class HomeController extends Controller {
    public async getWorkFolder() {
      const workFolder = storage.get('workFolder');
      let directories = [];
      
      try {
        directories = await scanDirectory(workFolder);
      } catch (error) {
        logger.warn('scanDirectory got error:', error);
      }

      return {
        path: workFolder,
        directories,
      };
    }

    public async setWorkFolder(ctx) {
      const { args } = ctx;
      const { path: setPath } = args;

      const workFolder = storage.get('workFolder');
      const newWorkFolder = path.join(workFolder, setPath);

      const directories = await scanDirectory(newWorkFolder);
      if (!directories.length) {
        throw new Error(i18n.format('controller.settings.setWorkFolder.error'));
      }
      
      storage.set('workFolder', newWorkFolder);
      return {
        path: newWorkFolder,
        directories,
      };
    }

    public async setLocale(ctx) {
      const { projectManager, logger } = app;
      try {
        const project = await projectManager.getCurrent();

        // Refresh adapter's locale
        await project.reloadAdapter();
      } catch (error) {
        logger.error(error);
      }
      storage.set('locale', ctx.args.locale);
    }

    public async getLocale() {
      return storage.get('locale');
    }

    public async setTheme(ctx) {
      storage.set('theme', ctx.args.theme);
    }

    public async getTheme() {
      return storage.get('theme');
    }

    public async setEditor(ctx) {
      storage.set('editor', ctx.args.editor);
    }

    public async getEditor() {
      return storage.get('editor');
    }

    public async setNpmClient(ctx) {
      storage.set('npmClient', ctx.args.npmClient);
    }

    public async getNpmClient() {
      const npmClient = await getNpmClient();
      // get origin value
      return npmClient[2];
    }

    public async setRegistry(ctx) {
      storage.set('registry', ctx.args.registry);
    }

    public async getRegistry() {
      return storage.get('registry');
    }

    public async setUser({ args }) {
      const { name, workId, avatarUrl } = args;
      if (workId && name && avatarUrl) {
        storage.set('user', { name, workId, avatarUrl, isLogin: true });
      } else {
        throw new Error(i18n.format('controller.home.userError'));
      }

      return storage.get('user');
    }

    public async getUser() {
      return storage.get('user');
    }
  };
};
