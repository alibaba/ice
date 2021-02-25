import * as path from 'path';
import { spawn } from 'child_process';

const plugins = ({ onGetWebpackConfig }: any) => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  onGetWebpackConfig((config: any) => {
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
    config.devServer.set('before', (app: any) => {
      app.get('/vscode/goto', (req, res) => {
        try {
          const { query } = req;
          const { file, line, column } = query;
          spawn('code', ['--goto', `${root}/${file}:${line}:${column}`], { stdio: 'inherit' });
        } catch (e) {
          // ignore
        }
        res.json({ success: true });
      });
    });
  });
};

export default plugins;
