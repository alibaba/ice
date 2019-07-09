
import * as path from 'path';
import storage from '../../../../lib/storage';
import scanDirectory from '../../../../lib/scanDirectory';

export default (app) => {
  const { Controller, i18n } = app;

  return class HomeController extends Controller {
    async getWorkFolder() {
      const workFolder = storage.get('workFolder');
      const directories = await scanDirectory(workFolder);
      return {
        path: workFolder,
        directories,
      };
    }

    async setWorkFolder(ctx) {
      const { args } = ctx;
      const { path: setPath } = args;

      const workFolder = storage.get('workFolder');
      const newWorkFolder = path.join(workFolder, setPath);
      storage.set('workFolder', newWorkFolder);

      const directories = await scanDirectory(newWorkFolder);
      return {
        path: newWorkFolder,
        directories,
      };
    }

    async setLocale(ctx) {
      const { projectManager, i18n } = app;
      const project = await projectManager.getCurrent();

      // Refresh adapter's locale
      await project.reloadAdapter(i18n);
      storage.set('locale', ctx.args.locale);
    }

    async getLocale() {
      return storage.get('locale');
    }

    async setTheme(ctx) {
      storage.set('theme', ctx.args.theme);
    }

    async getTheme() {
      return storage.get('theme');
    }

    async setEditor(ctx) {
      storage.set('editor', ctx.args.editor);
    }

    async getEditor() {
      return storage.get('editor');
    }

    async setUser({ args }) {
      const { name, workId, avatarUrl } = args;
      if (workId && name && avatarUrl) {
        storage.set('user', { name, workId, avatarUrl, isLogin: true });
      } else {
        throw new Error(i18n.format('controller.home.userError'));
      }

      return storage.get('user');
    }

    async getUser() {
      return storage.get('user');
    }
  };
};
