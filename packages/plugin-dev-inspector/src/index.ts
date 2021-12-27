import * as path from 'path';
import { spawn } from 'child_process';
import { IPlugin } from 'build-scripts';

const plugin: IPlugin = ({ onGetWebpackConfig }) => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  onGetWebpackConfig((config) => {
    // inject source file path/line/column to JSX data attributes props
    config.module
      .rule('inspector')
      .test(/\.(jsx?|tsx)$/)
      .exclude
      .add(/node_modules/)
      .add(/\.ice\//)
      .add(/\.rax\//)
      .end()
      .use('inspector')
      .loader(path.join(__dirname, './loader'))
      .options({})
      .end();

    // add webpack dev server middleware for launch IDE app with api request
    const root = process.env.PWD;
    const onBeforeSetupMiddleware = config.devServer.get('onBeforeSetupMiddleware');
    const originalDevServeBefore = onBeforeSetupMiddleware || config.devServer.get('before');

    const devServerBefore = (...args: any[]) => {
      const [server] = args;
      let app;
      if (onBeforeSetupMiddleware) {
        app = server.app;
      } else {
        app = server;
      }
      app.get('/vscode/goto', (req, res) => {
        try {
          const { query } = req;
          const { file, line, column } = query;
          spawn('code', ['--goto', `${root}/${file}:${line}:${column}`], { stdio: 'inherit' });
          res.json({ success: true });
        } catch (e) {
          const message = `build-plugin-dev-inspector call VS Code failed: ${e}`;
          console.log(message);
          res.json({ success: false, message });
        }
      });
      if (typeof originalDevServeBefore === 'function') {
        originalDevServeBefore(...args);
      }
    };
    if (onBeforeSetupMiddleware) {
      // webpack-dev-server v5
      config.merge({
        devServer: {
          onBeforeSetupMiddleware: devServerBefore,
        }
      });
    } else {
      config.merge({
        devServer: {
          before: devServerBefore,
        }
      });
    }
  });
};

export default plugin;
