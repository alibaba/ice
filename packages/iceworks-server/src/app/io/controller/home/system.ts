import * as path from 'path';
import * as openFolder from 'open';
import * as openEditor from 'open-editor';
import storage from '../../../../lib/storage';

export default (app) => {
  const { Controller } = app;

  // System capability
  return class SystemController extends Controller {
    async getPath({ args }) {
      return path.join(...args);
    }


    async openFolder(ctx) {
      const { args: { path } } = ctx;
      return await openFolder(path);
    }

    async openEditor(ctx) {
      const { args: { path } } = ctx;
      const editor = storage.get('editor');
      return await openEditor([path], {
        editor: editor
      });
    }
  };
};
