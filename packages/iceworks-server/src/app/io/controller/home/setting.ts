
import * as path from 'path';
import storage from '../../../../lib/storage';
import scanDirectory from '../../../../lib/scanDirectory';

export default (app) => {
  const { Controller } = app;

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

    async setUser({ args }) {
      const { name, workId, avatarUrl } = args;
      if (workId && name && avatarUrl) {
        storage.set('user', { name, workId, avatarUrl, isLogin: true });
      } else {
        throw new Error('用户信息有误，登录失败');
      }

      return storage.get('user');
    }

    async getUser() {
      return storage.get('user');
    }
  };
};
