import * as path from 'path';
import * as openFolder from 'open';
import * as launchEditor from 'launch-code-editor';
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

    openEditor(ctx) {
      const { args: { path }, logger, socket } = ctx;
      const editor = storage.get('editor');
      logger.info('open editor:', path, editor);
      launchEditor(path, editor, (fileName, errorMsg) => {
        socket.emit('home.system.open.editor.data', errorMsg);
      });
    }
  };
};
