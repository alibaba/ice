import * as path from 'path';
import * as openFolder from 'open';
import * as execa from 'execa';
import * as launchEditor from 'launch-editor';
import storage from '../../../../lib/storage';

export default (app) => {
  const { Controller } = app;

  // System capability
  return class SystemController extends Controller {
    async getPath({ args }) {
      return path.join(...args);
    }

    async startIceworks({ socket }) {
      console.log('\n Starting iceworks...\n');

      const child = execa('iceworks');

      child.stdout.on('data', (buffer) => {
        const data = buffer.toString();
        console.log(data);

        if (data.indexOf('started on http://127.0.0.1') > -1) {
          socket.emit('system.start.iceworks', true);
        }
      });

      child.on('error', (buffer) => {
        socket.emit('system.start.iceworks', false);
        throw new Error(buffer.toString());
      });
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
        socket.emit('home.system.open.editor.data', errorMsg)
      })
    }
  };
};
